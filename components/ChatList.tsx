"use client"

import { useAppSelector } from "@/hooks/reduxHooks"
import { UserCircleIcon } from "@heroicons/react/24/solid"

interface Props {
    onSelectChat: (chatId: number) => void
    selectedChat?: number
}

export default function ChatList({ onSelectChat, selectedChat }: Props) {
    const { chatList } = useAppSelector((state) => state.user)

    return (
        <div className="flex flex-col h-full w-full bg-gray-50">
            <div className="bg-indigo-600 text-white p-4">
                <h2 className="text-xl font-bold">Chats Activos</h2>
            </div>
            <div className="flex-grow overflow-y-auto">
                {chatList.map((chat) => {
                    const lastMessage = chat.messages[chat.messages.length - 1]
                    return (
                        <div
                            key={chat.id}
                            className={`p-4 cursor-pointer transition-colors duration-200 ${selectedChat === chat.id
                                    ? "bg-indigo-100 border-l-4 border-indigo-600"
                                    : "hover:bg-indigo-50 border-l-4 border-transparent"
                                }`}
                            onClick={() => onSelectChat(chat.id)}
                        >
                            <div className="flex items-center space-x-3">
                                <UserCircleIcon className="h-10 w-10 text-indigo-600 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 truncate">{chat.name}</p>
                                    <p className="text-sm text-gray-500 truncate">{lastMessage.text}</p>
                                </div>
                                <p className="text-xs text-gray-400 whitespace-nowrap">{lastMessage.time}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}




