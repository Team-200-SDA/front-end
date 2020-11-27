import Api from './Api';

class AssignmentApi {
    getAllAssignment() {
        return Api.get('/assignments');
    }
    getAssignmentById(id) {
        return Api.get('/assignments/'+id);
    }
    createAssignment(newAssignment) {
        return Api.post('/assignments', newAssignment);
    }
    updateAssignment(updateAssignment) {
        return Api.put('/assignments', updateAssignment);
    }
    deleteAssignment(id) {
        return Api.delete('/assignments/'+id);
    }
}
export default new AssignmentApi();