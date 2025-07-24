import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"

import statusRoutes from './routes/status'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  	res.send('Hello from TypeScript Server!')
})

app.use('/api/', statusRoutes)

app.use(cors())
app.use(express.json())

app.listen(port, () => {
  	console.log(`server running on port ${port}`)
})
