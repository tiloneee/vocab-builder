<template>
  <div class="ui segment">
    <h2 class="ui header">Login</h2>
    <form class="ui form" @submit.prevent="handleRegister">
      <div class="field">
        <label>Name</label>
        <input
          type="text"
          v-model="name"
          placeholder="Enter your name"
          required
        />
      </div>
      <div class="field">
        <label>Email</label>
        <input
          type="email"
          v-model="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div class="field">
        <label>Password</label>
        <input
          type="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <div class="field">
        <label>Confirm Password</label>
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm your password"
          required
        />
      </div>
      <button class="ui button primary" type="submit">Register</button>
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
    async handleRegister() {
      try {
        if (this.password !== this.confirmPassword) {
          this.flash('Passwords do not match. Please try again.', 'error');
          return;
        }
        const registerRequest = {
          name: this.name,
          email: this.email,
          password: this.password,
        };
        await authAPI.register(registerRequest);
        this.$router.push({ path: '/login' });
        this.flash('Registration successful! Please login.', 'success');
      } catch (error) {
        console.error('Registration error:', error);
        this.flash('Registration failed. Please try again.', 'error');
      }
    },
  },
};
</script>