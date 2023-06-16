<script lang="ts">
  import "../app.css";
</script>

<main class="flex flex-col justify-center items-center">
  <slot />
</main>

<style>
  main {
    min-height: 100vh;
    min-width: 100vw;
  }
</style>
