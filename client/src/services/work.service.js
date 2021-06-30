import http from "../http-common.js"

class WorkDataService {
    getAll() {
        return http.get("/work")
    }

    get(id) {
        return http.get(`/work/${id}`);
    }

    create(data) {
        return http.post("/work/upload", data);
    }


}

export default new WorkDataService();