/**
 * @fileoverview Prevent usage of bare URLs
 * @author Eddie Antonio Santos
 */
"use strict";


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Prevent usage of bare URLs",
    },
    // TODO
    fixable: null,  // or "code" or "whitespace"
    // TODO
    schema: [
      // fill in your schema
    ]
  },

  create: function(context) {
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section
    var uri = require('../grammars/uri.js');

    function isURI(value) {
      try {
        uri.parse(value);
      } catch (e) {
        if (e instanceof uri.SyntaxError) {
          return false;
        }
        // I don't know what this error is...
        throw e;
      }

      return true;
    }

    function isApprovedTemplateContext(parent) {
      var tag;

      if (parent.type === 'TaggedTemplateExpression') {
        tag = parent.tag;

        // TODO: Ensure that URL is in score!
        if (tag.type === 'Identifier' && tag.name == 'URL') {
          return true;
        }
      }

      return false;
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

        context.report({
          message: 'Unexpected bare URL: ',
          node: node,
          data: {
            string: firstValue
          }
        });
      },

      Literal: function (node) {
        var literal = node.value;

        // We only care about strings.
        if (!(typeof literal == 'string')) return;
        if (!isURI(literal)) return;

        context.report({
          message: 'Unexpected bare URL: ',
          node: node,
          data: {
            string: literal
          }
        });
      }
    };
  }
};
