<template>
  <section class="registration">
    <div class="registration__container">
      <h1 class="registration__title title">Create an Account</h1>
      <div class="registration__body">
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
        <button
          class="registration__button button"
          type="submit"
          @click="registration"
        >
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
          console.log(error.code);
          console.log(error.message);
        });
    },
  },
};
</script>


<style scoped>
</style>