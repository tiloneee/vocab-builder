<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold text-center mb-6">Register</h2>
    <form @submit.prevent="handleRegister" class="space-y-4">
      <!-- Name -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          v-model="name"
          id="name"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
          required
        />
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          v-model="email"
          id="email"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          required
        />
      </div>

      <!-- Password -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          v-model="password"
          id="password"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
          required
        />
      </div>

      <!-- Confirm Password -->
      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          v-model="confirmPassword"
          id="confirmPassword"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Confirm your password"
          required
        />
      </div>

      <!-- Submit Button -->
      <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        Register
      </button>
    </form>
  </div>
</template>


<script>
import { authAPI } from '@/helpers/helpers';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    isPasswordValid(password) {
      if (password.length < 8) {
        return false;
      };
      return true;
    },  
    async handleRegister() {
      try {
        if (this.password !== this.confirmPassword) {
          this.$toast.error('Passwords do not match. Please try again.', 'error');
          return;
        }
        if (!this.isPasswordValid(this.password)) {
          this.$toast.error('Password must be at least 8 characters long.', 'error');
          return;
        }
        const registerRequest = {
          name: this.name,
          email: this.email,
          password: this.password,
        };
        await authAPI.register(registerRequest);
        this.$router.push({ path: '/login' });
        this.$toast.success('Registration successful! Please login.', 'success');
      } catch (error) {
        this.$toast.error('Registration failed. Please try again.', 'error');
      }
    },
  },
};
</script>