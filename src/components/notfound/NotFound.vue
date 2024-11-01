<template>
  <div class="not-found">
    <img src="@/assets/404.jpg" alt="404 Not Found" />
    <h1>Oops! Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <router-link to="/">Go back to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f9f9f9; 
}

img {
  max-width: 80%;
  height: auto;
}

h1 {
  margin: 20px 0 10px;
  font-size: 2em;
}

p {
  margin: 10px 0 20px;
  color: #555;
}

.router-link {
  text-decoration: none; /* Remove underline from link */
  color: #007BFF; /* Bootstrap primary color */
}
</style>
