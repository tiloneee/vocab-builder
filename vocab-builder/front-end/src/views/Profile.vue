<template>
    <div class="container mx-auto p-6">
      <div class="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-6">
          <div class="flex items-center space-x-4 mb-6">
            <div class="relative">
              
            

            </div>
            <div>
              <h2 class="text-xl font-semibold">{{ this.user.name }}</h2>
              <p class="text-gray-600">{{ this.user.email }}</p>
            </div>
          </div>
  
          <form @submit.prevent="updateProfile">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input 
                v-model="form.name" 
                type="text" 
                class="w-full px-3 py-2 border rounded-lg"
                :disabled="!editing"
              />
            </div>
  
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input 
                v-model="form.email" 
                type="email" 
                class="w-full px-3 py-2 border rounded-lg"
                :disabled="!editing"
              />
            </div>
  
            <div v-if="editing" class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">Current Password</label>
              <input 
                v-model="form.currentPassword" 
                type="password" 
                class="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter current password to confirm changes"
              />
            </div>
  
            <div class="flex space-x-4">
              <button 
                v-if="!editing" 
                type="button" 
                @click="startEditing" 
                class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                Edit Profile
              </button>
              <button 
                v-if="editing" 
                type="submit" 
                class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
              >
                Save Changes
              </button>
              <button 
                v-if="editing" 
                type="button" 
                @click="cancelEditing" 
                class="w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { userAPI } from '../helpers/helpers.js';
  
  export default {
    name: 'profile',
    data() {
      return {
        user: {},
        editing: false,
        form: {
          name: '',
          email: '',
          currentPassword: ''
        }
      };
    },
    async created() {
      const userId = this.$route.params.userId;
      console.log("id: ",userId);
      this.fetchUser(userId);
    },
    methods: {
        async fetchUser(userId) {
            try{
                const user = await userAPI.getUser(userId);
                console.log("user: ",user); 
                this.user = user;
            } catch (error) {
                console.log("error: ",error);
            }
        },
      startEditing() {
        this.editing = true;
      },
      cancelEditing() {
        this.editing = false;
        this.form.name = this.user.name;
        this.form.email = this.user.email;
        this.form.currentPassword = '';
      },
      async handleAvatarUpload(event) {
        const file = event.target.files[0];
        if (file) {
          try {
            const formData = new FormData();
            formData.append('avatar', file);
            
            const updatedUser = await api.updateUserAvatar(formData);
            this.user.avatar = updatedUser.avatar;
            this.flash('Avatar updated successfully', 'success');
          } catch (error) {
            this.flash('Failed to upload avatar', 'error');
          }
        }
      },
      async updateProfile() {
        try {
          const payload = {
            name: this.form.name,
            email: this.form.email,
            currentPassword: this.form.currentPassword
          };
  
          const updatedUser = await api.updateUserProfile(payload);
          this.user = updatedUser;
          this.editing = false;
          this.flash('Profile updated successfully', 'success');
        } catch (error) {
          this.flash(error.response?.data?.message || 'Update failed', 'error');
        }
      }
    }
  };
  </script>