<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo">
        <img src="../assets/logo/logo-black.svg" alt="logo" />
      </div>
      <nav class="header__navigation">
        <router-link to="/" class="header__title">Home</router-link>
        <router-link to="/news-writing" class="header__title"
          >News Writing</router-link
        >
        <router-link to="/registration" class="header__title" v-if="!isLoggedIn"
          >Registration</router-link
        >
        <router-link to="/sign-in" class="header__title" v-if="!isLoggedIn"
          >Sign In</router-link
        >
        <button
          type="button"
          class="header__title sign-out"
          @click="handleSignOut"
          v-if="isLoggedIn"
        >
          Sign Out
        </button>
      </nav>
    </div>
  </header>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  mounted() {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        localStorage.setItem("auth", "true");
        this.isLoggedIn = JSON.parse(localStorage.getItem("auth"));
      } else {
        localStorage.setItem("auth", "false");
        this.isLoggedIn = JSON.parse(localStorage.getItem("auth"));
      }
    });
  },
  data() {
    return {
      isLoggedIn: JSON.parse(localStorage.getItem("auth")) || false,
    };
  },
  methods: {
    handleSignOut() {
      signOut(getAuth()).then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style scoped>
</style>
