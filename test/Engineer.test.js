const Engineer = require('../lib/Engineer')

describe('Engineer', () => {
  describe('Initialization', () => {
    // Positive
    it('should define the name property based on the user input from the constructor', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const github = 'keisha-gh'

      const keisha = new Engineer(name, id, email, github)

      expect(keisha.name).toBe(name)
    })
    it('should define the id property based on the user input from the constructor', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const github = 'keisha-gh'

      const keisha = new Engineer(name, id, email, github)

      expect(keisha.id).toBe(id)
    })
    it('should define the email property based on the user input from the constructor', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const github = 'keisha-gh'

      const keisha = new Engineer(name, id, email, github)

      expect(keisha.email).toBe(email)
    })
    it('should define the github property based on user input from constructor', () => {
      const github = 'my-github-name'
      const sayid = new Engineer('sayid', 3, 'sayid@gmail.com', github)

      expect(sayid.github).toBe(github)
    })
  })
  describe('Role', () => {
    it('should have a role of `Engineer`', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const github = 'keisha-gh'

      const keisha = new Engineer(name, id, email, github)

      expect(keisha.getRole()).toBe('Engineer')
    })
    it('should NOT have a role of `Employee`', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const github = 'keisha-gh'

      const keisha = new Engineer(name, id, email, github)

      expect(keisha.getRole()).not.toBe('Employee')
    })
  })
  describe('Accessors', () => {
    it('should have a getRole method', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const github = 'keisha-gh'


      const keisha = new Engineer(name, id, email, github)

      expect(keisha.getRole).not.toBe(undefined)
    })
    it('should NOT have a getSchool method', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const github = 'keisha-gh'

      const keisha = new Engineer(name, id, email, github)

      expect(keisha.getSchool).toBe(undefined)
    })
    it('should have a getGithub method', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const github = 'keisha-gh'

      const keisha = new Engineer(name, id, email, github)

      expect(keisha.getGithub).not.toBe(undefined)
    })
    it('should NOT have a getOfficeNumber method', () => {
      const name = 'Keisha'
      const id = 1
      const email = 'keisha@gmail.com'
      const github = 'keisha-gh'

      const keisha = new Engineer(name, id, email, github)

      expect(keisha.getOfficeNumber).toBe(undefined)
    })
  })

})