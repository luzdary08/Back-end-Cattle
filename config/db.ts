import mongoose from "mongoose";

export async function getConnection() {
    try {
        const db = await mongoose.connect('mongodb+srv://canalesloyolamariana:12345@prueba.w8n14.mongodb.net/cattleProject')
        console.log(`Conexion realizada en el puerto ${db.connection.port}`);
        
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        }
    }
}