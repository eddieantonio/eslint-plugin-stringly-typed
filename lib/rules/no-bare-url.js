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

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // TODO:
      // TaggedTemplateExpression: function (node) {
      // },

      TemplateLiteral: function (node) {
        // We only care about the very first part of the literal.
        var firstValue = node.quasis[0].value.cooked;

        // Check if it's a URI...
        if (!isURI(firstValue)) return;

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
