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
      </div>
    </div>
  </section>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      errMsg: "",
    };
  },
  methods: {
    registration() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((data) => {
          console.log("Successfully registered!");
          this.$router.push("/");
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
  },
};
</script>


<style scoped>
</style>