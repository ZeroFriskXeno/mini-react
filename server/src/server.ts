import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello from TypeScript Server!')
})

app.listen(port, () => {
  console.log(`server running on port ${port}`)
})
