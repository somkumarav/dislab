import { useState } from 'react';
import { socket } from '../App';

interface Props {
  setUser: React.Dispatch<
    React.SetStateAction<{
      userName: string;
      roomId: string;
    }>
  >;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Login: React.FC<Props> = ({ setUser, setIsAuth }) => {
  const [userData, setUserData] = useState({ userName: '', roomId: '' });

  const handleSubmit = () => {
    if (userData.userName !== '' && userData.roomId !== '') {
      setUser(userData);
      setIsAuth(true);
      socket.emit('join_room', userData.roomId);
    }
  };

  return (
    <div className="login">
      <h3>Sign In</h3>
      <div>
        <input
          className="fontawesome"
          type="text"
          placeholder="Username"
          value={userData.userName}
          onChange={(e) => {
            setUserData({ ...userData, userName: e.target.value });
          }}
        />
        <input
          className="fontawesome"
          type="text"
          placeholder="Room Id"
          value={userData.roomId}
          onChange={(e) => {
            setUserData({ ...userData, roomId: e.target.value });
          }}
        />
      </div>
      <button onClick={handleSubmit}>Sign In</button>
    </div>
  );
};
