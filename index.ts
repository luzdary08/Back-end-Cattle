import express from 'express'
import { routesUser } from './routes/user.routes'
import { getConnection } from './config/db'
import cors from 'cors' 

const app = express()
const port = 3000

getConnection()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/v1/user', routesUser)


app.listen(3000, ()=>{
    console.log(`Escuchando en el puerto ${port}`);
})

