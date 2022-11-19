import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
	state() {
		return {
			news: [],
			url: "https://pu-shin-news-blog-5996b-default-rtdb.europe-west1.firebasedatabase.app/news.json",
		}
	},
	getters: {
	},
	mutations: {
		initNews(state, payload) {
			state.news = payload;
		},
		pushNews(state, payload) {
			state.news.push(payload)
		}
	},

	actions: {
		async uploadNews({ commit, state }) {
			try {
				const { data } = await axios.get(state.url);
				if (!data) return
				const modifiedData = Object.keys(data).map((key) => {
					return {
						id: key,
						...data[key],
					};
				});
				commit('initNews', modifiedData)
			} catch (error) {
				console.log(error);
			}
		},
		async addNews({ commit, state }, payload) {
			try {
				const { data: { name } } = await axios.post(state.url, payload);
				commit('pushNews', { ...payload, id: name })
			} catch (error) {
				console.log(error);
			}
		},
	},
	modules: {
	}
})
