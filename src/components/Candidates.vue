<template>
  <div>
    <h1>{{ category }} Candidates</h1>
    <form @submit.prevent="vote">
      <div v-for="candidate in candidates" :key="candidate">
        <label>
          <input
            type="radio"
            name="candidate"
            :value="candidate"
            v-model="selectedCandidate"
          />
          {{ candidate }}
        </label>
      </div>
      <button type="submit" :disabled="!selectedCandidate">Submit Vote</button>
    </form>
    <router-link to="/">Back to Categories</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["category"],
  data() {
    return {
      candidates: ["Candidate A", "Candidate B", "Candidate C"], // Replace with dynamic data if necessary
      selectedCandidate: null, // Holds the selected candidate
    };
  },
  methods: {
    async vote() {
      if (!this.selectedCandidate) {
        alert("Please select a candidate before voting.");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You must be logged in to vote!");
          this.$router.push("/login");
          return;
        }

        await axios.post(
          "http://localhost:5000/api/votes/vote",
          { choice: this.selectedCandidate, category: this.category },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Vote cast successfully!");
        this.selectedCandidate = null; // Reset selection after voting
      } catch (error) {
        alert(error.response.data.message || "Error casting vote.");
      }
    },
  },
};
</script>
