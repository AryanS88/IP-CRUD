import express, { request, response } from 'express'
import { PORT, mongoDBURL } from './config.js'
import mongoose from 'mongoose'
// import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoutes.js'
import cors from 'cors'
const app = express()

app.use(express.json())

//Middleware for handling CORS policy
app.use(cors())

// app.use(
//     cors({
//         origin:'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

app.use('/books', booksRoute)

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database')
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
