"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
// import ChatMessage from "./ChatMessage";
import dynamic from "next/dynamic";
const ChatMessage = dynamic(() => import("../Components/ChatMessage"));
import { ChatContext } from "./Contex/ChatContext";
import Thinking from "./Thinking";
import { MdSend } from "react-icons/md";
import Filter from "bad-words";
import modelsManager from "./Utils/ModelManagers";
import { SaveImageAPI } from "./Utils/saveImage";
/**
 * A chat view component that displays a list of messages and a form for sending new messages.
 */
const ChatView = () => {
  const messagesEndRef = useRef();
  const inputRef = useRef();
  const [formValue, setFormValue] = useState("");
  const [thinking, setThinking] = useState(false);
  const options = "OpenJourney";
  const [messages, addMessage] = useContext(ChatContext);


  /**
   * Adds a new message to the chat.
   *
   * @param {string} newValue - The text of the new message.
   * @param {boolean} [ai=false] - Whether the message was sent by an AI or the user.
   */
  const updateMessage = async (newValue, ai = false, selected) => {
    const id = Date.now() + Math.floor(Math.random() * 1000000);
    const newMsg = {
      id: id,
      createdAt: Date.now(),
      Time: new Date().toLocaleTimeString(),
      text: newValue,
      ai: ai,
      selected: options,
    };

    addMessage(newMsg);

    postdata(newMsg);
  };


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const postdata = async (data) => {
    if (data.ai === true) {
      SaveImageAPI({...data,keywords:formValue} )
    } else {
      return true;
    }
  };


  const sendMessage = async (e) => {
    e.preventDefault();

    const filter = new Filter();
    const cleanPrompt = filter.isProfane(formValue)
      ? filter.clean(formValue)
      : formValue;

    const newMsg = cleanPrompt;
    const aiModel = options;

    setThinking(true);
    setFormValue("");
    updateMessage(newMsg, false, aiModel);

    // handler request and response here
    await modelsManager(aiModel, cleanPrompt, updateMessage, setThinking);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // 👇 Get input value
      sendMessage(e);
    }
  };

  /**
   * Scrolls the chat area to the bottom when the messages array is updated.
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages, thinking]);

  /**
   * Focuses the TextArea input to when the component is first rendered.
   */
  useEffect(() => {
    inputRef.current.focus();
  }, []);



  return (
    <div className=" chatview pt-[65px] " style={{ height: "calc(100vh )" }}>
      <main className="chatview__chatarea">
        {messages.map((message, index) => {
          return (
            <ChatMessage
              className="message-text"
              key={index}
              message={{ ...message }}
            />
          );
        })}

        {thinking && <Thinking />}

        <span ref={messagesEndRef}></span>
      </main>
      <form className="form" onSubmit={sendMessage}>
        <p className="OJ_button dark:text-gray-400">OpenJourney</p>

        <div className="flex items-stretch justify-between w-full">
          <textarea
            ref={inputRef}
            className="chatview__textarea-message"
            value={formValue}
            aria-label="Search"
            onKeyDown={handleKeyDown}
            onChange={(e) => setFormValue(e.target.value)}
          />

          <button
            type="submit"
            aria-label="chatview__btn-send"
            className="chatview__btn-send"
            disabled={!formValue}
          >
            <MdSend size={30} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatView;
