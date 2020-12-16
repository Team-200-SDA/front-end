import { BASE_URL } from './Api';
import Api from './Api';

class PrivChatApi {
  sendMessage(payload) {
    return Api.post('/message', payload);
  }

  deleteMessage(id) {
    return Api.delete(`/message/${id}`);
  }

  stream = `${BASE_URL}/message/stream`;
}

export default new PrivChatApi();
