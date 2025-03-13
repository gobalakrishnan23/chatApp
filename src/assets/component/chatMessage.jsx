function ChatMessage({text,logo,email,user,messagesEndRef,name}) {
  
  return (
    <>
     <div className={`d-flex ${email === user.email && " flex justify-end w-full h-fit"}`}>
      {user.email === email ? (
        <span className="message-right flex gap-1 w-fit h-fit items-center">
            <div>{name}</div>
            <span className="message-text"  ref={messagesEndRef}>{text}</span>
            <img src={logo} alt="logo" className="logo-icon"></img>
        </span>
      ):(
        <span className="message-left flex gap-1 w-fit items-center">
            <div>{name}</div>
            <span className="message-text" ref={messagesEndRef}>{text}</span>
            <img src={logo} alt="logo" className="logo-icon" ></img>
        </span>
      )}
     </div>
    </>
  )
}

export default ChatMessage;