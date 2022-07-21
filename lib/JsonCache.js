const fs = require('fs')
const path = require('path')

class JsonCache {
  connected = false
  data = {}
  constructor(filename) {
    this.file = filename
    if (this.fileExists()) this.data = this.parsedFile()
  }
  fileExists() {
    return fs.existsSync(this.getFilePath())
  }
  getFilePath() {
    return path.resolve(__dirname, '../dist', this.file)
  }
  readFile() {
    return fs.readFileSync(this.getFilePath(), 'utf8')
  }
  parsedFile() {
    return JSON.parse(this.readFile())
  }
  writeFile(data) {
    if (typeof data !== 'string') data = JSON.stringify(data, null, 2)
    fs.writeFile(this.getFilePath(), data, () => { })
  }
  addToCollection(collectionName, item) {
    const collection = this.getCollection(collectionName)
    collection.push(item)
    this.setCollection(collectionName, collection)
  }
  setCollection(collectionName, data) {
    this.data[collectionName] = data
    this.writeFile(this.data)
  }
  getCollection(collectionName) {
    return this.data[collectionName] || []
  }
}

module.exports = JsonCache