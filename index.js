
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

const JsonCache = require('./lib/JsonCache.js')

const Intern = require('./lib/Intern.js')
const Engineer = require('./lib/Engineer.js');
const Manager = require('./lib/Manager.js');

const cache = new JsonCache('cache.json')
const employees = []

function newEmployee() {
  inquirer.prompt([
    {
      name: 'employeeType',
      message: 'Which type of employee would you like to add?',
      type: 'list',
      choices: ['Engineer', 'Intern', 'Manager', '---', 'Choose from cache', '---', `Finish and Generate Dashboard`]
    }
  ]).then(({ employeeType }) => {
    if (employeeType === 'Engineer') newEngineer()
    else if (employeeType === 'Intern') newIntern()
    else if (employeeType === 'Manager') newManager()
    else if (employeeType === 'Choose from cache') {
      inquirer.prompt([
        {
          name: 'employee',
          message: 'Select employee:',
          type: 'list',
          choices: cache.getCollection('employees').map(employee => ({
            name: `${employee.name} - ${employee.role}`,
            value: employee
          }))
        }
      ]).then(({ employee }) => {
        if (employee.role === 'Manager') newManager(employee)
        else if (employee.role === 'Engineer') newEngineer(employee)
        else if (employee.role === 'Intern') newIntern(employee)
      })
    }
    else if (employeeType === 'Finish and Generate Dashboard') generateDashboard()
    else newEmployee()
  })
}

function newEngineer(employee) {
  if (employee) {
    const { name, id, email, github } = employee
    const engineer = new Engineer(name, id, email, github)
    employees.push(engineer)
    newEmployee()
  } else {
    inquirer.prompt([
      { name: 'name', message: `Engineer's name:`, type: 'input' },
      { name: 'id', message: `Engineer's employee ID:`, type: 'input' },
      { name: 'email', message: `Engineer's email:`, type: 'input' },
      { name: 'github', message: `Engineer's Github username:`, type: 'input' }
    ]).then(({ name, id, email, github }) => {
      try {
        const engineer = new Engineer(name, id, email, github)
        employees.push(engineer)
        cache.addToCollection('employees', { name, id, email, github, role: 'Engineer' })
      } catch (error) {
        console.error('\nERROR: ', error.message, '\n')
      }
    }).catch(err => {
      console.error(err)
    }).finally(() => {
      newEmployee()
    })

  }

}

function newIntern(employee) {
  if (employee) {
    let { name, id, email, school } = employee
    const intern = new Intern(name, id, email, school)
    employees.push(intern)
    newEmployee()
  } else {
    inquirer.prompt([
      { name: 'name', message: `Intern's name:`, type: 'input' },
      { name: 'id', message: `Intern's employee ID:`, type: 'input' },
      { name: 'email', message: `Intern's email:`, type: 'input' },
      { name: 'school', message: `Intern's school:`, type: 'input' }
    ]).then(({ name, id, email, school }) => {
      try {
        const intern = new Intern(name, id, email, school)
        employees.push(intern)
        cache.addToCollection('employees', { name, id, email, school, role: 'Intern' })

      } catch (error) {
        console.error('\nERROR: ', error.message, '\n')
      }

    }).catch(err => {
      console.error(err)
    }).finally(() => {
      newEmployee()
    })
  }

}

function newManager(employee) {
  if (employee) {
    let { name, id, email, officeNumber } = employee
    const manager = new Manager(name, id, email, officeNumber)
    employees.push(manager)
    newEmployee()
  } else {
    inquirer.prompt([
      { name: 'name', message: `Manager's name:`, type: 'input' },
      { name: 'id', message: `Manager's employee ID:`, type: 'input' },
      { name: 'email', message: `Manager's email:`, type: 'input' },
      { name: 'officeNumber', message: `Manager's office number:`, type: 'input' }
    ]).then(({ name, id, email, officeNumber }) => {
      try {
        const manager = new Manager(name, id, email, officeNumber)
        employees.push(manager)
        cache.addToCollection('employees', { name, id, email, officeNumber, role: 'Manager' })
      } catch (error) {
        console.error('\nERROR: ', error.message, '\n')
      }

    }).catch(err => {
      console.error(err)
    }).finally(() => {
      newEmployee()
    })
  }
}

function generateDashboard() {
  inquirer.prompt([
    { name: 'proceed', type: 'confirm', message: `Continue with ${employees.length} employees?` }
  ]).then(({ proceed }) => {
    if (proceed) {
      inquirer.prompt([
        { name: 'filename', default: 'dashboard.html', message: 'Enter new filename:', type: 'input' }
      ]).then(({ filename }) => {
        if (!filename.includes('.html')) filename += '.html'
        if (fs.existsSync(path.resolve(__dirname, 'dist', filename))) {
          inquirer.prompt([
            { name: 'overwrite', type: 'confirm', message: 'File already exists. Overwrite file?' }
          ]).then(({ overwrite }) => {
            if (overwrite) writeFile(filename)
            else generateDashboard()
          })
        } else {
          writeFile(filename)
        }
      })
    } else newEmployee()
  })
}

function writeFile(filename) {
  const html = employees.map(employee => employee.renderHtml()).join()
  let boilerplate = fs.readFileSync(path.resolve(__dirname, 'lib/boilerplate.html'), 'utf8')
  boilerplate = boilerplate.replace('%%%_CARDS_%%%', html)
  fs.writeFile(path.resolve(__dirname, 'dist', filename), boilerplate, () => {
    console.log(`File saved at './dist/${filename}'`)
  })
}

(function () {
  newEmployee()
})()