import express from "express"
import 'dotenv/config'
import cors from 'cors'
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import chatRouter from "./routes/chatRoutes.js"
import messageRouter from "./routes/messageRoutes.js"

const app = express()

await connectDB()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Server is live')
})

app.use('/api/user', userRouter)
app.use('/api/chat', chatRouter)
app.use('/api/message', messageRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('http://localhost:' + PORT)
})
