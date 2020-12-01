import Api from './Api';

class PrivChatApi {
  sendMessage(payload) {
    Api.post('/message', payload);
  }

  stream = 'http://localhost:8080/message/stream';
}

export default new PrivChatApi();
