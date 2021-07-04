import axios from "axios"

class AuthDataService {
    register(data) {
        return axios.create({
            baseURL: "http://localhost:8080/",
        }).post("/signup", data)
    }

    login(data) {
        return axios.create({
            baseURL: "http://localhost:8080/",
        }).post("/login", data)
    }

    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser = () => {
        return JSON.parse(localStorage.getItem("user"))
    }

    authHeader() {
        const user = JSON.parse(localStorage.getItem("user"))

        if (user && user.accessToken) {
            return { "x-access-tokenn": user.accessToken };
        } else {
            return {};
        }
    }
}


export default new AuthDataService();