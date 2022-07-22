const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, email, school) {
    /** Constructs Employee prototype */
    super(name, id, email)
    /** Define Intern specific properties */
    this.school = school
    this.role = 'Intern'
  }

  /** Own method */
  getSchool() { return this.school }
  /** Override parent method */
  getRole() { return 'Intern' }
}

module.exports = Intern