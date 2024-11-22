import axios from "axios";
import Vue from "vue";
import  VueFlashMessage  from "vue-flash-message";
import 'vue-flash-message/dist/vue-flash-message.min.css';



Vue.use(VueFlashMessage, {
    messageOptions: {
        timeout: 3000,
        pauseOnInteract: true
    }
});

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

const handleError = fn => (...params) =>
  fn(...params).catch(error => {
    vm.flash(`${error.response.status}: ${error.response.statusText}`, "error");
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
    deleteWord: handleError(async id => {
        const config = {
          method: 'delete',
          url: wordsURL + id,
          headers: {}
        };
        addAuthHeader(config);
        const res = await axios(config);
        return res.data;
      }),
    createWord: handleError(async payload => {
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
    updateWord: handleError(async (payload) => {
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
    })
}


