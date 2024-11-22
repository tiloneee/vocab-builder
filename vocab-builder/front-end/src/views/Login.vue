<template>
  <div class="ui segment">
    <h2 class="ui header">Login</h2>
    <form class="ui form" @submit.prevent="handleLogin">
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
      
      <div class="ui two buttons centered-button-group">
        <button class="ui button primary" type="submit">Login</button>
        <div class="or"></div>
        <router-link to="/register" class="ui positive button">Create New Account</router-link>
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


    const { accessToken, name, email } = response;
      
    localStorage.setItem('token', accessToken);
    this.$emit('login-success');
    this.$router.push({ path: '/words' });
    this.flash(`${name}, you are logged in!`, 'success');
    console.log('Access Token:', localStorage.getItem('token'));
    } catch (error) {
    console.error('Login error:', error);
    this.flash('Login failed. Please try again.', 'error');
  }
}
,
  },
};
</script>

<style scoped>
.ui.segment {
  max-width: 400px;
  margin: 2em auto;
}

</style>