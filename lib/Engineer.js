const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, email, github) {
    /** Constructs Employee prototype */
    super(name, id, email)
    /** Define Engineer specific properties */
    this.github = github
    this.role = 'Engineer'
  }

  /** Own method */
  getGithub() { return this.github }
  /** Overrides parent method */
  getRole() { return 'Engineer' }
}

module.exports = Engineer