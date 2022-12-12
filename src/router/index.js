import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomeView from '../views/HomeView.vue'
import FormView from '../views/FormView.vue'
import SignIn from '../views/SignIn.vue'
import Registration from '../views/Registration.vue'


const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: HomeView,
		},
		{
			path: '/news-writing',
			name: 'Form',
			component: FormView,
			meta: {
				requiresAuth: true,
			}
		},
		{
			path: '/registration',
			name: 'registration',
			component: Registration
		},
		{
			path: '/sign-in',
			name: 'SignIn',
			component: SignIn
		},
	],
})

function getCurrentUser() {
	return new Promise((resolve, reject) => {
		const removeListener = onAuthStateChanged(
			getAuth(),
			(user) => {
				removeListener();
				if (!user)
					resolve(user)
				else {
					resolve(user.emailVerified)
				}
			},
			reject
		)

	})
}

router.beforeEach(async (to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (await getCurrentUser()) {
			next();
		} else {
			next("/registration");
		}
	} else {
		next();
	}
});

export default router