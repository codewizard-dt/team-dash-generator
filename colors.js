const fs = require('fs')
const path = require('path')

const inquirer = require('inquirer')

const colors = {
  headerBgColor: '#8F5515',
  headerTextColor: 'white',
  engineerBgColor: '#36D1DB',
  engineerTextColor: 'black',
  managerBgColor: '#DB6E42',
  managerTextColor: 'black',
  internBgColor: '#D99243',
  internTextColor: 'black',
}

function copyStylesheet() {
  fs.copyFile(getPathToTemplate(), getPathToStylesheet(), () => {
    console.log(`Stylesheet saved at './dist/style.css'`)
  })
}

const getPathToStylesheet = () => path.resolve(__dirname, 'dist', 'style.css')
const getPathToTemplate = () => path.resolve(__dirname, 'lib', 'style.css')
const getCssVarRegex = varName => new RegExp(`(--${varName}: )(.*);`)

function getCssVar(cssVarName) {
  const currentCss = fs.readFileSync(getPathToStylesheet(), 'utf8')
  const match = currentCss.match(getCssVarRegex(cssVarName))
  // console.log(match[2])
  return match[2]
}
function updateCssVar(cssVarName, value) {
  const filepath = getPathToStylesheet()
  const currentCss = fs.readFileSync(filepath, 'utf8')
  const regex = getCssVarRegex(cssVarName)
  const newCss = currentCss.replace(regex, `$1${value};`)
  fs.writeFileSync(filepath, newCss)
}

function reset() {
  copyStylesheet()
}
function mapColorToChoices(varName) {
  let choice = { value: varName }
  switch (varName) {
    case ('headerBgColor'):
      return { name: 'Page Header bg color', ...choice }
    case ('headerTextColor'):
      return { name: 'Page Header text color', ...choice }
    case ('engineerBgColor'):
      return { name: 'Engineer Card color', ...choice }
    case ('engineerTextColor'):
      return { name: 'Engineer Card text color', ...choice }
    case ('managerBgColor'):
      return { name: 'Manager Card color', ...choice }
    case ('managerTextColor'):
      return { name: 'Manager Card text color', ...choice }
    case ('internBgColor'):
      return { name: 'Intern Card color', ...choice }
    case ('internTextColor'):
      return { name: 'Intern Card text color', ...choice }
  }
}
function customize() {
  let colorChoices = Object.keys(colors).map(mapColorToChoices)
  inquirer.prompt([
    { name: 'varNames', type: 'checkbox', message: 'Select colors to change:', choices: colorChoices }
  ]).then(({ varNames }) => {
    inquirer.prompt(varNames.map(varName => {
      const current = getCssVar(varName)
      const color = colorChoices.find(({ value }) => varName === value)
      return ({
        name: varName, type: 'input', default: current, message: `New ${color.name}:`
      })
    })).then(answers => {
      for (let [varName, color] of Object.entries(answers)) {
        updateCssVar(varName, color)
      }
    })
  })
}

function stylesheetExists() {
  return fs.existsSync(getPathToStylesheet())
}

module.exports = { reset, copyStylesheet, customize, stylesheetExists }