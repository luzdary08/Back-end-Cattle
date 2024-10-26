import { genSalt, hash } from 'bcrypt'
import nodemailer from 'nodemailer'

export function generateToken(length = 64) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters[randomIndex];
    }

    return token;
}


export async function hashPassword(password: string): Promise<string> {
    const hPass = await genSalt(10)
    return await hash(password, hPass)
}

// Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "d2ace16208be59",
        pass: "bc7977710531be"
    }
});

export async function sendEmail(to: string, subject: string, text: string) {
    // send mail with defined transport object
    const info = await transport.sendMail({
        from: '"Ludary Canales" <canalesloyolamariana@gmailcom>', // sender address
        to, // list of receivers
        subject,
        html: `<p>${text}</p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}


export function generateRandomCode() {
    return Math.floor(100000 + Math.random() * 900000);
}
