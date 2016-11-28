ESLint-plugin-stringly-typed
=============================

[![Build Status](https://travis-ci.org/eddieantonio/eslint-plugin-stringly-typed.svg?branch=master)](https://travis-ci.org/eddieantonio/eslint-plugin-stringly-typed)

Detects and fixes instances of stringly-typed!

[What's does it mean to be stringly typed?][stringly-typed]


[stringly-typed]: http://wiki.c2.com/?StringlyTyped

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-stringly-typed`:

```
$ npm install eslint-plugin-stringly-typed --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-stringly-typed` globally.

## Usage

Add `stringly-typed` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "stringly-typed"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "stringly-typed/no-bare-url": "error"
    }
}
```

## Supported Rules

* [stringly-typed/no-bare-url](docs/rules/no-bare-url.md): Prevent usage of bare URLs

