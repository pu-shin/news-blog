import { createStore } from 'vuex'
import { HTTP } from '@/axios';
import { getDatabase, ref, query, limitToLast, onValue } from "firebase/database";

export default createStore({
	state() {
		return {
			news: [],
			loading: false,
			dataLength: null,
		}
	},
	getters: {
	},
	mutations: {
		initNews(state, payload) {
			state.news = payload.reverse();
		},
		setDataLength(state, payload) {
			state.dataLength = payload
		},
		showLoader(state, payload) {
			state.loading = payload;
		},
	},

	actions: {
		unloadNews({ commit, dispatch }, amount) {
			commit('showLoader', true)
			dispatch('setNews', amount)
		},
		async addOwnNews(context, payload) {
			try {
				const response = await HTTP.post('/news.json', payload);
			} catch (error) {
				console.log(error);
			}
		},
		setNews({ state, commit }, amount) {
			const db = getDatabase();
			const recentPostsRef = query(ref(db, 'news/'), limitToLast(amount));
			onValue(recentPostsRef, (posts) => {
				const data = posts.val() ? posts.val() : [];
				const modifiedData = Object.keys(data).map((key) => {
					return {
						id: key,
						...data[key],
					};
				});
				commit('initNews', modifiedData)
				commit('showLoader', false)
			});
		},
		getNewsLength({ commit }) {
			const db = getDatabase();
			const recentPostsRef = query(ref(db, 'news/'));
			onValue(recentPostsRef, (posts) => {
				commit('setDataLength', posts.size)
			})
		},

	},
	modules: {}
})