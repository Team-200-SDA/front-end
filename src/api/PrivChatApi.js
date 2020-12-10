import Api from './Api';

class PrivChatApi {
  sendMessage(payload) {
    return Api.post('/message', payload);
  }

  deleteMessage(id) {
    return Api.delete(`/message/${id}`);
  }

  stream = 'https://edulane-backend.herokuapp.com/message/stream';
}

export default new PrivChatApi();
