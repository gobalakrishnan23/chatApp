import { useEffect, useRef, useState } from "react";
import ChatMessage from "./chatMessage";
import { addDoc,collection, doc, onSnapshot, } from "firebase/firestore";
import { db } from "../config/firebase";

function Chat({user}) {

    const [message,setMessage] = useState([]);
    const [text,setText] = useState("");
    const messagesRef = collection(db, "messages")
    const messagesEndRef = useRef("");

    async function handleSubmit(){
        const date = new Date();
        await addDoc(messagesRef,{
            text,
            email: user.email,
            logo: user.photoUrl,
            name: user.displayName,
            date
        })
        setText("")
    }

    useEffect(()=>{
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    },[handleSubmit])

    useEffect(()=>{
        const unsubscribe = onSnapshot(messagesRef,(quertSnapshot) => {
            const newMessages = quertSnapshot.docs.map((doc) => doc.data()).sort((a,b) => a.date - b.date);
            setMessage(newMessages)
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        });
        return () => unsubscribe();
    },[text])

    return (
      <>
       <div className=" flex justify-center items-center w-screen h-screen flex-col">
         <div className=" w-screen h-screen">
            <div className="chat-message"  ref={messagesEndRef}>
                {
                    message.map((message)=>(
                        <ChatMessage user={user} {...message} key={message.id} messagesEndRef={messagesEndRef}/>
                    ))
                }
            </div>
            <div className=" flex bg-gray-700 p-1 px-4 gap-3">
                <input className=" placeholder:text-white w-full outline-0 text-white" type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Message"></input>
                <button onClick={handleSubmit} className=" text-gray-950 bg-gray-600 p-2 rounded-4xl font-bold">send</button>
            </div>
         </div>
       </div>
      </>
    )
  }
  
  export default Chat;