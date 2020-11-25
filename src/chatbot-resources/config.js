/* // Config starter code
import { createChatBotMessage } from "react-chatbot-kit";

const config = {
    botName: "LearningBot",
  initialMessages: [createChatBotMessage(`Hello world`)],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
  
}

export default config; */
import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import LearningOptions from "../components/chatbot/LearningOptions";
const config = {
initialMessages: [
    createChatBotMessage("Hi, I'm here to help. What do you want to 		learn?", {
      widget: "learningOptions",
    }),
  ],
 
 widgets: [
     {
     	widgetName: "learningOptions",
    	widgetFunc: (props) => <LearningOptions {...props} />,
     },
 ],
}
export default config;