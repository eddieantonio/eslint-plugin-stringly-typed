# Prevent usage of bare URLs (no-bare-url)

(fixable) The `--fix` option on the [command line][] automatically fixes
problems reported by this rule.

URLs encode a large amount of attributes:

 - a scheme
 - a host
 - a hierarchical part (the path)
 - a query
 - a fragment
 - etc.

As such, it may be more useful to use a type that reflects this large
amount of structured content, rather than cramming it all in an
unassuming string. In general using explicit URL types may prevent subtle
errors when handling URLs in JavaScript applications.

## Rule Details

This rule disallows **bare URLs** in string literals.

Examples of **incorrect** code for this rule:

```js
myUrl = `http://example.org`;
myUrl = 'mailto://nobody@example.org';
```

Examples of **correct** code for this rule:

```js
var URL = require('url-tagged-template');

myUrl = URL`http://example.org/`;
myUrl = URL`mailto:nobody@example.org`;
```

<!--
### Options

TBD
-->

## When Not To Use It

Many APIs expect bare strings as arguments, which they then interpret as
URLs. Do not use this rule if you do not depend on knowing the inner
structure of URLs.

## Further Reading

 - [Rule source]
 - [Document source]
 - [RFC3986]: The URI standard
 - [Node's URL Module]
 - [URL Tagged Template]

[Rule source]: https://github.com/eddieantonio/eslint-plugin-stringly-typed/blob/master/lib/rules/no-bare-url.js
[Document source]: https://github.com/eddieantonio/eslint-plugin-stringly-typed/blob/master/docs/rules/no-bare-url.md
[Node's URL Module]: https://nodejs.org/api/url.html
[URL Tagged Template]: https://github.com/eddieantonio/url-tagged-template
[RFC3986]: https://www.ietf.org/rfc/rfc3986.txt
[command line]: http://eslint.org/docs/user-guide/command-line-interface#fix
