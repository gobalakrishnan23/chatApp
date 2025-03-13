import { useState } from 'react';
import './App.css'
import Chat from './assets/component/chat';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './assets/config/firebase';

function App() {

  const [user,setUser] = useState(null);

  function handleLogin(){
    signInWithPopup(auth,provider)
       .then((result) => setUser(result._tokenResponse))
       .catch((error) => console.log(error));
  }
  
  return (
    <>
     <div>
       {
        user ? <Chat user={user}/> : <div className=' flex flex-col justify-center items-center h-screen'>
          <div>
            <img  src='vector-chat-icon-png_302635.jpg' width={100} height={100} style={{borderRadius:"50%"}}></img>
          </div>
          <div>
            <button className=' text-white bg-blue-600 p-2 rounded-2xl mt-5' onClick={handleLogin}>Login</button>
          </div>
        </div>
       }
     </div>
    </>
  )
}

export default App;
