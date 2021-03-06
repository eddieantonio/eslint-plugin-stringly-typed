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

var ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });

ruleTester.run("no-bare-url", rule, {
  valid: [
    "var url = URL`https://example.org/?q=foo#bar`;",
    "var url = URL`mailto://nobody@example.org`;"
  ],
  invalid: [
    {
      code: "var url = \"https://example.org/?q=foo#bar\";",
      errors: [{
        message: "Unexpected bare URL: https://example.org/?q=foo#bar",
        type: "Literal"
      }],
      output: "var url = URL`https://example.org/?q=foo#bar`;"
    },
    {
      code: "var url = `https://example.org/?q=foo#bar`;",
      errors: [{
        message: "Unexpected bare URL: https://example.org/?q=foo#bar",
        type: "TemplateLiteral"
      }],
      output: "var url = URL`https://example.org/?q=foo#bar`;"
    },
    {
      code: "var url = Foo`https://example.org/?q=foo#bar`;",
      errors: [{
        message: "Unexpected bare URL: https://example.org/?q=foo#bar",
        type: "TemplateLiteral"
      }],
      /* Cannot safely fix this example... */
      output: "var url = Foo`https://example.org/?q=foo#bar`;"
    }
  ]
});
