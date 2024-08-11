<script setup>

</script>

<template>
  <nav class="m-2 navbar navbar-expand-lg navbar-dark navbar-blur">
    <div class="container">
      <a class="navbar-brand" href="/">Little Conqueror</a>
      <button class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNavbar"
              aria-controls="mainNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mainNavbar">
        <ul class="navbar-nav ms-auto nav-underline">
          <li class="nav-item">
            <a class="nav-link" href="/cities">
              <font-awesome-icon icon="city" size="lg" /> VOS VILLES
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/map">
              <font-awesome-icon icon="map-marked-alt" size="lg" /> MAP MONDE
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/actions">
              <font-awesome-icon icon="tasks" size="lg" /> ACTIONS EN COURS
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/user">
              <font-awesome-icon icon="user" size="lg" /> PROFILE
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>
