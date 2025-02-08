"use client"

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks"
import { addMessage } from "@/redux/slides/userSlice"
import { messageSchema, type TMessageSchema } from "@/utils/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useRef, useEffect } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import dayjs from "dayjs"
import { Button } from "@heroui/button"
import { PaperAirplaneIcon, ArrowLeftIcon } from "@heroicons/react/24/solid"

interface Props {
    chatId: number
    onBackToList: () => void
}

export default function ChatWindow({ chatId, onBackToList }: Props) {
    const [typing, setTyping] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const { chatList } = useAppSelector((state) => state.user)
    const chat = chatList.find((chat) => chat.id === chatId)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const { reset, handleSubmit, register } = useForm<TMessageSchema>({
        resolver: zodResolver(messageSchema),
        mode: "all",
    })

    useEffect(() => {
        scrollToBottom()
    }, [])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    if (!chat) {
        return null
    }

    const onSubmit: SubmitHandler<TMessageSchema> = (data) => {
        const now = dayjs()
        const time = now.format("hh:mm A")
        dispatch(addMessage({ chatId: chat.id, message: { sender: "You", text: data.message, time } }))

        reset()

        setTyping(true)
        setTimeout(() => {
            setTyping(false)
            dispatch(addMessage({ chatId: chat.id, message: { sender: chat.name, text: "Hola!", time } }))
        }, 3000)
    }

    return (
        <div className="flex flex-col h-full w-full">
            <div className="bg-indigo-600 text-white p-4 flex items-center">
                <button onClick={onBackToList} className="md:hidden mr-4">
                    <ArrowLeftIcon className="h-6 w-6" />
                </button>
                <h2 className="text-xl font-bold truncate flex-grow">Chat con {chat.name}</h2>
            </div>

            <div className="flex-1 overflow-hidden">
                <div className="h-full overflow-y-auto px-4 py-2 space-y-4 bg-gray-100">
                    {chat.messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`max-w-[75%] px-4 py-2 rounded-lg ${msg.sender === "You" ? "bg-indigo-500 text-white" : "bg-white text-gray-800"
                                    } shadow`}
                            >
                                <p className="break-words">{msg.text}</p>
                                <p className={`text-xs mt-1 ${msg.sender === "You" ? "text-indigo-200" : "text-gray-500"}`}>
                                    {msg.time}
                                </p>
                            </div>
                        </div>
                    ))}
                    {typing && (
                        <div className="flex justify-start">
                            <div className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg animate-pulse">
                                {chat.name} está escribiendo...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="bg-white border-t p-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            className="flex-grow p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Escribe un mensaje..."
                            {...register("message")}
                        />
                        <Button
                            className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-200 flex-shrink-0"
                            type="submit"
                        >
                            <PaperAirplaneIcon className="h-5 w-5" />
                            <span className="sr-only">Enviar</span>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

