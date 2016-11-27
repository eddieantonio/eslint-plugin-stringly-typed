ESLint-plugin-stringly-typing
=============================

[![Build Status](https://travis-ci.org/eddieantonio/eslint-plugin-stringly-typing.svg?branch=master)](https://travis-ci.org/eddieantonio/eslint-plugin-stringly-typing)

Detects and fixes instances of stringly-typing!

[What's does it mean to be stringly typed?][stringly-typed]


[stringly-typed]: http://wiki.c2.com/?StringlyTyped

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-stringly-typing`:

```
$ npm install eslint-plugin-stringly-typing --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-stringly-typing` globally.

## Usage

Add `stringly-typing` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "stringly-typing"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "stringly-typing/no-bare-url": "error"
    }
}
```

## Supported Rules

* [stringly-typing/no-bare-url](docs/rules/no-bare-url.md): Prevent usage of bare URLs

