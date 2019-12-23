const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')
const isAuth = require('./middleware/is-auth')

const graphQLSchema = require('./graphql/schema/index')
const graphQLResolvers = require('./graphql/resolvers/index')

const app = express()

app.use(bodyParser.json())

app.use(isAuth)

// app.get('/', (req, res, next) => {
//   res.send('Hello world :)')
// })

app.use('/graphql', graphqlHttp({
  schema: graphQLSchema,
  rootValue: graphQLResolvers,
  graphiql: true
}))

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-eddrv.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(3001)
  }).catch(err => {
    console.log('Failed connection to mongoDB')
    console.log(err)
})