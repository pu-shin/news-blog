// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAeVV-T_D4gDxWzm6ZfjMZEYQpT4wtViBk",
	authDomain: "pu-shin-news-blog-5996b.firebaseapp.com",
	databaseURL: "https://pu-shin-news-blog-5996b-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "pu-shin-news-blog-5996b",
	storageBucket: "pu-shin-news-blog-5996b.appspot.com",
	messagingSenderId: "397782308566",
	appId: "1:397782308566:web:ce11487ac64c776dde1b77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app)