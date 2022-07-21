const Template = require('./HtmlTemplate.js')

class Employee {
  constructor(name, id, email) {
    if (!name) throw Error('Name is required for new employees')
    this.name = name
    if (!id) throw Error('ID is required for new employees')
    this.id = id
    if (!email) throw Error('Email is required for new employees')
    this.email = email
    this.template = new Template(this)
    this.role = 'Employee'
  }
  getName() { return this.name }
  getId() { return this.id }
  getEmail() { return this.email }
  toString() { return `${this.getName()} (${this.getRole()})` }
  getRole() { return this.role }

  renderHtml() {
    return this.template.renderHtml()
  }
}

module.exports = Employee