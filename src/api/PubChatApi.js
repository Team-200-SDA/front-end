import Api from './Api';

class PubChatApi {
  getAll() {
    return Api.get('/chat');
  }

  endpoint = 'https://edulane-backend.herokuapp.com/ws';
}

export default new PubChatApi();
