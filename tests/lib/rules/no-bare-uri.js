/**
 * @fileoverview Prevent usage of bare URIs
 * @author Eddie Antonio Santos
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-bare-uri"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-bare-uri", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "var uri = \"https://example.org/?q=foo#bar\";",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
