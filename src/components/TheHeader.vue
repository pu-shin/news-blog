<template>
  <header class="header" :class="{ 'menu-open': openMenu }">
    <div class="header__container">
      <div class="header__logo">
        <img src="../assets/logo/reineke.png" alt="logo" />
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
      <button
        type="button"
        class="icon-menu"
        @click="initMenu"
        v-click-outside="removeMenu"
      >
        <span></span>
      </button>
    </div>
  </header>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { mapState, mapMutations } from "vuex";

export default {
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          localStorage.setItem("auth", "true");
          this.setEmailVerified(JSON.parse(localStorage.getItem("auth")));
        }
      } else {
        localStorage.setItem("auth", "false");
        this.setEmailVerified(JSON.parse(localStorage.getItem("auth")));
      }
    });
  },
  data() {
    return {
      openMenu: false,
    };
  },
  methods: {
    ...mapMutations(["setEmailVerified", "setUid"]),
    handleSignOut() {
      const auth = getAuth();
      signOut(auth).then(() => {
        localStorage.setItem("uid", "");
        this.setUid("");
        this.$router.push("/");
      });
    },
    initMenu() {
      this.openMenu = !this.openMenu;
    },
    removeMenu() {
      this.openMenu = false;
    },
  },
  computed: {
    ...mapState(["isLoggedIn"]),
  },
};
</script>

<style scoped>
</style>
