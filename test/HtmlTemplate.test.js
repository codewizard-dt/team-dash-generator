const HtmlTemplate = require('../lib/HtmlTemplate.js')
const Employee = require('../lib/Employee.js')
const Manager = require('../lib/Manager.js')
const Engineer = require('../lib/Engineer.js')
const Intern = require('../lib/Intern.js')

describe('HtmlTemplate', () => {
  describe('Render method', () => {
    it('should call `getOfficeNumber` when role is Manager', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const officeNumber = 4

      const keisha = new Manager(name, id, email, officeNumber)
      const template = new HtmlTemplate(keisha)

      const mock = jest.spyOn(template.employee, 'getOfficeNumber')

      template.renderHtml()

      expect(mock).toHaveBeenCalled()
    })
    it('should call `getGithub` when role is Engineer', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const github = 'keisha-gh'

      const keisha = new Engineer(name, id, email, github)
      const template = new HtmlTemplate(keisha)

      const mock = jest.spyOn(template.employee, 'getGithub')

      template.renderHtml()

      expect(mock).toHaveBeenCalled()
    })
    it('should call `getSchool` when role is Intern', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const school = 'UT Austin'

      const keisha = new Intern(name, id, email, school)
      const template = new HtmlTemplate(keisha)

      const mock = jest.spyOn(template.employee, 'getSchool')

      template.renderHtml()

      expect(mock).toHaveBeenCalled()
    })
    it('should call NOT throw an error with base Employee', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'

      const keisha = new Employee(name, id, email)
      const template = new HtmlTemplate(keisha)

      // const mock = jest.spyOn(template.employee, 'getSchool')

      // template.renderHtml()

      expect(() => {
        template.renderHtml()
      }).not.toThrow()
    })
  })

})