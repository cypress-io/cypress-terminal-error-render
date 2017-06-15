'use strict'

const {formErrorText} = require('.')
const {platformRegex, versionRegex} = require('./get-os-info')
const la = require('lazy-ass')
const snapshot = require('snap-shot')

/* global describe, it */
describe('formErrorText', () => {
  const info = {
    description: 'error description',
    solution: 'our solution'
  }
  const error = new Error('exception message')

  const normalizePlatform = text => text.replace(platformRegex, 'Platform: name')
  const normalizeVersion = text => text.replace(versionRegex, 'Version: number')

  it('has platform name string', () =>
    formErrorText(info, error).then(text =>
      la(platformRegex.test(text), text)
    )
  )

  it('has version string', () =>
    formErrorText(info, error).then(text =>
      la(versionRegex.test(text), text)
    )
  )

  it('forms full error message', () =>
    snapshot(
      formErrorText(info, error)
        .then(normalizePlatform)
        .then(normalizeVersion)
    )
  )
})