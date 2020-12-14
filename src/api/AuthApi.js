import Api from './Api';

class AuthApi {
  authenticate({ email, password }) {
    return Api.post('/authenticate', { email, password });
  }

  register({ name, email, password, teacherCode }) {
    const teachCodeQuery = teacherCode !== '' ? '/' + teacherCode : '';
    return Api.post(`/register${teachCodeQuery}`, { name, email, password });
  }
}

export default new AuthApi();
