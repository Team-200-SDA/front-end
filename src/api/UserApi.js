import Api from './Api';

class UserApi {
  getLoggedInUser() {
    return Api.get("/user");
  }
  updateUser(user) {
    return Api.put("/user", user);
  }
}

export default new UserApi();
