<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email: this.email,
            password: this.password,
          }
        );
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");
        this.$router.push("/");
      } catch (error) {
        alert(error.response.data.message || "Error logging in.");
      }
    },
  },
};
</script>
