# @cypress/error-message

> User-friendly error text with additional information

[![NPM][npm-icon] ][npm-url]

[![Build status][ci-image] ][ci-url]
[![semantic-release][semantic-image] ][semantic-url]
[![js-standard-style][standard-image]][standard-url]

## Install

Requires [Node](https://nodejs.org/en/) version 0.12 or above.

```sh
npm install --save @cypress/error-message
```

Load the function from the module

```js
const {formErrorText} = require('@cypress/error-message')
```

## Use

Think about all possible errors your application might encounter.
Describe each one and suggest a solution the user should try in case this
particular error happens. Then form the full message once the exception
is caught and show it to the user

```js
const fileSaveError = {
  description: 'We could not save an important file',
  solution: `Please check folder permissions and try again

    more details on our FAQ page: https://faq.company.name
  `
}
fs.writeFile(name)
  .catch(
    formErrorText(info).then(console.error)
  )
/*
  shows nice error message

  ------
  We could not save an important file
  Please check folder permissions and try again

    more details on our FAQ page: https://faq.company.name

  Exception message
  ------
  Platform: darwin
  Version: 15.6.2
*/
```

If you want to include the exception stack, pass `printStack` option in
the `info` object. For example, a catch-all function should probably print
stack to give you a good idea where the problem happens.

```js
const badError = {
  description: 'Unexpected error happened',
  solution: `Something terrible went wrong. Search issues on our
    GitHub repo to find possible solution: https://github.com/company/repo`,
  printStack: true
}
doMyStuff()
  .catch(
    formErrorText(badError).then(console.error)
  )
```

If `info` argument is missing a description or a solution, an error will be
thrown.

## Re-throwing a detailed error

You might not want to handle the error, but rather add details and rethrow
it. For this there is a helper function

```js
const {throwDetailedError} = require('@cypress/error-message')
const info = {
  description: 'error description',
  solution: 'our solution'
}
foo()
  .catch(throwDetailedError(info))
  // later catch this detailed error
  .catch(err => {
    // err has original exception + description and solution
    console.error(err)
  })
```

## Examples

* Reading a file [before](examples/simple/index.js) and [after](examples/simple/after.js)

### Small print

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/cypress-io/error-message/issues) on Github

## MIT License

Copyright (c) 2017 Cypress.io https://cypress.io

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/@cypress/error-message.svg?downloads=true
[npm-url]: https://npmjs.org/package/@cypress/error-message
[ci-image]: https://travis-ci.org/cypress-io/error-message.svg?branch=master
[ci-url]: https://travis-ci.org/cypress-io/error-message
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
