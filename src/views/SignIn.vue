<template>
  <section class="sign-in">
    <div class="sign-in__container">
      <h1 class="sign-in__title title">Sign in to an Account</h1>
      <div class="sign-in__body" @keyup.enter="login">
        <input
          class="sign-in__item item"
          type="text"
          placeholder="Email"
          v-model="email"
        />
        <input
          class="sign-in__item item"
          type="password"
          placeholder="Password"
          v-model="password"
        />
        <p class="sign-in__message message" v-if="errMsg">{{ errMsg }}</p>
        <button class="sign-in__button button" @click="login">Submit</button>
        <button class="sign-in__button button" @click="signInWithGoogle">
          Sign In With Google
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
      errMsg: "",
    };
  },
  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((data) => {
          console.log("Successfully signet in!");
          this.$router.push("/");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              this.errMsg = "* Invalid email";
              break;
            case "auth/user-not-found":
              this.errMsg = "* No account with that email was found";
              break;
            case "auth/wrong-password":
              this.errMsg = "* Incorrect password";
              break;
            default:
              this.errMsg = "* Email or password was incorrect";
              break;
          }
        });
    },
    signInWithGoogle() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log("Successfully signet in!");
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
</style>