<template>
  <div>
    <h1>Voting Categories</h1>
    <ul>
      <li
        v-for="category in categories"
        :key="category.id"
        :category="categories"
      >
        <router-link
          :to="{ name: 'candidates', params: { id: category.id } }"
          >{{ category.name }}</router-link
        >
      </li>
    </ul>
    <button @click="logout">Logout</button>
    <p>{{ categories }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [], // Define your categories
    };
  },
  mounted() {
    fetch("http://localhost:3000/Categories")
      .then((response) => response.json())
      .then((data) => {
        this.categories = data;
      });
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      alert("Logged out successfully!");
    },
  },
};
</script>
<!-- <template>
  <div>
    <h1>Voting Categories</h1>
    <div v-if="isLoading">
      <p>Loading categories...</p>
    </div>
    <div v-else-if="!categories.length">
      <p>No categories available.</p>
    </div>
    <ul v-else>
      <li v-for="category in categories" :key="category.id">
        <button @click="selectCategory(category)">{{ category.name }}</button>
      </li>
    </ul>

    <div v-if="selectedCategory">
      <h2>{{ selectedCategory.name }} Candidates</h2>
      <form @submit.prevent="vote">
        <div v-for="candidate in selectedCategory.candidates" :key="candidate">
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
        <button type="submit" :disabled="!selectedCandidate">
          Submit Vote
        </button>
      </form>
      <button @click="deselectCategory">Back to Categories</button>
    </div>

    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: [], // Stores all categories
      selectedCategory: null, // Currently selected category
      selectedCandidate: null, // Selected candidate for voting
      isLoading: true, // Loading state for data fetching
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    // Fetch categories from the API
    fetchCategories() {
      fetch("http://localhost:3000/Categories")
        .then((response) => response.json())
        .then((data) => {
          this.categories = data;
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
          alert("Failed to fetch categories.");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    // Select a category to view its candidates
    selectCategory(category) {
      this.selectedCategory = category;
      this.selectedCandidate = null; // Reset the selected candidate
    },
    // Deselect the category and go back to categories list
    deselectCategory() {
      this.selectedCategory = null;
    },
    // Logout functionality
    logout() {
      localStorage.removeItem("token");
      alert("Logged out successfully!");
    },
    // Handle voting for a candidate
    async vote() {
      if (!this.selectedCandidate) {
        alert("Please select a candidate before voting.");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You must be logged in to vote!");
          return;
        }

        await axios.post(
          "http://localhost:5000/api/votes/vote",
          {
            choice: this.selectedCandidate,
            category: this.selectedCategory.name,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        alert("Vote cast successfully!");
        this.selectedCandidate = null; // Reset the selection after voting
        this.deselectCategory(); // Go back to categories after voting
      } catch (error) {
        console.error("Error casting vote:", error);
        alert(error.response?.data?.message || "Error casting vote.");
      }
    },
  },
};
</script> -->
<!-- <template>
  <div>
    <h1>Voting Categories</h1>
    <div v-if="isLoading">
      <p>Loading categories...</p>
    </div>
    <div v-else-if="!categories.length">
      <p>No categories available.</p>
    </div>
    <ul v-else>
      <li v-for="category in categories" :key="category.id">
        <router-link :to="{ name: 'candidates', params: { id: category.id } }">
          {{ category.name }}
        </router-link>
      </li>
    </ul>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      isLoading: true,
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      fetch("http://localhost:3000/Categories")
        .then((response) => response.json())
        .then((data) => {
          this.categories = data;
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
          alert("Failed to fetch categories.");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    logout() {
      localStorage.removeItem("token");
      alert("Logged out successfully!");
    },
  },
};
</script> -->

