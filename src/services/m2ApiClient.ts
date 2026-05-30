import axios from "axios";

const m2ApiClient = axios.create({

    baseURL:
    import.meta.env.VITE_M2_API_BASE_URL,

    headers: {
        "Content-Type": "application/json",
    },

    validateStatus: function (status) {

        return status < 500;
    },
});

export default m2ApiClient;