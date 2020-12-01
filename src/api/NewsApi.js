import Api from './Api';

class NewsApi {
    getAllNews() {
        return Api.get('/news');
    }
    getNewsById(id) {
        return Api.get('/news/'+id);
    }
    createNews(newNews) {
        return Api.post('/news', newNews);
    }
    updateNews(updateNews) {
        return Api.put('/news', updateNews);
    }
    deleteNews(id) {
        return Api.delete('/news/'+id);
    }
}
export default new NewsApi();