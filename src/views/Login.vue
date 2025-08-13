<template>
  <div>
    <div class="w-full h-screen flex flex-col items-center justify-center bg-gray-300">
      <div class="w-full md:w-1/3 h-full md:h-fit p-12 bg-white rounded-lg flex flex-col items-center">
        <div class="w-1/2 md:w-1/3 my-4">
          <img src="../assets/estlogo.png" alt="EST Logo" class="w-full h-auto">
        </div>
        <div class="w-full mt-2 p-2">
          <input class="w-full p-2 border-b-2 border-b-gray-300 outline-0 bg-white" type="text" v-model="username"
            placeholder="Username" name="cln_sound_ung" autocomplete="off" autocorrect="off" spellcheck="false">
        </div>
        <div class="w-full my-1 p-2">
          <input class="w-full p-2 border-b-2 border-b-gray-300 outline-0 bg-white" type="password" v-model="password"
            placeholder="Password" name="cln_sound_pwg" autocomplete="off" autocorrect="off" spellcheck="false">
        </div>
        <div class="w-full my-4 p-2">
          <button class="py-2 hover:cursor-pointer hover:bg-[#4d3539] text-white rounded-lg bg-[#6d1b23] w-full"
            @click="login">Login</button>
        </div>
      </div>
    </div>
    <footer class="text-center py-3 bg-[#6d1b23] text-white w-full bottom-0 z-10">
      © All Rights Reserved.
    </footer>
  </div>
</template>

<script>
import axios from 'axios';
import Toastify from 'toastify-js'
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    generateCode() {
      return Math.random().toString(36).substring(2, 15);
    },
    login() {
      if (this.username === '' || this.password === '') {
        Toastify({
          text: "Username and Password cannot be empty",
          duration: 3000,
          backgroundColor: "#ff0000",
          className: "info",
        }).showToast();
        return;
      }

      axios.get('http://localhost:3000/user', {
        params: {
          name: this.username
        }
      })
        .then(response => {
          if (response.data) {
            const user = response.data
            if (user.password !== this.password) {
              Toastify({
                text: "Invalid Username or Password",
                duration: 3000,
                backgroundColor: "#ff0000",
                className: "info",
              }).showToast();
              return;
            }
            const token = this.generateCode();
            localStorage.setItem('token', token);
            localStorage.setItem('role', user.role);
            this.$router.push('/');
          } else {
            Toastify({
              text: "Invalid Username or Password",
              duration: 3000,
              backgroundColor: "#ff0000",
              className: "info",
            }).showToast();
          }
        })

      this.$router.push('/');
    }
  }
};
</script>

<style scoped></style>
