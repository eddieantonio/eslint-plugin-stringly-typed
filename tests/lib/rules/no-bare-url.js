/**
 * no-bare-url
 *
 * @fileoverview Prevent usage of bare URLs
 * @author Eddie Antonio Santos <easantos@ualberta.ca>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-bare-url"),

  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-bare-url", rule, {

  valid: [

    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "var url = \"https://example.org/?q=foo#bar\";",
      errors: [{
        message: "Fill me in.",
        type: "Me too"
      }]
    }
  ]
});
