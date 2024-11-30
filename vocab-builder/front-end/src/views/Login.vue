<template>
  <div class="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
    <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
    <form @submit.prevent="handleLogin">
      <!-- Email Field -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          v-model="email"
          placeholder="Enter your email"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Password Field -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          v-model="password"
          placeholder="Enter your password"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Buttons -->
      <div class="flex justify-between items-center">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
        <router-link
          to="/register"
          class="text-blue-500 hover:text-blue-600 font-medium"
        >
          Create New Account
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { authAPI } from '@/helpers/helpers';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const loginRequest = {
          email: this.email,
          password: this.password,
        };
        const response = await authAPI.login(loginRequest);
        const { accessToken, name, id } = response;
        localStorage.setItem('token', accessToken);
        localStorage.setItem('userId', id);
        this.$emit('login-success');
        this.$router.push({ path: '/words' });
        this.$toast.success(`${name}, you are logged in!`, 'success');
      } catch (error) {
        console.error('Login error:', error);
        this.$toast.error('Login failed. Please try again.', 'error');
      }
    },
  },
};
</script>

<style scoped>
/* Optional: Add margin to center the container */
</style>
