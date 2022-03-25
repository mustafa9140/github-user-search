import axios from "axios";

const instance = axios.create({
    headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + "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",
    },
});

export default instance;