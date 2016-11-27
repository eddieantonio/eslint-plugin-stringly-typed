#!/usr/bin/env node

/*
 * Copyright (c) 2016 Eddie Antonio Santos <easantos@ualberta.ca>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Generates the grammar files in lib/grammars.
 *
 * Runs on prepublish.
 */

"use strict";

const fs = require('fs');
const corePeg = require('core-pegjs');
const peg = require('pegjs');

const OUT_DIR = `${__dirname}/../lib/grammars`;

const source = peg.generate(corePeg('ietf/rfc3986-uri'), {
  allowedStartRules: ['URI'],
  output: "source",
  format: "commonjs"
});

fs.writeFileSync(`${OUT_DIR}/uri.js`, source);
