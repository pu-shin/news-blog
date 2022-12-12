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
      </div>
    </div>
  </section>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      errMsg: "",
    };
  },
  methods: {
    ...mapMutations(["setEmailVerified"]),
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((data) => {
          if (!auth.currentUser.emailVerified) signOut();
          localStorage.setItem("auth", "true");
          this.setEmailVerified(JSON.parse(localStorage.getItem("auth")));
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
              this.errMsg = "* Confirm email address";
              break;
          }
        });
    },
  },
};
</script>

<style scoped>
</style>