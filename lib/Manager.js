const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    /** Constructs Employee prototype */
    super(name, id, email)
    /** Define Manager specific properties */
    this.officeNumber = officeNumber
    this.role = 'Manager'
  }
  /** Own method */
  getOfficeNumber() { return this.officeNumber }
  /** Override parent method */
  getRole() { return 'Manager' }
}

module.exports = Manager