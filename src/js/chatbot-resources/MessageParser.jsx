/*  Implements a messageParser class that implemnts a parse method.
 when we write and push the submit button in the chat field, 
 our MessageParser (which we passed as props to the chatbot) 
 is calling its parse method. 
 This is why this method must be implemented.  */

class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes('hello')) {
      this.actionProvider.greet();
    }
  }
}

export default MessageParser;
