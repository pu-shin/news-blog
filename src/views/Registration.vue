<template>
  <section class="registration">
    <div class="registration__container">
      <h1 class="registration__title title">Create an Account</h1>
      <div class="registration__body" @keyup.enter="registration">
        <input
          class="registration__item item"
          type="text"
          placeholder="Email"
          v-model="email"
        />
        <input
          class="registration__item item"
          type="password"
          placeholder="Password"
          v-model="password"
        />
        <p class="registration__message message" v-if="errMsg">{{ errMsg }}</p>
        <button class="registration__button button" @click="registration">
          Submit
        </button>
        <button class="sign-in__button button" @click="signInWithGoogle">
          Continue with google
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      errMsg: "",
    };
  },
  methods: {
    ...mapMutations(["changePopupProperty", "setUid"]),
    registration() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((data) => {
          console.log("Successfully registered!");
          sendEmailVerification(auth.currentUser).then(() => {
            console.log("Email verification sent!");
          });
          signOut(auth);
          this.changePopupProperty();
          this.$router.push("/sign-in");
        })
        .catch((error) => {
          console.log(error.message);
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
          localStorage.setItem("uid", result.user.uid);
          this.setUid(result.user.uid);
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


