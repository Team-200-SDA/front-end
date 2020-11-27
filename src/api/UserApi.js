import Api from './Api';

class UserApi {
  getLoggedInUser() {
    return Api.get("/user");
  }
  updateAddress(address) {
    return Api.put("/user/address?address=" + address);
  }
  updatePhoneno(phoneno) {
    return Api.put("/user/phoneno?phoneno=" + phoneno);
  }
  updateProfilepic(profilepic) {
    return Api.put("/user/profilepic?profilepic=" + profilepic);
  }
}

export default new UserApi();
