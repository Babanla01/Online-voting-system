<template>
  <div>
    <h1>Voting Categories</h1>
    <ul>
      <li v-for="category in categories" :key="category">
        <router-link :to="'/category/' + category">{{ category }}</router-link>
      </li>
    </ul>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: ["President", "Vice President", "Secretary"], // Define your categories
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      alert("Logged out successfully!");
    },
  },
};
</script>
