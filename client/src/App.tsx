import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './sass/App.scss';

// Todo

import { ChatWindow } from './pages/ChatWindow';
import { Login } from './pages/Login';

export const socket = io(process.env.REACT_APP_URL || 'http://localhost:4000');

function App() {
  const [user, setUser] = useState({ userName: '', roomId: '' });
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    if (user.roomId !== '' && user.userName !== '') {
      localStorage.setItem('dislab_auth', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const data = localStorage.getItem('dislab_auth');
    if (data) {
      const obj = JSON.parse(data);
      setUser(obj);
      setIsAuth(true);
      socket.emit('join_room', obj.roomId);
    }
  }, []);

  return (
    <div className="app">
      {isAuth ? (
        <ChatWindow userName={user.userName} roomId={user.roomId} />
      ) : (
        <Login setUser={setUser} setIsAuth={setIsAuth} />
      )}
    </div>
  );
}

export default App;
