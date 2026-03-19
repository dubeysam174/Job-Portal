import ConversationList from "./ConversationList.jsx";
import ChatWindow from "./ChatWindow.jsx";
import Navbar from "../shared/Navbar.jsx";

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="flex h-[calc(100vh-64px)] max-w-7xl mx-auto gap-4 p-4">

        {/* Sidebar */}
        <div className="w-[280px] flex-shrink-0 
        bg-white dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700 
        rounded-2xl overflow-hidden shadow-sm">

          <ConversationList />
        </div>

        {/* Chat Area */}
        <div className="flex-1 
        bg-white dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700 
        rounded-2xl shadow-sm flex flex-col overflow-hidden">

          <ChatWindow />
        </div>

      </div>
    </div>
  );
}