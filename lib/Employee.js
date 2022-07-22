const Template = require('./HtmlTemplate.js')

/**
 * Defines a parent class for all Employees
 */
class Employee {
  /** 
   * Constructor requires name, id and email or throws an error
   */
  constructor(name, id, email) {
    if (!name) throw Error('Name is required for new employees')
    this.name = name
    if (!id) throw Error('ID is required for new employees')
    this.id = id
    if (!email) throw Error('Email is required for new employees')
    this.email = email
    /** This template is responsible for rendering the Employee cards */
    this.template = new Template(this)
    this.role = 'Employee'
  }
  getName() { return this.name }
  getId() { return this.id }
  getEmail() { return this.email }

  /** 
   * String value for displaying in console
   */
  toString() { return `${this.getName()} (${this.getRole()})` }
  getRole() { return this.role }

  /**
   * Creates the string template for the HTML card
   * @returns html employee card in string template literal form
   */
  renderHtml() {
    return this.template.renderHtml()
  }
}

module.exports = Employee