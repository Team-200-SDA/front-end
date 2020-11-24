import Api from './Api';

class UserApi {
  getLoggedInUser() {
    return Api.get('/user');
  }
}

export default new UserApi();
