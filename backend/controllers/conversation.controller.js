import Conversation from "../models/conversation.model.js";

export const getOrCreateConversation = async (req, res) => {
  try {
    const senderId = req.id;
    const { receiverId } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    })
      .populate("participants", "fullname email profile role") // ← populate here too
      .populate("lastMessage");

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
      // populate after create
      conversation = await Conversation.findById(conversation._id)
        .populate("participants", "fullname email profile role")
        .populate("lastMessage");
    }

    return res.status(200).json({ success: true, conversation });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getMyConversations = async (req, res) => {
  try {
    const userId = req.id;
   
    const conversations = await Conversation.find({
      participants: { $in: [userId] },
    })
      .populate("participants", "fullname email profile role") // ← fixed
      .populate("lastMessage")
      .sort({ updatedAt: -1 });
   
    return res.status(200).json({ success: true, conversations });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
