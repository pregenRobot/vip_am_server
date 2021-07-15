// import http from "../http-common.js"
import axios from "axios"

class WorkDataService {
    getAll() {
        return axios.create({
            baseURL: "http://localhost:8080/",
            headers: {
                'content-type': 'application/json'
            }
        }).get("/work")
    }

    get(id) {
        return axios.create({
            baseURL: "http://localhost:8080/",
            headers: {
                'content-type': 'application/json'
            }
        }).get(`/work/view/${id}`);
    }

    create(data) {
        return axios.create({
            baseURL: "http://localhost:8080/",
            headers: {
                'content-type': 'application/json'
            }
        }).post("/work/commit", data);
    }

    upload(data) {
        return axios.create({
            baseURL: "http://localhost:8080/",
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).post("/work/test", data);
    }

    test(data) {
        return axios.create({
            baseURL: "https://httpbin.org/",
            headers: {
                "content-type": "multipart/form-data"
            }
        }).post("/anything", data)
    }

    dummy(){
        return axios.create({
            baseURL: "http://localhost:8080/",
            headers: {
                "content-type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        }).get("/work/dummy",{})
    }

}

export default new WorkDataService();