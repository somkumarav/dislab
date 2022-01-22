import { useEffect, useState } from 'react';
import { MdSend } from 'react-icons/md';

import { SlateEditor } from '../components/SlateEditor';
import { Message } from '../components/Message';
import { socket } from '../App';

interface Props {
  userName: string;
  roomId: string;
}

export interface Msg {
  text: string;
}

interface IMessage {
  id: number;
  room: string;
  author: string;
  msg: Msg[];
  time: string;
}

export const ChatWindow: React.FC<Props> = ({ userName, roomId }) => {
  const [currentMessage, setCurrentMessage] = useState<Msg[]>([]);
  const [messageList, setMessageList] = useState<IMessage[]>([]);
  const [clearMessage, setClearMessage] = useState<boolean>(false);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((prev) => [...prev, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    if (currentMessage[0].text.length > 0) {
      const data: IMessage = {
        id: new Date(Date.now()).getTime(),
        author: userName,
        room: roomId,
        msg: currentMessage,
        time: `${new Date(Date.now()).getHours()}:${new Date(
          Date.now()
        ).getMinutes()}`,
      };

      await socket.emit('send_message', data);
      setMessageList((prev) => [...prev, data]);
      setClearMessage(true);
    }
  };

  const logout = () => {
    localStorage.removeItem('dislab_auth');
    window.location.reload();
  };

  return (
    <div className="chatwindow">
      <div className="chat-header">
        <h4>{userName}</h4>
      </div>
      <div className="chat-body">
        <Message messageList={messageList} userName={userName} />
      </div>
      <div className="chat-input">
        <button className="chat-input-logout" onClick={logout}>
          Sign Out
        </button>
        <SlateEditor
          setCurrentMessage={setCurrentMessage}
          clearMessage={clearMessage}
          setClearMessage={setClearMessage}
        />
        <button className="chat-input-send" onClick={sendMessage}>
          <MdSend />
        </button>
      </div>
    </div>
  );
};
