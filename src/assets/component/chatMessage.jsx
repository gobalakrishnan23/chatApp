function ChatMessage({
  text,
  logo,
  email,
  user,
  messagesEndRef,
  name,
  online,
}) {
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
              <div>
                <h2>Status: {online ? "🟢 Online" : "🔴 Offline"}</h2>
              </div>
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
              <div>
                <h2>Status: {online}</h2>
              </div>
              <div className=" text-white">{name}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ChatMessage;
