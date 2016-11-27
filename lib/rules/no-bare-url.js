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

    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section
    var uri = require('../grammars/uri.js');

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {

      Literal: function (node) {
        var literal = node.value;

        // We only care about strings.
        if (!(typeof literal == 'string')) {
          return;
        }

        try {
          uri.parse(node.value);
        } catch (e) {
          if (e instanceof uri.SyntaxError) {
            return;
          }
          // I don't know what this error is...
          throw e;
        }

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
