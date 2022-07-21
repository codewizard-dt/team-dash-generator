const fs = require('fs')
const JsonCache = require('../lib/JsonCache.js')

describe('JsonCache', () => {
  describe('Read methods', () => {
    it(`should create a new array if one doesn't exist`, () => {
      const cache = new JsonCache('test.json')

      const mock = jest.spyOn(cache, 'getCollection')

      cache.getCollection('BUTTS')

      expect(mock).toReturnWith([])
    })
  })
  describe('Write methods', () => {
    it('should update the file when an item is added', () => {
      const filename = 'test.json'

      const cache = new JsonCache(filename)
      const mock = jest.spyOn(cache, 'writeFile')
      const mock2 = jest.spyOn(fs, 'writeFile')

      cache.addToCollection('butts', 'mine')

      expect(mock).toHaveBeenCalled()
      expect(mock2).toHaveBeenCalled()
    })

  })
  // it('should write the file', () => { })
})