import { useEffect, useRef, useState } from "react";
import ChatMessage from "./chatMessage";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

function Chat({ user, tick, handleLogin }) {
  const [message, setMessage] = useState([]);
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const messagesRef = collection(db, "messages");
  const messagesEndRef = useRef("");

  async function handleSubmit() {
    const date = new Date();
    await addDoc(messagesRef, {
      text,
      email: user.email,
      logo: user.photoUrl,
      name: user.displayName,
      date,
    });
    setText("");
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [handleLogin]);

  useEffect(() => {
    const unsubscribe = onSnapshot(messagesRef, (quertSnapshot) => {
      const newMessages = quertSnapshot.docs
        .map((doc) => doc.data())
        .sort((a, b) => a.date - b.date);
      setMessage(newMessages);
    });
    return () => unsubscribe();
  }, []);

  const addEmoji = (emoji) => {
    setText(text + emoji.native);
  };
  function handleEmoji() {
    setShow(!show);
  }

  return (
    <>
      <div className=" flex justify-center items-center w-screen h-screen flex-col">
        <div className=" w-screen h-screen">
          <div className="chat-message" ref={messagesEndRef}>
            {message.map((message) => (
              <ChatMessage
                user={user}
                {...message}
                key={message.id}
                messagesEndRef={messagesEndRef}
                tick={tick}
              />
            ))}
          </div>
          <div className=" flex bg-gray-700 p-1 px-4 gap-3 items-center">
            <div>
              <div>
                <img width={"20px"} height={"20px"}
                  src="icons8-happy-50.png"
                  onClick={handleEmoji}
                ></img>
              </div>
              {show && (
                <div className="p-2 fixed left-0 bottom-13">
                  <Picker data={data} onEmojiSelect={addEmoji}/>
                </div>
              )}
            </div>
            <input
              className="  w-full placeholder:text-white outline-0 text-white"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Message"
            ></input>
            <button
              onClick={handleSubmit}
              className=" text-gray-950 bg-gray-600 p-2 rounded-4xl font-bold"
            >
              send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
