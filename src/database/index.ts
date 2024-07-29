import mongoose from 'mongoose'

const connectDB = async (url: string) => {
    try {
        const connecting = await mongoose.connect(url)
        console.log(`MongoDB Connected : ${connecting.connection.host}`)
    } catch (error: any) {
        console.error(`Error : ${error.message}`)
    }
}

export default connectDB