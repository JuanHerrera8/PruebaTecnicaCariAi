"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialChatList: IChatData[] = [
    {
        id: 1,
        name: "John Doe",
        messages: [
            {
                sender: "John Doe",
                text: "Hola!",
                time: "12:00",
            },
        ],
    },
    {
        id: 2,
        name: "Jane Doe",
        messages: [
            {
                sender: "Jane Doe",
                text: "Hello",
                time: "12:00",
            },
            {
                sender: "You",
                text: "Hi!",
                time: "12:01",
            },
            {
                sender: "Jane Doe",
                text: "How are you?",
                time: "12:02",
            }
        ],
    },
];

const initialState: IDataUser = {
    chatList: initialChatList,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addMessage: (
            state,
            action: PayloadAction<{ chatId: number; message: IMessage }>
        ) => {
            const chat = state.chatList.find(
                (chat) => chat.id === action.payload.chatId
            );
            if (chat) {
                chat.messages.push(action.payload.message);
                console.log("Chat updated", chat.messages);
            }
        },
        addChat: (state, action: PayloadAction<IChatData>) => {
            state.chatList.push(action.payload);
        },
    },
});

export const { addMessage, addChat } = userSlice.actions;

export default userSlice.reducer;
