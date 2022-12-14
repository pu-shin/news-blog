import { createStore } from 'vuex'
// import { HTTP } from '@/axios';
import { getDatabase, update, push, child, ref, query, limitToLast, onValue } from "firebase/database";

export default createStore({
	state() {
		return {
			news: [],
			loading: false,
			dataLength: null,
			isLoggedIn: JSON.parse(localStorage.getItem("auth")),
			isActivePopup: false,
			uid: localStorage.getItem("uid"),
			selectedNews: null,
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
		setEmailVerified(state, payload) {
			state.isLoggedIn = payload;
		},
		changePopupProperty(state, payload) {
			state.isActivePopup = true;
			setTimeout(() => {
				state.isActivePopup = false;
			}, 3000);
		},
		setUid(state, payload) {
			state.uid = payload;
		},
		changeSelectedNews(state, payload) {
			state.selectedNews = payload;
		},
	},

	actions: {
		unloadNews({ commit, dispatch }, amount) {
			commit('showLoader', true)
			dispatch('setNews', amount)
		},
		async addOwnNews(context, payload) {
			try {
				//const response = await HTTP.post('/news.json', payload);
				const db = getDatabase();
				// Get a key for a new Post.
				const newPostKey = push(child(ref(db), 'news')).key;
				// Write the new news data simultaneously in the news list.
				const updates = {};
				updates['/news/' + newPostKey] = payload;
				await update(ref(db), updates);
			} catch (error) {
				console.log(error);
			}
		},

		setNews({ commit }, amount) {
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