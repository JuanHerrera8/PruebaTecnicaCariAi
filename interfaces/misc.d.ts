interface IChat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
}

interface IMessage {
  sender: string;
  text: string;
  time: string;
}

interface IDataUser {
  chatList: IChatData[];
}

interface IChatData {
  id: number;
  name: string;
  messages: IMessage[];
}
