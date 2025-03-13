function ChatMessage({ text, logo, email, user, messagesEndRef, name,online }) {
  return (
    <>
      <div
        className={`d-flex ${
          email === user.email && " flex justify-end w-full h-fit"
        }`}
      >
        {user.email === email ? (
          <div>
            <span className="message-right flex gap-1 w-fit h-fit items-center">
              <span className="message-text" ref={messagesEndRef}>
                {text}
              </span>
            </span>
            <div className=" flex gap-2 items-center justify-end pr-2">
              <div className=" text-white">{name}</div>
              {online && (
                <button className=" border-2 border-green-700 rounded-4xl p-1 bg-green-700"></button>
              )}
              <img src={logo} alt="logo" className="logo-icon"></img>
            </div>
          </div>
        ) : (
          <div>
            <span className="message-left flex gap-1 w-fit items-center">
              <span className="message-text" ref={messagesEndRef}>
                {text}
              </span>
            </span>
            <div className=" flex gap-2 items-center pl-2">
              <img src={logo} alt="logo" className="logo-icon"></img>
              <div className=" text-white">{name}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ChatMessage;
