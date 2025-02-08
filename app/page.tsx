"use client"

import { useState } from "react"
import ChatList from "@/components/ChatList"
import ChatWindow from "@/components/ChatWindow"

export default function Home() {
    const [selectedChat, setSelectedChat] = useState<number | undefined>()
    const [showChatList, setShowChatList] = useState(true)

    const handleSelectChat = (chatId: number) => {
        setSelectedChat(chatId)
        setShowChatList(false)
    }

    const handleBackToList = () => {
        setShowChatList(true)
        setSelectedChat(undefined)
    }

    return (
        <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
            <div className={`${showChatList ? "flex" : "hidden"} md:flex md:w-1/3 lg:w-1/4 h-full`}>
                <ChatList onSelectChat={handleSelectChat} selectedChat={selectedChat} />
            </div>
            <div className={`${!showChatList ? "flex" : "hidden"} md:flex flex-1 h-full`}>
                {selectedChat ? (
                    <ChatWindow chatId={selectedChat} onBackToList={handleBackToList} />
                ) : (
                    <div className="h-full flex items-center justify-center bg-gray-100">
                        <p className="text-gray-500">Selecciona un chat</p>
                    </div>
                )}
            </div>
        </div>
    )
}





