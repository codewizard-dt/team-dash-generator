
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

const JsonCache = require('./lib/JsonCache.js')
const colors = require('./colors.js')

const Intern = require('./lib/Intern.js')
const Engineer = require('./lib/Engineer.js');
const Manager = require('./lib/Manager.js');

/** Initialize cache */
const cache = new JsonCache('cache.json')
/** Initialize current list of employees */
const employees = []

/**
 * Interactive prompt to add a new Employee
 */
function newEmployee() {
  const choices = [
    { value: 'Manager', name: 'New Manager' },
    { value: 'Engineer', name: 'New Engineer' },
    { value: 'Intern', name: 'New Intern' },
  ]
  /** Gets employees from cache */
  const cachedChoices = cache.getCollection('employees')
    /** Filters out already selected employees */
    .filter(({ id }) =>
      employees.find(({ id: id2 }) => id2 === id) === undefined
    )
    /** Maps cached employee to user-friendly string */
    .map(employee => (
      {
        name: `${employee.name} - ${employee.role}`,
        value: employee
      }
    ))

  /** Adds `choose from cache` option if appropriate */
  if (cachedChoices.length > 0) choices.push('---', `Choose from cache (${cachedChoices.length})`)
  /** Add `finish` option if more than one employee selected */
  if (employees.length > 0) choices.push('---', `Finish and Generate Dashboard`)

  /**
   * Start prompt
   */
  inquirer.prompt([
    {
      name: 'employeeType',
      message: 'Select an employee:',
      type: 'list',
      choices
    }
  ]).then(({ employeeType }) => {
    /** Create new employees */
    if (employeeType === 'Engineer') newEngineer()
    else if (employeeType === 'Intern') newIntern()
    else if (employeeType === 'Manager') newManager()
    else if (employeeType.includes('Choose from cache')) {
      /** Choose from cached options */
      inquirer.prompt([
        {
          name: 'employee',
          message: 'Select employee:',
          type: 'list',
          choices: cachedChoices
        }
      ]).then(({ employee }) => {
        /** Add cached choice to current list */
        if (employee.role === 'Manager') newManager(employee)
        else if (employee.role === 'Engineer') newEngineer(employee)
        else if (employee.role === 'Intern') newIntern(employee)
      })
    }
    else if (employeeType === 'Finish and Generate Dashboard') generateDashboard()
    /** Ask again if choice was invalid (ie you selected `---`) */
    else newEmployee()
  })
}

/** Adds Engineer to list */
function newEngineer(employee) {
  /** If passed an existing employee, skip prompts */
  if (employee) {
    const { name, id, email, github } = employee
    const engineer = new Engineer(name, id, email, github)
    employees.push(engineer)
    newEmployee()
  } else {
    /** 
     * Prompt user for Engineer info
     */
    inquirer.prompt([
      { name: 'name', message: `Engineer's name:`, type: 'input' },
      { name: 'id', message: `Engineer's employee ID:`, type: 'input' },
      { name: 'email', message: `Engineer's email:`, type: 'input' },
      { name: 'github', message: `Engineer's Github username:`, type: 'input' }
    ]).then(({ name, id, email, github }) => {
      try {
        const engineer = new Engineer(name, id, email, github)
        employees.push(engineer)
        /** Cache the Engineer with role explicity defined */
        cache.addToCollection('employees', { name, id, email, github, role: 'Engineer' })
      } catch (error) {
        console.error('\nERROR: ', error.message, '\n')
      }
    }).catch(err => {
      console.error(err)
    }).finally(() => {
      /** After adding Engineer, prompt user for further direction */
      newEmployee()
    })

  }

}

/** Adds Intern to list */
function newIntern(employee) {
  /** If passed an existing employee, skip prompts */
  if (employee) {
    let { name, id, email, school } = employee
    const intern = new Intern(name, id, email, school)
    employees.push(intern)
    newEmployee()
  } else {
    /**
     * Prompt user for Intern info
     */
    inquirer.prompt([
      { name: 'name', message: `Intern's name:`, type: 'input' },
      { name: 'id', message: `Intern's employee ID:`, type: 'input' },
      { name: 'email', message: `Intern's email:`, type: 'input' },
      { name: 'school', message: `Intern's school:`, type: 'input' }
    ]).then(({ name, id, email, school }) => {
      try {
        const intern = new Intern(name, id, email, school)
        employees.push(intern)
        /** Cache the Intern with role explicity defined */
        cache.addToCollection('employees', { name, id, email, school, role: 'Intern' })
      } catch (error) {
        console.error('\nERROR: ', error.message, '\n')
      }
    }).catch(err => {
      console.error(err)
    }).finally(() => {
      /** After adding Intern, prompt user for further direction */
      newEmployee()
    })
  }

}

/** Adds Manager to list */
function newManager(employee) {
  /** If passed an existing employee, skip prompts */
  if (employee) {
    let { name, id, email, officeNumber } = employee
    const manager = new Manager(name, id, email, officeNumber)
    employees.push(manager)
    newEmployee()
  } else {
    /**
     * Prompt user for Manager info
     */
    inquirer.prompt([
      { name: 'name', message: `Manager's name:`, type: 'input' },
      { name: 'id', message: `Manager's employee ID:`, type: 'input' },
      { name: 'email', message: `Manager's email:`, type: 'input' },
      { name: 'officeNumber', message: `Manager's office number:`, type: 'input' }
    ]).then(({ name, id, email, officeNumber }) => {
      try {
        const manager = new Manager(name, id, email, officeNumber)
        employees.push(manager)
        /** Cache the Manager with role explicity defined */
        cache.addToCollection('employees', { name, id, email, officeNumber, role: 'Manager' })
      } catch (error) {
        console.error('\nERROR: ', error.message, '\n')
      }
    }).catch(err => {
      console.error(err)
    }).finally(() => {
      /** After adding Manager, prompt user for further direction */
      newEmployee()
    })
  }
}

/** Assigns each Role an integer for sorting */
function mapRole(role) {
  switch (role) {
    case ('Intern'):
      return 0
    case ('Engineer'):
      return 1
    case ('Manager'):
      return 2
    default:
      return -1
  }
}
/** Sort Employees by role  */
function sortByRoles({ role: roleA }, { role: roleB }) {
  roleA = mapRole(roleA)
  roleB = mapRole(roleB)
  return roleB - roleA
}
/** Sort Employees by increasing Employee ID */
function sortByIds({ id: idA }, { id: idB }) {
  return idA - idB
}

/**
 * Generates the HTML and CSS
 */
function generateDashboard() {
  console.log('\n')
  /** Prompt user to confirm */
  inquirer.prompt([
    { name: 'proceed', type: 'confirm', message: `Continue with ${employees.length} employees?` }
  ]).then(({ proceed }) => {
    /** User confirmed positive */
    if (proceed) {
      inquirer.prompt([
        /** Prompts user for filename */
        { name: 'filename', default: 'dashboard.html', message: 'Enter new filename:', type: 'input' }
      ]).then(({ filename }) => {
        /** Appends `.html` if necessary */
        if (!filename.includes('.html')) filename += '.html'
        /** Checks file existence */
        if (fs.existsSync(path.resolve(__dirname, 'dist', filename))) {
          /** Prompt user to confirm file overwrite */
          inquirer.prompt([
            { name: 'overwrite', type: 'confirm', message: 'File already exists. Overwrite file?' }
          ]).then(({ overwrite }) => {
            /** Overwrite file */
            if (overwrite) writeFile(filename)
            /** Ask for a different file name */
            else generateDashboard()
          })
        } else {
          /** File does not exist, so write file */
          writeFile(filename)
        }
      })
      /** User did not confirm, ask for further direction */
    } else newEmployee()
  })
}

/**
 * Generates HTML and writes to a file
 * @param {string} filename the desired html file name
 */
function writeFile(filename) {
  /** Generates template literal from sorted Employees */
  const html = employees.sort(sortByIds).sort(sortByRoles).map(employee => employee.renderHtml()).join('')
  /** Retrieves boilerplate template HTML file contents */
  let boilerplate = fs.readFileSync(path.resolve(__dirname, 'lib/boilerplate.html'), 'utf8')
  /** Replaces the `%%%_CARDS_%%% placeholder with actual content */
  boilerplate = boilerplate.replace('%%%_CARDS_%%%', html)
  /** Write data to file */
  fs.writeFile(path.resolve(__dirname, 'dist', filename), boilerplate, () => {
    console.log(`File saved at './dist/${filename}'`)
  })
  /** 
   * Copy stylesheet if it doesn't exist
   * Customized theme colors are not overwritten
   *  */
  if (!colors.stylesheetExists()) colors.copyStylesheet()
}

/** Starts the script */
(function () {
  /** Present color options to user if `dist/style.css` already exists  */
  if (colors.stylesheetExists()) {
    inquirer.prompt([
      { name: 'mode', type: 'list', message: 'What would you like to do?', choices: ['Generate new HTML', 'Customize colors', 'Reset colors'] }
    ]).then(({ mode }) => {
      /** Handle user input */
      if (mode === 'Generate new HTML') newEmployee()
      else if (mode === 'Customize colors') colors.customize()
      else if (mode === 'Reset colors') colors.reset()
    })
  } else {
    /** Prompt user to create employees  */
    newEmployee()
  }
})()