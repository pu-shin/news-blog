import axios from 'axios';

export const HTTP = axios.create({
	baseURL: `https://pu-shin-news-blog-5996b-default-rtdb.europe-west1.firebasedatabase.app`,
	headers: {}
})