import axios from "axios";

const instance = axios.create({
    headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + "<API_KEY_HERE>",
    },
});

export default instance;
