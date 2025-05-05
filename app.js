import express from 'express' 
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import envs from 'dotenv'
import routeBooks from './routes/routeBook.js'
import routeAuthor from './routes/routeAuthor.js'

envs.config()

const app = express()

app.use(bodyParser.json())

mongoose.connect( process.env.MONGO_URL).then(console.log("Conecatado a la base correctamente"))

app.use('/books' , routeBooks)
app.use('/authors' , routeAuthor)

const PORT = process.env.PORT || 3000
app.listen(PORT ,() => {
    console.log("Corriento en el servidor " , PORT)
})