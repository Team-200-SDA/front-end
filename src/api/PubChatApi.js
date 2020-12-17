import { BASE_URL } from './Api';
import Api from './Api.js';

class PubChatApi {
  getAll() {
    return Api.get('/chat');
  }

  endpoint = `${BASE_URL}/ws`;
}

export default new PubChatApi();
