import { useEffect } from "react";

function ChatMessage({
  text,
  logo,
  email,
  user,
  messagesEndRef,
  name,
  tick,
  date,
  previewUrl
}) {
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, ["active"]);

  const displayUsername = name?.length > 20 ? name.slice(0, 20) + "..." : name;

  return (
    <>
      <div
        className={`d-flex ${
          email === user.email && " flex justify-end w-full h-fit"
        }`}
      >
        {user.email === email ? (
          <div className="active">
            <span className="message-right flex gap-1 w-fit h-fit flex-col">
              <span className="message-text " ref={messagesEndRef}>
                {text}
              </span>
              <img src={previewUrl}></img>
              <span>
                <p className=" text-xs p-2">
                  {new Date(
                    date.seconds * 1000 + date.nanoseconds / 1e6
                  ).toLocaleString("en-US", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </p>
              </span>
            </span>
            <div className=" flex gap-2 items-center justify-end pr-2">
              <div className=" text-white">{displayUsername}</div>
              <img src={logo} alt="logo" className="logo-icon"></img>
            </div>
          </div>
        ) : (
          <div className="active">
            <span className="message-left flex gap-1 w-fit h-fit flex-col">
              <span className="message-text" ref={messagesEndRef}>
                {text}
              </span>
              <img src={previewUrl}></img>
              <span>
                <p className=" text-xs p-2">
                  {new Date(
                    date.seconds * 1000 + date.nanoseconds / 1e6
                  ).toLocaleString("en-US", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </p>
              </span>
            </span>
            <div className=" flex gap-2 items-center pl-2">
              <img src={logo} alt="logo" className="logo-icon"></img>
              <div className=" text-white">{displayUsername}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ChatMessage;
