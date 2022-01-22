import { useEffect, useRef } from 'react';

interface Props {
  userName: string;
  messageList: {
    id: number;
    author: string;
    msg: {
      text: string;
    }[];
    time: string;
  }[];
}

export const Message: React.FC<Props> = ({ messageList, userName }) => {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageRef.current?.scrollIntoView();
  }, [messageList]);

  return (
    <div className="message">
      {messageList.map((message) => {
        return (
          <div
            key={message.id}
            className={`msg ${userName === message.author && 'you'}`}
          >
            <div className="msg-meta">
              <p className="msg-meta-author">
                {message.author === userName ? 'you' : message.author}
              </p>
              <p className="msg-meta-time">{message.time}</p>
            </div>
            <div className="msg-text">
              {message.msg.map((item, index) => {
                return <p key={index}>{item.text}</p>;
              })}
            </div>
          </div>
        );
      })}
      <div ref={messageRef}></div>
    </div>
  );
};
