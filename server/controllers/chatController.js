import Chat from "../models/Chat.js"

export const createChat = async (req, res) => {
    try {
        const userId = req.user._id

        const chatData = {
            userId,
            messages: [],
            name: "New Chat",
            userName: req.user.name
        }

        await Chat.create(chatData)
        return res.json({ success: true, message: "Chat Created" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getChat = async (req, res) => {
    try {
        const userId = req.user._id
        const chats = await Chat.find({ userId }).sort({ updatedAt: -1 })

        return res.json({ success: true, chats })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const deleteChat = async (req, res) => {
    try {
        const userId = req.user._id
        const { chatId } = req.body

        await Chat.deleteOne({ _id: chatId, userId })

        return res.json({ success: true, message: "Chat Deleted" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

