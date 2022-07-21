const Intern = require('../lib/Intern')

describe('Intern', () => {
  describe('Initialization', () => {
    // Positive
    it('should define the name property based on the user input from the constructor', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const school = 'UT Austin'

      const keisha = new Intern(name, id, email, school)

      expect(keisha.name).toBe(name)
    })
    it('should define the id property based on the user input from the constructor', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const school = 'UT Austin'

      const keisha = new Intern(name, id, email, school)

      expect(keisha.id).toBe(id)
    })
    it('should define the email property based on the user input from the constructor', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const school = 'UT Austin'

      const keisha = new Intern(name, id, email, school)

      expect(keisha.email).toBe(email)
    })
    it('should define the school property based on user input from constructor', () => {
      const school = 'UT Austin'
      const sayid = new Intern('sayid', 3, 'sayid@gmail.com', school)

      expect(sayid.school).toBe(school)
    })
  })
  describe('Role', () => {
    it('should have a role of `Intern`', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const school = 'UT Austin'

      const keisha = new Intern(name, id, email, school)

      expect(keisha.getRole()).toBe('Intern')
    })
    it('should NOT have a role of `Employee`', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const school = 'UT Austin'

      const keisha = new Intern(name, id, email, school)

      expect(keisha.getRole()).not.toBe('Employee')
    })
  })
  describe('Accessors', () => {
    it('should have a getRole method', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const school = 'UT Austin'

      const keisha = new Intern(name, id, email, school)

      expect(keisha.getRole).not.toBe(undefined)
    })
    it('should have a getSchool method', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const school = 'UT Austin'

      const keisha = new Intern(name, id, email, school)

      expect(keisha.getSchool).not.toBe(undefined)
    })
    it('should NOT have a getGithub method', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const school = 'UT Austin'

      const keisha = new Intern(name, id, email, school)

      expect(keisha.getGithub).toBe(undefined)
    })
    it('should NOT have a getOfficeNumber method', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const school = 'UT Austin'

      const keisha = new Intern(name, id, email, school)

      expect(keisha.getOfficeNumber).toBe(undefined)
    })
  })

})