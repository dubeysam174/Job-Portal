import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    conversations: [],
    currentConversation: null,
    messages: [],
    unreadCounts: {}       // conversationId -> count
  },
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    updateLastMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      const conv = state.conversations.find(c => c._id === conversationId);
      if (conv) conv.lastMessage = message;
    },
    incrementUnread: (state, action) => {
      const id = action.payload;
      state.unreadCounts[id] = (state.unreadCounts[id] || 0) + 1;
    },
    clearUnread: (state, action) => {
      state.unreadCounts[action.payload] = 0;
    }
  }
});

export const {
  setConversations,
  setCurrentConversation,
  setMessages,
  addMessage,
  updateLastMessage,
  incrementUnread,
  clearUnread
} = messageSlice.actions;

export default messageSlice.reducer;