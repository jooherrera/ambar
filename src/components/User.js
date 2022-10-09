import { toTitleCase } from '../libs/index.js'

class User {
  constructor(firstName, lastName, emailAddress, role) {
    this.firstName = toTitleCase(firstName)
    this.lastName = toTitleCase(lastName)
    this.emailAddress = emailAddress
    this.role = role
  }

  /* ----------------- Methods ---------------- */
  fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  isAdmin() {
    return this.role === 'admin'
  }

  isUser() {
    return this.role === 'user'
  }
}

export { User }
