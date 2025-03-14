import { useEffect, useRef, useState } from "react";
import ChatMessage from "./chatMessage";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Webcam from "react-webcam";

function Chat({ user, tick, handleLogin }) {
  const [message, setMessage] = useState([]);
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const messagesRef = collection(db, "messages");
  const messagesEndRef = useRef("");
  const videoRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState([]);
  const [facingMode, setFacingMode] = useState("user");

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

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

  const startCamera = async () => {
    setStreaming(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setStreaming(false);
    }
  };

  const toggleCamera = async () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };


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

            {streaming && (
              <video
                ref={videoRef}
                autoPlay
                className=" w-screen h-screen bg-black fixed top-0"
              />
            )}
            {streaming && (
              <img
                src="icons8-wrong-50.png"
                onClick={stopCamera}
                className=" fixed top-0"
              ></img>
            )}
            {streaming && (
              <div>
                <div className=" flex justify-center" onClick={capture}>
                  <Webcam
                    videoConstraints={{facingMode:null}}
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/png"
                    className=" border-2 border-white bg-white w-20 h-20 fixed bottom-17 rounded-4xl z-10"
                  />
                </div>
                <div>
                  <img
                    src={capturedImage}
                    className=" border-1 border-white w-10 h-10 rounded-4xl fixed bottom-17 left-15"
                  ></img>
                </div>
                <div>
                  <img onClick={toggleCamera}
                    src="icons8-change-48.png"
                    className="w-10 h-10 rounded-4xl fixed bottom-17 right-15"
                  ></img>
                </div>
              </div>
            )}
          </div>
          <div className=" flex bg-gray-700 p-1 px-4 gap-5 items-center">
            <div>
              <div>
                <img
                  width={"50px"}
                  height={"50px"}
                  src="icons8-happy-50.png"
                  onClick={handleEmoji}
                ></img>
              </div>
              {show && (
                <div className="p-2 fixed left-0 bottom-13">
                  <Picker data={data} onEmojiSelect={addEmoji} />
                </div>
              )}
            </div>
            <input
              className="  w-full placeholder:text-white outline-0 text-white my-3"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Message"
            ></input>
            <img
              onClick={startCamera}
              src="icons8-camera-30.png"
              width={"30px"}
              height={"30px"}
            ></img>
            {text ? (
              <button
                onClick={handleSubmit}
                className=" text-gray-950 bg-gray-600 p-2 rounded-4xl font-bold"
              >
                <img
                  src="icons8-sent-48.png"
                  width={"50px"}
                  height={"50px"}
                ></img>
              </button>
            ) : (
              <button className=" text-gray-950 bg-gray-600 p-2 rounded-4xl font-bold">
                <img
                  src="icons8-attach-64.png"
                  width={"50px"}
                  height={"50px"}
                ></img>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
