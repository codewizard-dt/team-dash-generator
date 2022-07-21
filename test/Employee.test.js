const Employee = require("../lib/Employee")

describe('Employee', () => {
  describe('Initializaion', () => {
    // Positive
    it('should define the name property based on the user input from the constructor', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'

      const keisha = new Employee(name, id, email)

      expect(keisha.name).toBe(name)
    })
    it('should define the id property based on the user input from the constructor', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'

      const keisha = new Employee(name, id, email)

      expect(keisha.id).toBe(id)
    })
    it('should define the email property based on the user input from the constructor', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'

      const keisha = new Employee(name, id, email)

      expect(keisha.email).toBe(email)
    })

    // Negative
    it('should NOT define the school property', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'

      const keisha = new Employee(name, id, email)

      expect(keisha.school).toBe(undefined)
    })
    it('should NOT define the github property', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'

      const keisha = new Employee(name, id, email)

      expect(keisha.github).toBe(undefined)
    })
    it('should NOT define the officeNumber property', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'

      const keisha = new Employee(name, id, email)

      expect(keisha.officeNumber).toBe(undefined)
    })


    // Exception
    it('should throw an error without a name', () => {
      const cb = () => new Employee()
      const err = new Error('Name is required for new employees')
      expect(cb).toThrowError(err)
    })
    it('should throw an error without an id', () => {
      const cb = () => new Employee('Keisha')
      const err = new Error('ID is required for new employees')
      expect(cb).toThrowError(err)
    })
    it('should throw an error without an email', () => {
      const cb = () => new Employee('Keisha', 4)
      const err = new Error('Email is required for new employees')
      expect(cb).toThrowError(err)
    })
  })
  describe('Role', () => {
    it('should have a role of `Employee`', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'

      const keisha = new Employee(name, id, email)

      expect(keisha.getRole()).toBe('Employee')
    })
  })
  describe('Accessors', () => {
    it('should have a getRole method', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'

      const keisha = new Employee(name, id, email)

      expect(keisha.getRole).not.toBe(undefined)
    })
    it('should NOT have a getSchool method', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'

      const keisha = new Employee(name, id, email)

      expect(keisha.getSchool).toBe(undefined)
    })
    it('should NOT have a getGithub method', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'

      const keisha = new Employee(name, id, email)

      expect(keisha.getGithub).toBe(undefined)
    })
    it('should NOT have a getOfficeNumber method', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'

      const keisha = new Employee(name, id, email)

      expect(keisha.getOfficeNumber).toBe(undefined)
    })
  })
})