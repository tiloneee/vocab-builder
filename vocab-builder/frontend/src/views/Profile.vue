<template>
  <div class="container mx-auto p-6">
    <div class="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div class="p-6">
        <div class="flex items-center space-x-4 mb-6">
          <div class="relative">
            <img :src="`${backendUrl}${user.avatar}`" alt="Profile Picture"
              class="w-16 h-16 rounded-full object-cover border" />
            <input v-if="editing" type="file" @change="handleAvatarUpload" accept="image/*" class="hidden"
              ref="avatarInput" />
            <button v-if="editing" @click="$refs.avatarInput.click()"
              class="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              +
            </button>
          </div>
          <div>
            <h2 class="text-xl font-semibold">{{ this.user.name }}</h2>
            <p class="text-gray-600">{{ this.user.email }}</p>
          </div>
        </div>

        <form @submit.prevent="updateProfile" v-if="editing">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input v-model="form.name" type="text" class="w-full px-3 py-2 border rounded-lg" />
          </div>

          <div class="flex space-x-4">
            <button type="submit" class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
              Save Changes
            </button>
            <button v-if="editing" type="button" @click="cancelEditing"
              class="w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </form>

        <div v-if="!editing" class="grid grid-cols-2 gap-2">
          <button type="button" @click="startEditing"
            class="bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600">
            Edit Profile
          </button>
          <button type="button" @click="showPasswordChangeModal = true"
            class="bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-600">
            Change Password
          </button>
        </div>

        <!-- Password Change Modal (unchanged) -->
        <div v-if="showPasswordChangeModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div class="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 class="text-xl font-semibold mb-4">Change Password</h2>
            <form @submit.prevent="updatePassword">
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Current Password</label>
                <input v-model="passwordForm.currentPassword" type="password" class="w-full px-3 py-2 border rounded-lg"
                  required />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">New Password</label>
                <input v-model="passwordForm.newPassword" type="password" class="w-full px-3 py-2 border rounded-lg"
                  required />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Confirm New Password</label>
                <input v-model="passwordForm.confirmNewPassword" type="password"
                  class="w-full px-3 py-2 border rounded-lg" required />
              </div>
              <div class="flex space-x-4">
                <button type="submit" class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                  Change Password
                </button>
                <button type="button" @click="showPasswordChangeModal = false"
                  class="w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
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
      showPasswordChangeModal: false,
      form: {
        name: ''
      },
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      backendUrl: "http://localhost:3000"
    };
  },
  async created() {
    const userId = this.$route.params.userId;
    const user = await userAPI.getUser(userId);
    this.user = user;
    this.form.name = user.name;
  },
  methods: {
    async handleAvatarUpload(event) {
      const file = event.target.files[0];
      if (file) {
        try {
          const updatedUser = await userAPI.uploadAvatar(this.user._id, file);
          this.user.avatar = updatedUser.avatar;
          this.$emit('avatar-updated');
          this.$toast.success('Avatar updated successfully', 'success');
        } catch (error) {
          console.error("Error uploading avatar:", error);
          this.$toast.error('Failed to upload avatar', 'error');
        }
      }
    },
    startEditing() {
      this.editing = true;
    },
    cancelEditing() {
      this.editing = false;
      this.form.name = this.user.name;
    },
    async updateProfile() {
      try {
        const payload = {
          name: this.form.name,
          _id: this.user._id
        };

        const updatedUser = await userAPI.updateUser(payload);
        this.user = updatedUser;
        this.editing = false;
        this.$toast.success('Profile updated successfully', 'success');
      } catch (error) {
        this.$toast.error(error.response?.data?.message || 'Update failed', 'error');
      }
    },
    async updatePassword() {
      if (this.passwordForm.newPassword.length < 8) {
        this.$toast.error('Password must be at least 8 characters long', 'error');
        return;
      }
      if (this.passwordForm.newPassword !== this.passwordForm.confirmNewPassword) {
        this.$toast.error('New passwords do not match', 'error');
        return;
      }

      try {
        const payload = {
          _id: this.user._id,
          password: this.passwordForm.newPassword,
          currentPassword: this.passwordForm.currentPassword
        };

        await userAPI.updateUser(payload);
        this.showPasswordChangeModal = false;
        this.passwordForm.currentPassword = '';
        this.passwordForm.newPassword = '';
        this.passwordForm.confirmNewPassword = '';
        this.$toast.success('Password updated successfully', 'success');
      } catch (error) {
        this.$toast.error(error.response?.data?.message || 'Password update failed', 'error');
      }
    }
  }
};
</script>