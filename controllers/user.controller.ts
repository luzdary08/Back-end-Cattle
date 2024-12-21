import { Request, Response } from "express";
import { User } from "../models/User";
import { generateRandomCode, generateToken, hashPassword, sendEmail } from "../helper/util";
import { compare } from "bcrypt";
import jwt from 'jsonwebtoken'



export async function register(req: Request, res: Response) {

    try {

        const newUser = new User(req.body)

        const password = await hashPassword(req.body.password)

        newUser.token = generateToken()
        newUser.password = password
        newUser.code = generateRandomCode()

        await newUser.save()

        await sendEmail(newUser.email, `Hola, ${newUser.name}`, `Bienvenid@! Confirme su cuenta a traves del siguiente enlace <a href="${process.env.FRONTEND_URL}/auth/confirm/${newUser.token}">Confirmar cuenta</a> ingresando el código ${newUser.code}`)

        res.json({
            message: "Registrado correctamente"
        })

    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export async function confirmedAccount(req: Request, res: Response) {

    try {

        const token = req.params.token
        const code = req.body.code



        const findUser = await User.findOne({ token })

        if (!findUser) {
            throw new Error('Token inválido')
        }
        
        if (findUser.confirm) {
            throw new Error('Su cuenta ya ha sido confirmada')
        }
        
        if (findUser.code !== +code) {
            throw new Error('Codigo invalido')
        }

        findUser.confirm = true
        findUser.token = ""
        findUser.code = null

        await findUser.save()


        res.json({
            message: "Cuenta confirmada"
        })

    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export async function login(req: Request, res: Response) {
    try {
        const findUser = await User.findOne({email:req.body.email})

        if(!findUser){
            throw new Error('El usuario no está registrado')
        }

        if(!findUser.confirm){
            throw new Error('Active su cuenta')
        }

        // compara el password ingresado con el password hasheado
        const isSuccessPassword = await compare(req.body.password, findUser.password)

        if(!isSuccessPassword){
            throw new Error('Usuario o contraseña inválido')
        } 

        const token = jwt.sign({ id: findUser.id , name: findUser.name, email:findUser.email}, 'llave',{
            expiresIn:'20d'
        })


        res.json({
            message: token
        })


    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export async function forgetPassword(req: Request, res: Response) {
    try {
        const UserPassword = await User.findOne({email: req.body.email})
        
        if(!UserPassword){
            throw new Error('Correo no registrado')
        }

        if(!UserPassword.confirm){
            throw new Error('Su cuenta no esta activada')
        }

        UserPassword.token = generateToken()

        await UserPassword.save()

        await sendEmail(req.body.email,UserPassword.name,`Reestablecer contraseña, Haga click aquí para reestablecer su contraseña <a href="${process.env.FRONTEND_URL}/auth/reset/${UserPassword.token}">Reestablecer</a>`) 
        
        res.json({
            message:"Le enviamos un correo para restablecer su contraseña"
        })

    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }

}

export async function confirmedPassword(req: Request, res: Response) {
    try {

        console.log(req.params.token);
        
        const password = req.body.password
        const findUser = await User.findOne({token: req.params.token})

        if(!findUser){
            throw new Error('Token expirado')
        }

        const newPassword = await hashPassword(password) 

        findUser.token = ''
        findUser.password = newPassword

        await findUser.save()

        res.json({
            message:"Contraseña modificada correctamente"
        })
        
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}