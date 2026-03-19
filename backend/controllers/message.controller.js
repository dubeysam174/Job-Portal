// controllers/message.controller.js
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { io, onlineUsers } from "../index.js";   // ← we'll export onlineUsers too

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;                       // from your auth middleware
    const { conversationId, receiverId, text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ success: false, message: "Message cannot be empty" });
    }

    // Save message to DB
    const message = await Message.create({
      conversationId,
      sender: senderId,
      text: text.trim()
    });

    // Update conversation's lastMessage and updatedAt
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: message._id,
      updatedAt: Date.now()
    });

    // Populate sender info before emitting
    await message.populate("sender", "fullname profile.profilePhoto");

    // Emit to receiver in real-time if they're online
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("new_message", message);
    }

    return res.status(201).json({ success: true, message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all messages in a conversation
export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({ conversationId })
      .populate("sender", "fullname profile.profilePhoto")
      .sort({ createdAt: 1 });   // oldest first

    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Mark all messages in a conversation as seen
export const markAsSeen = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.id;

    await Message.updateMany(
      { conversationId, sender: { $ne: userId }, seen: false },
      { seen: true }
    );

    return res.status(200).json({ success: true, message: "Marked as seen" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};