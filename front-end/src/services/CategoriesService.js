import HttpClient from "./utils/HttpClient";

class CategoriesService {
    constructor() {
        this.HttpClient = new HttpClient('http://localhost:3001');
    }

    listCategories(orderBy = 'asc') {
        return this.HttpClient.get('/categories');
    }
}

export default new CategoriesService();