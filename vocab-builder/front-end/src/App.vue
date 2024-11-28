<template>
  <div id="app">
    <!-- Navbar for logged-in users -->
    <div v-if="isLoggedIn" class="bg-gray-800 text-white py-4">
      <div class="container mx-auto flex justify-center">
        <div class="flex space-x-6">
          <router-link to="/words" exact class="flex items-center space-x-2 text-gray-200 hover:text-white">
            <i class="comment-outline-icon"></i>
            <span>Words</span>
          </router-link>
          <router-link to="/words/new" class="flex items-center space-x-2 text-gray-200 hover:text-white">
            <i class="plus-circle-icon"></i>
            <span>New</span>
          </router-link>
          <router-link to="/test" class="flex items-center space-x-2 text-gray-200 hover:text-white">
            <i class="graduation-cap-icon"></i>
            <span>Test</span>
          </router-link>
          <router-link to="/translate" class="flex items-center space-x-2 text-gray-200 hover:text-white">
            <i class="language-icon"></i>
            <span>Translate</span>
          </router-link>
          <router-link :to="{ name: 'profile', params: { userId: this.userId } }"
            class="flex items-center space-x-2 text-gray-200 hover:text-white">
            <i class="user-icon"></i>
            <span>Profile</span>
          </router-link>
          <a @click="handleLogout" class="flex items-center space-x-2 text-gray-200 hover:text-white cursor-pointer">
            <i class="sign-out-icon"></i>
            <span>Sign Out</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Navbar for non-logged-in users -->
    <div v-else class="bg-gray-800 text-white py-4">
      <div class="container mx-auto flex justify-center">
        <div class="flex space-x-6">
          <router-link to="/words" exact class="flex items-center space-x-2 text-gray-200 hover:text-white">
            <i class="comment-outline-icon"></i>
            <span>Words</span>
          </router-link>
          <router-link to="/login" class="flex items-center space-x-2 text-gray-200 hover:text-white">
            <i class="sign-in-icon"></i>
            <span>Login</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="container mx-auto mt-8">
      <flash-message class="fixed top-12 right-0 w-64 z-50"></flash-message>
      <div class="grid grid-cols-1">
        <div>
          <router-view @login-success="handleLoginSuccess" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from './router';
import { userAPI } from './helpers/helpers';

export default {
  name: "app",
  data() {
    return {
      isLoggedIn: false,
      userId: null,
    };
  },
  async created() {
    this.isLoggedIn = !!localStorage.getItem("token");
    if (this.isLoggedIn) {
        this.userId = localStorage.getItem("userId");
    }
    
  },
  methods: {
    handleLogout() {
      // Remove token from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      // Update the login state
      this.isLoggedIn = false;
      // Redirect to login page
      this.$router.push("/login");
      // Optional: Show a logout message
      if (this.$refs.flashMessage) {
        this.$refs.flashMessage.flash("You have been logged out successfully", "success");
      }
    },
    handleLoginSuccess() {
      this.isLoggedIn = true;
    }, 
    
  },
};
</script>

<style>
.myFlash {
  width: 250px;
  margin: 10px;
  position: absolute;
  top: 12px;
  right: 0;
}

input {
  @apply w-72;
}

div.label {
  @apply w-32;
}

div.input {
  @apply mb-2.5;
}

button {
  @apply mt-4 block;
}
</style>
