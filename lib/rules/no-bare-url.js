/**
 * @fileoverview Prevent usage of bare URLs
 * @author Eddie Antonio Santos
 */
"use strict";

var uri = require('../grammars/uri');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Prevent usage of bare URLs",
    },
    fixable: "code",
    schema: [
      // TODO: configuration options
      // fill in your schema
    ]
  },

  create: function (context) {
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    /**
     * Checks if a string parses as a URI.
     * @param {String} value An unknown string
     * @returns {Boolean} True if the string is a URI.
     */
    function isURI(value) {
      try {
        uri.parse(value);
      } catch (err) {
        if (err instanceof uri.SyntaxError) {
          return false;
        }
        // I have no idea what this error is...
        throw err;
      }

      return true;
    }

    /**
     * Checks if the given node looks like an approved context for a URI.
     * This depends greatly on the configuration.
     *
     * @param {ASTNode} value An AST node.
     * @returns {Boolean} True if the context looks safe; false otherwise.
     */
    function isApprovedTemplateContext(parent) {
      var tag;

      if (parent.type === 'TaggedTemplateExpression') {
        tag = parent.tag;

        // TODO: Ensure that the URL tagged-template is in scope!
        if (tag.type === 'Identifier' && tag.name == 'URL') {
          return true;
        }
      }

      return false;
    }

    /**
     * @param {String} literal Actual intended value of the text in the
     *                         string.
     * @returns {String} The new fixed literal.
     */
    function fixForLiteral(literal) {
      return `URL\`${literal}\``;
    }

    /**
     * Checks if the given TemplateLiteral is part of a
     * TaggedTemplateExpression.
     *
     * @param {ASTNode} value An AST node.
     * @returns {Boolean} True if part of a tagged template; false otherwise.
     */
    function isUntaggedTemplate(node) {
      var parent = node.parent;
      if (parent && parent.type === 'TaggedTemplateExpression') {
        return false;
      }
      return true;
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      TemplateLiteral: function (node) {
        // We only care about the very first part of the literal.
        var firstValue = node.quasis[0].value.cooked;

        // Check if it's a URI...
        if (!isURI(firstValue)) return;

        // Now check if the surrounding context is acceptable.
        if (isApprovedTemplateContext(node.parent)) return;

        const warning = {
          node: node,
          message: 'Unexpected bare URL: {{string}}',
          data: {
            string: firstValue
          }
        };

        /* Add a fix ONLY if this is an un-tagged template. */
        if (isUntaggedTemplate(node)) {
          warning.fix = function(fixer) {
            return fixer.replaceText(node, fixForLiteral(firstValue));
          };
        }

        context.report(warning);
      },

      Literal: function (node) {
        var literal = node.value;

        // We only care about strings.
        if (!(typeof literal == 'string')) return;
        if (!isURI(literal)) return;

        context.report({
          node: node,
          message: 'Unexpected bare URL: {{string}}',
          data: {
            string: literal
          },
          fix: function(fixer) {
            return fixer.replaceText(node, fixForLiteral(literal));
          }
        });
      }
    };
  }
};
