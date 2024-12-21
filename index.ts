import express from 'express'
import { routesUser } from './routes/user.routes'
import { getConnection } from './config/db'
import cors from 'cors' 
import dotenv from 'dotenv'
import { routesHealth } from './routes/health.routes'
import { routesHealthStatus } from './routes/healthStatus.routes'
import { routesRace } from './routes/race.routes'
import { routesFood } from './routes/food.routes'
import { routesUnit } from './routes/unit.routes'
import { routesCattle } from './routes/cattle.routes'

dotenv.config({path:'.env'})

const app = express()
const port = 3000


getConnection()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/v1/user', routesUser)
app.use('/v1/health', routesHealth)
app.use('/v1/healthStatus', routesHealthStatus)
app.use('/v1/race', routesRace)
app.use('/v1/food', routesFood)
app.use('/v1/unit', routesUnit)
app.use('/v1/cattle', routesCattle)


app.listen(3000, ()=>{
    console.log(`Escuchando en el puerto ${port}`);
})

