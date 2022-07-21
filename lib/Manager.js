const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email)
    this.officeNumber = officeNumber
    this.role = 'Manager'
  }
  getOfficeNumber() { return this.officeNumber }
  getRole() { return 'Manager' }
  // getTemplate() {
  //   return (
  //     `
  //     <div class='ui card'>
  //       <div class='content'>
  //         <div class='header'>${this.getName()}</div>
  //         <div class='meta'><i class='key icon'></i>Manager</div>
  //         <div class='description'>
  //           <div class='ui list'>
  //             <div class='item'>ID: ${this.getId()}</div>
  //             <div class='item'>Email: ${this.getEmail()}</div>
  //             <div class='item'>Office: ${this.getOfficeNumber()}</div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     `
  //   )
  // }
}

module.exports = Manager