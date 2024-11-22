<template>
  <div id="app">
    <div class="ui inverted segment navbar" v-if="isLoggedIn">
      <div class="ui center aligned container">
        <div class="ui large secondary inverted pointing menu compact">
          <router-link to="/words" exact class="item">
            <i class="comment outline icon"></i> Words
          </router-link>
          <router-link to="/words/new" class="item">
            <i class="plus circle icon"></i> New
          </router-link>
          <router-link to="/test" class="item">
            <i class="graduation cap icon"></i> Test
          </router-link>
          <a @click="handleLogout" class="item">
            <i class="sign-out icon"></i> Sign Out
          </a>
        </div>
      </div>
    </div>

    <!-- Other UI parts that should be shown when the user is not logged in -->
    <div class="ui inverted segment navbar" v-else>
      <div class="ui center aligned container">
        <div class="ui large secondary inverted pointing menu compact">
          <router-link to="/words" exact class="item">
            <i class="comment outline icon"></i> Words
          </router-link>
          <router-link to="/login" class="item">
            <i class="sign in icon"></i> Login
          </router-link>
        </div>
      </div>
    </div>


    <div class="ui text container">
      <flash-message class="myFlash"></flash-message>
      <div class="ui one column grid">
        <div class="column">
          <router-view @login-success="handleLoginSuccess"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      isLoggedIn: false
    }},
    created() {
      this.isLoggedIn = !!localStorage.getItem('token')
    },
   methods: {
    handleLogout() {
  // Remove token from localStorage
  localStorage.removeItem('token')
  // Update the login state
  this.isLoggedIn = false
  // Redirect to login page
  this.$router.push('/login')
  // Optional: Show a logout message
  if (this.$refs.flashMessage) {
    this.$refs.flashMessage.flash('You have been logged out successfully', 'success')
  }
}, handleLoginSuccess() {
      this.isLoggedIn = true;
    
    }
  }


};
</script>

<style>
#app>div.navbar {
  margin-bottom: 1.5em;
}

.myFlash {
  width: 250px;
  margin: 10px;
  position: absolute;
  top: 50;
  right: 0;
}

input {
  width: 300px;
}

div.label {
  width: 120px;
}

div.input {
  margin-bottom: 10px;
}

button.ui.button {
  margin-top: 15px;
  display: block;
}
</style>