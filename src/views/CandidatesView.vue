<template>
  <div>
    <!-- <h1>Post: {{ categories }} candidates</h1> -->
    <p>{{ this.$route.params.id }}</p>
    <form @submit.prevent="vote">
      <div v-for="candidate in categories.candidates" :key="candidate">
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
    <p>Hello world</p>
    <!-- <p>{{ categories }}</p> -->
    <router-link to="/">Back to Categories</router-link>
    <!-- <p>{{ category }}</p> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  // props: ["category"],
  data() {
    return {
      categories: [],
      //   candidates: [], // Replace with dynamic data if necessary
      selectedCandidate: null, // Holds the selected candidate
    };
  },
  mounted() {
    fetch(`http://localhost:3000/Categories/${this.$route.params.id}`)
      .then((response) => response.json())
      .then((data) => {
        this.categories = data;
        console.log(data);
      });
    // this.fetchCategory();
    console.log(this.category);
  },

  //   created() {
  //     // Find the post by ID
  //     const category = this.categories.find((p) => p.id === parseInt(this.id));
  //     if (category) {
  //       this.postName = category.name;
  //       this.candidates = category.contestants;
  //     }
  //   },
  computed: {
    // candidateId() {
    //   return parseInt(this.$route.params.id);
    // },
    // candidates() {
    //   return categories.candidates.find(
    //     (candidate) => candidate.id === this.candidateId
    //   );
    // },
  },
  methods: {
    async fetchCategory() {
      const categoryId = this.$route.params.id; // Get the category ID from the route
      fetch("http://localhost:3000/Categories")
        .then((response) => response.json())
        .then((data) => {
          this.categories = data;
        });
    },

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
<!-- 
<template>
  <div>
    <div v-if="category">
      <h1>Post: {{ category.name }} candidates</h1>
      <form @submit.prevent="vote">
        <div v-for="candidate in category.candidates" :key="candidate">
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
    </div>
    <div v-else>
      <p>Loading category details...</p>
    </div>
    <router-link to="/">Back to Categories</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      categories: [],
      selectedCandidate: null,
    };
  },
  mounted() {
    fetch("http://localhost:3000/Categories")
      .then((response) => response.json())
      .then((data) => {
        this.categories = data;
        this.category = this.categories.find(
          (cat) => cat.id === parseInt(this.$route.params.id)
        );
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  },
  computed: {
    candidateId() {
      return parseInt(this.$route.params.id);
    },
    courses() {
      if (!this.category || !this.category.candidates) return null;
      return this.category.candidates.find(
        (candidate) => candidate.id === this.candidateId
      );
    },
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
          { choice: this.selectedCandidate, category: this.category.name },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Vote cast successfully!");
        this.selectedCandidate = null;
      } catch (error) {
        alert(error.response?.data?.message || "Error casting vote.");
      }
    },
  },
};
</script> -->

<!-- <template>
  <div>
    <div v-if="category">
      <h1>Post: {{ category.name }} candidates</h1>
      <form @submit.prevent="vote">
        <div v-for="candidate in category.candidates" :key="candidate">
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
    </div>
    <div v-else-if="isLoading">
      <p>Loading category details...</p>
    </div>
    <div v-else>
      <p>Category not found or data unavailable.</p>
    </div>
    <router-link to="/">Back to Categories</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  // props: {
  //   category: {
  //     type: Object,
  //     default: null,
  //   },
  // },
  data() {
    return {
      categories: [],
      category: null,
      selectedCandidate: null,
      isLoading: true, // Added loading state
    };
  },
  mounted() {
    fetch("http://localhost:3000/Categories")
      .then((response) => response.json())
      .then((data) => {
        this.categories = data;
        console.log("Categories fetched:", this.categories);
        const id = parseInt(this.$route.params.id);
        this.category = this.categories.find((cat) => cat.id === id) || null;
        console.log("Matched category:", this.category);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      })
      .finally(() => {
        this.isLoading = false; // Turn off loading state
      });
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
          { choice: this.selectedCandidate, category: this.category.name },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Vote cast successfully!");
        this.selectedCandidate = null;
      } catch (error) {
        alert(error.response?.data?.message || "Error casting vote.");
      }
    },
  },
};
</script>

 -->

 <!-- <template>
  <div>
    <h1>{{ category.name }} Candidates</h1>
    <form v-if="category" @submit.prevent="vote">
      <div v-for="candidate in category.candidates" :key="candidate">
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
    <div v-else>
      <p>Loading candidates...</p>
    </div>
    <router-link to="/home">Back to Categories</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      category: null, // Holds the selected category and its candidates
      selectedCandidate: null, // Tracks the selected candidate
    };
  },
  mounted() {
    this.fetchCategory();
  },
  methods: {
    fetchCategory() {
      const categoryId = this.$route.params.id; // Get the category ID from the route
      fetch(`http://localhost:3000/Categories/${categoryId}`)
        .then((response) => response.json())
        .then((data) => {
          this.category = data;
        })
        .catch((error) => {
          console.error("Error fetching category:", error);
          alert("Failed to fetch category.");
        });
    },
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
            category: this.category.name,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        alert("Vote cast successfully!");
        this.selectedCandidate = null; // Reset the selection after voting
        this.$router.push("/home"); // Navigate back to categories
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
    <div v-if="!category">
      <p>Loading candidates...</p>
    </div>

    <div v-else>
      <h1>{{ category.name }} Candidates</h1>
      <form @submit.prevent="vote">
        <div v-for="candidate in category.candidates" :key="candidate">
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
      <router-link to="/home">Back to Categories</router-link>
    </div>
  </div>
</template> -->

<!-- <script>
import axios from "axios";

export default {
  data() {
    return {
      category: null, // Holds the selected category and its candidates
      selectedCandidate: null, // Tracks the selected candidate
    };
  },
  mounted() {
    this.fetchCategory();
    fetch(`http://localhost:3000/Categories/${this.$route.params.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched category data:", data);
        this.category = data;
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
        alert("Failed to fetch category. Check console for details.");
      });
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
          return;
        }

        await axios.post(
          "http://localhost:5000/api/votes/vote",
          {
            choice: this.selectedCandidate,
            category: this.category.name,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        alert("Vote cast successfully!");
        this.selectedCandidate = null; // Reset the selection after voting
        this.$router.push("/home"); // Navigate back to categories
      } catch (error) {
        console.error("Error casting vote:", error);
        alert(error.response?.data?.message || "Error casting vote.");
      }
    },
  },
};
</script> -->

