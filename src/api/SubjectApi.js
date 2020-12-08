import Api from './Api';

class SubjectApi {
  getAll() {
    return Api.get('/subjects');
  }

  getById(id) {
    return Api.get(`/subjects/${id}`);
  }

  create(payload) {
    return Api.post('/subjects', payload);
  }

  update(payload) {
    return Api.put('/subjects', payload);
  }

  delete(id) {
    return Api.delete(`/subjects/${id}`);
  }
}

export default new SubjectApi();
