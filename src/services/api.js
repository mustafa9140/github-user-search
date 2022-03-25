import axios from "axios";

const instance = axios.create({
    headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + "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",
    },
});

export default instance;
