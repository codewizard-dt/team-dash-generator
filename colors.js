const fs = require('fs')
const path = require('path')

const inquirer = require('inquirer')

/** Defines default color scheme */
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

/**
 * Copies default stylesheet and overwrites existing `dist/style.css`
 */
function copyStylesheet() {
  fs.copyFile(getPathToTemplate(), getPathToStylesheet(), () => {
    console.log(`Stylesheet saved at './dist/style.css'`)
  })
}

/** Normalizes path to `dist/stylesheet` */
const getPathToStylesheet = () => path.resolve(__dirname, 'dist', 'style.css')
/** Normalizes path to `lib/stylesheet` */
const getPathToTemplate = () => path.resolve(__dirname, 'lib', 'style.css')
/** Creates regex to search and capture CSS variables */
const getCssVarRegex = varName => new RegExp(`(--${varName}: )(.*);`)

/** Retrieves the current CSS var value from `dist/style.css` */
function getCssVar(cssVarName) {
  const currentCss = fs.readFileSync(getPathToStylesheet(), 'utf8')
  const match = currentCss.match(getCssVarRegex(cssVarName))
  return match[2]
}
/** Replaces the current CSS var value in `dist/style.css` */
function updateCssVar(cssVarName, value) {
  const filepath = getPathToStylesheet()
  const currentCss = fs.readFileSync(filepath, 'utf8')
  const regex = getCssVarRegex(cssVarName)
  const newCss = currentCss.replace(regex, `$1${value};`)
  fs.writeFileSync(filepath, newCss)
}

/** Resets all CSS vars */
function reset() {
  copyStylesheet()
}
/** Maps varName => object for Inquirer choices object */
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

/**
 * Interactive Theme color picker
 */
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

/**
 * Checks file existence
 * @returns boolean
 */
function stylesheetExists() {
  return fs.existsSync(getPathToStylesheet())
}

/** Only export vital functions */
module.exports = { reset, copyStylesheet, customize, stylesheetExists }