const bcrypt = require('bcryptjs')
const User = require('../../models/user')

module.exports = {
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email})

      if(existingUser) {
        throw new Error('User already exists')
      }

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12)

      const creator = new User({
        email: args.userInput.email,
        password: hashedPassword
      })
      const result = await creator.save()

      return { ...result._doc, password: null, _id: result.id } // retrieve always null password from db for security
    } catch(err) {
      throw err
    }
  }
}