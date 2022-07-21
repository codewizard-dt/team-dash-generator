const Manager = require('../lib/Manager')

describe('Manager', () => {
  describe('Initialization', () => {
    // Positive
    it('should define the name property based on the user input from the constructor', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const officeNumber = 4

      const keisha = new Manager(name, id, email, officeNumber)

      expect(keisha.name).toBe(name)
    })
    it('should define the id property based on the user input from the constructor', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const officeNumber = 4

      const keisha = new Manager(name, id, email, officeNumber)

      expect(keisha.id).toBe(id)
    })
    it('should define the email property based on the user input from the constructor', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const officeNumber = 4

      const keisha = new Manager(name, id, email, officeNumber)

      expect(keisha.email).toBe(email)
    })
    it('should define the officeNumber property based on user input from constructor', () => {
      const officeNumber = 'my-officeNumber-name'
      const sayid = new Manager('sayid', 3, 'sayid@gmail.com', officeNumber)

      expect(sayid.officeNumber).toBe(officeNumber)
    })
  })
  describe('Role', () => {
    it('should have a role of `Manager`', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const officeNumber = 4

      const keisha = new Manager(name, id, email, officeNumber)

      expect(keisha.getRole()).toBe('Manager')
    })
    it('should NOT have a role of `Manager`', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const officeNumber = 4

      const keisha = new Manager(name, id, email, officeNumber)

      expect(keisha.getRole()).not.toBe('Employee')
    })
  })
  describe('Accessors', () => {
    it('should have a getRole method', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const officeNumber = 4

      const keisha = new Manager(name, id, email, officeNumber)

      expect(keisha.getRole).not.toBe(undefined)
    })
    it('should NOT have a getSchool method', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const officeNumber = 4

      const keisha = new Manager(name, id, email, officeNumber)

      expect(keisha.getSchool).toBe(undefined)
    })
    it('should NOT have a getGithub method', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const officeNumber = 4

      const keisha = new Manager(name, id, email, officeNumber)

      expect(keisha.getGithub).toBe(undefined)
    })
    it('should have a getOfficeNumber method', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const officeNumber = 4

      const keisha = new Manager(name, id, email, officeNumber)

      expect(keisha.getOfficeNumber).not.toBe(undefined)
    })
  })

})