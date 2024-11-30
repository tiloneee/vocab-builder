<template>
  <div id="app">
    <!-- Navbar for logged-in users -->
    <div v-if="isLoggedIn" class="bg-gray-900 text-white py-4">
      <div class="container mx-auto flex items-center">
        <!-- Left: Logo -->
        <router-link to="/" class="flex items-center text-gray-200 hover:text-white space-x-2 flex-none">
          <span class="text-xl font-bold">Vocab Builder</span>
        </router-link>

        <!-- Center: Navigation Links -->
        <div class="flex-grow flex justify-center space-x-10 font-medium">
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
        </div>

        <!-- Right: Avatar Dropdown -->
        <div class="relative flex-none">
          <button @click="toggleDropdown" class="w-10 h-10 rounded-full overflow-hidden border-1 border-gray-300 focus:outline-blue-500 focus:outline-2 focus:ring-2 focus:ring-blue-500"">
            <img :src="userAvatar" class="w-full h-full object-cover"  alt="User Avatar" />
          </button>

          <!-- Dropdown Menu -->
          <div v-if="isDropdownOpen" @click="toggleDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <ul class="py-1 text-gray-700">
              <li>
                <router-link 
                  :to="{ name: 'profile', params: { userId: userId } }" 
                  class="block px-4 py-2 hover:bg-gray-100" 
                  >
                  Profile
                </router-link>
              </li>
              <li>
                <button 
                  @click="handleLogout" 
                  class="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Navbar for non-logged-in users -->
    <div v-else class="bg-gray-800 text-white py-4">
      <div class="container mx-auto flex items-center">
        <!-- Left: Logo -->
        <router-link to="/" class="flex items-center text-gray-200 hover:text-white space-x-2 flex-none">
          <span class="text-xl font-bold">Vocab Builder</span>
        </router-link>

        <!-- Center: Navigation Links -->
        <div class="flex-grow flex justify-center space-x-6">
          <router-link to="/words" exact class="flex items-center space-x-2 text-gray-200 hover:text-white">
            <i class="comment-outline-icon"></i>
            <span>Words</span>
          </router-link>
        </div>

        <!-- Right: Login -->
        <div class="flex-none">
          <router-link to="/login" class="flex items-center space-x-2 text-gray-200 hover:text-white">
            <i class="sign-in-icon"></i>
            <span>Login</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="container mx-auto mt-8">
      <div class="grid grid-cols-1">
        <div>
          <router-view @login-success="handleLoginSuccess"  @avatar-updated="getUpdatedAvatar" />
        </div>
      </div>
    </div>
  </div>
</template>






<script>
import { userAPI, authAPI } from './helpers/helpers';
export default {
  name: "App",
  data() {
    return {
      isLoggedIn: false,
      isDropdownOpen: false,
      userId: null,
      user: {},
      backendUrl: "http://localhost:3000",
      userAvatar: "",
    };
  },
  methods: {
    handleLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.isLoggedIn = false;
      this.$toast.success("You are logged out", "success"); 
      this.$router.push("/login");

    },
    getUpdatedAvatar() {
      this.handleLoginSuccess();
    },  
    async handleLoginSuccess() {
    this.isLoggedIn = true;
    console.log("handleLoginSuccess");
    this.userId = localStorage.getItem("userId");
    const userId = this.userId;
    const user = await userAPI.getUser(userId);
    this.user = user;
    this.userAvatar = `${this.backendUrl}${this.user.avatar}`;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    },
    handleOutsideClick(event) {
      const dropdown = this.$el.querySelector(".relative");
      if (dropdown && !dropdown.contains(event.target)) {
        this.closeDropdown();
      }
    },
  },
  created() {
    this.isLoggedIn = !!localStorage.getItem("token");
    if (this.isLoggedIn) {
      this.userId = localStorage.getItem("userId");
      this.handleLoginSuccess();
    }
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
  async mounted() {
    const res = await authAPI.checkToken();
    console.log(res);
      if (res.status === 403) {
        this.isLoggedIn = false;
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        this.$router.push("/login");
      }
  }
};
</script>





<style>
img {
  border-radius: 50%;
}

button {
  @apply mt-4 block;
}
</style>
