import { Router } from 'express'
import { confirmedAccount, confirmedPassword, forgetPassword, login, register } from '../controllers/user.controller'

export const routesUser = Router()

routesUser.post('/register',register)
routesUser.put('/confirmed/:token', confirmedAccount)
routesUser.post('/login', login)
routesUser.post('/forget-password', forgetPassword)
routesUser.put('/confirmed-password/:token', confirmedPassword)


