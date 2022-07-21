const fs = require('fs')
const path = require('path')

class HtmlTemplate {
  constructor(employee) {
    this.employee = employee
  }
  getName = () => this.employee.getName()
  getId = () => this.employee.getId()
  getEmail = () => this.employee.getEmail()
  getRole = () => this.employee.getRole()

  getIcon = () => {
    switch (this.getRole()) {
      case ('Manager'):
        return 'key'
      case ('Engineer'):
        return 'terminal'
      case ('Intern'):
        return 'headphones'
      default:
        return 'user'
    }
  }

  renderRoleItem = () => {
    switch (this.getRole()) {
      case ('Manager'):
        return `<div class='item'>Office: ${this.employee.getOfficeNumber()}</div>`
      case ('Engineer'):
        return `<div class='item'>GitHub: <a target="_blank" href="https://github.com/${this.employee.getGithub()}">${this.employee.getGithub()}</a></div>`
      case ('Intern'):
        return `<div class='item'>School: ${this.employee.getSchool()}</div>`
      default:
        return ``
    }
  }

  renderHtml = () => `
    <div class='ui card ${this.getRole().toLowerCase()}'>
      <div class='header'><h2>${this.getName()}</h2></div>
      <div class='content'>
        <div class='meta'><i class='${this.getIcon()} icon'></i><span>${this.getRole()}</span></div>
        <div class='description'>
          <div class='ui list'>
            <div class='item'>ID: ${this.getId()}</div>
            <div class='item'>Email: <a target="_blank" href="mailto:${this.getEmail()}">${this.getEmail()}</a></div>
            ${this.renderRoleItem()}
          </div>
        </div>
      </div>
    </div>
  `
}

module.exports = HtmlTemplate