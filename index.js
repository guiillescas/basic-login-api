const express = require('express')
const jwt = require('jsonwebtoken');

const users = require('./users.json')

const app = express()
const port = 3333

app.use(express.json())

app.post('/login', (req, res) => {
  try {
    const { email, password } = req.body
  
    const matchedUser = users.find(user => user.email === email)
  
    if (matchedUser) {
      if (matchedUser.password === password) {
        const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
  
        return res.status(200).send({
          token
        })
      }
  
      return res.status(404).send('Usuário ou senha incorretos')
    }
  
    return res.status(404).send()
  } catch (error) {
    return res.status(500).send()
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port} 🚀`)
})
