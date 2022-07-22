const fs = require('fs')
const path = require('path')

class JsonCache {
  /** Defines data for internal reference */
  data = {}
  /**
   * 
   * @param {string} filename the path to the file
   */
  constructor(filename) {
    /** Store path to file */
    this.file = filename
    /** Fetch data if file exists */
    if (this.fileExists()) this.data = this.parsedFile()
  }

  /**
   * Checks file existence
   * @returns boolean
   */
  fileExists() {
    return fs.existsSync(this.getFilePath())
  }
  /**
   * Constructs path to /dist/cache.json
   * @returns normalized file path
   */
  getFilePath() {
    return path.resolve(__dirname, '../dist', this.file)
  }
  /**
   * Reads the file
   * @returns file contents as string
   */
  readFile() {
    return fs.readFileSync(this.getFilePath(), 'utf8')
  }

  /**
   * Reads and parses the file
   * @returns file contents as JSON
   */
  parsedFile() {
    return JSON.parse(this.readFile())
  }
  /**
   * Saves the data to the file
   * @param {any} data string or object of whole database
   */
  writeFile(data) {
    if (typeof data !== 'string') data = JSON.stringify(data, null, 2)
    fs.writeFile(this.getFilePath(), data, () => { })
  }

  /**
   * Adds employee to collection and saves file
   * @param {string} collectionName in this case, always 'employee'
   * @param {object} item employee object with properties
   */
  addToCollection(collectionName, item) {
    const collection = this.getCollection(collectionName)
    collection.push(item)
    this.setCollection(collectionName, collection)
  }

  /**
   * Writes the file
   * @param {string} collectionName in this case, always 'employee'
   * @param {object} data full data set
   */
  setCollection(collectionName, data) {
    this.data[collectionName] = data
    this.writeFile(this.data)
  }

  /**
   * Retrieves the data for a specific collection
   * @param {string} collectionName in this case, always 'employee'
   * @returns array of items, empty if a new collection
   */
  getCollection(collectionName) {
    return this.data[collectionName] || []
  }
}

module.exports = JsonCache