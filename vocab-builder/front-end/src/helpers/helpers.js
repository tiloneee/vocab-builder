import axios from "axios";
import Vue from "vue";


const getToken = () => localStorage.getItem("token");

const addAuthHeader = (config) => {
    const token = getToken();
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
};

const vm = new Vue();
const wordsURL = "http://localhost:3000/words/";
const authURL = "http://localhost:3000/auth/";
const translateURL = "http://localhost:3000/translate/";
const userURL = "http://localhost:3000/users/";

const handleError = (fn) => (...params) =>
    fn(...params).catch(error => {
        console.log(error);
        return error
    });

const handleTokenError = (fn) => (...params) =>
    fn(...params).catch(error => {
        console.log(error);
        if (error?.status === 403) {
            window.location.href="/login";
        }
        return error
    });



export const api = {
    getWord: handleError(async id => {
        const res = await axios.get(wordsURL + id);
        return res.data;
    }),
    getWords: handleError(async () => {
        const res = await axios.get(wordsURL);
        return res.data;
    }),
    deleteWord: handleTokenError(async id => {
        const config = {
            method: 'delete',
            url: wordsURL + id,
            headers: {}
        };
        addAuthHeader(config);
        const res = await axios(config);
        return res.data;
    }),
    createWord: handleTokenError(async payload => {
        const config = {
            method: "post",
            url: wordsURL,
            data: payload,
            headers: {}
        }
        addAuthHeader(config);
        const res = await axios(config);
        return res.data;
    }),
    updateWord: handleTokenError(async (payload) => {
        const config = {
            method: "put",
            url: wordsURL + payload._id,
            data: payload,
            headers: {}
        }
        addAuthHeader(config);
        const res = await axios(config);
        return res.data;
    })
}

export const authAPI = {
    login: handleError(async (payload) => {
        const res = await axios.post(authURL + "login", payload);
        return res.data;
    }),
    register: handleError(async (payload) => {
        const res = await axios.post(authURL + "register", payload);
        return res.data;
    }),
    checkToken: handleError(async () => {
        const config = {
            method: 'get',
            url: authURL + "checkToken",
            headers: {}
        };
        addAuthHeader(config);
        const res = await axios(config);
        return res.data;
    })
}

export const translateAPI = {
    translate: handleTokenError(async (text, sourceLang, targetLang) => {
        const config = {
            method: 'post',
            url: translateURL,
            data: { text, sourceLang, targetLang },
            headers: {}
        };
        addAuthHeader(config);
        const res = await axios(config);
        return res.data;
    }),
    getHistory: handleTokenError(async () => {
        const config = {
            method: 'get',
            url: translateURL + "history",
            headers: {}
        };
        addAuthHeader(config);
        const res = await axios(config);
        return res.data;
    }),
    deleteTranslation: handleTokenError(async (id) => {
        const config = {
            method: 'delete',
            url: "http://localhost:3000/translation/" + id,
            headers: {}
        };
        addAuthHeader(config);
        const res = await axios(config);
        return res.data;
    })
}

export const userAPI = {
    getUsers: async () => {
        const config = {
            method: 'get',
            url: userURL,
            headers: {}
        };
        addAuthHeader(config);
        const res = await axios(config);
        return res.data;
    },
    getUser: handleTokenError(async (id) => {
        const config = {
            method: 'get',
            url: userURL + id,
            headers: {}
        };
        addAuthHeader(config);
        console.log(config);
        const res = await axios(config);
        return res.data;
    }),
    deleteUser: handleTokenError(async (id) => {
        const config = {
            method: 'delete',
            url: userURL + id,
            headers: {}
        };
        addAuthHeader(config);
        const res = await axios(config);
        return res.data;
    }),
    updateUser: handleTokenError(async (payload) => {
        const config = {
            method: 'put',
            url: userURL + payload._id,
            data: payload,
            headers: {}
        };
        addAuthHeader(config);
        const res = await axios(config);
        return res.data;
    }),
    uploadAvatar: handleTokenError(async (userId, file) => {
        const formData = new FormData();
        formData.append("avatar", file);

        const config = {
            method: "post",
            url: `${userURL}${userId}/avatar`,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        addAuthHeader(config);

        const res = await axios(config);
        return res.data; // This will return the updated avatar URL
    })
}



