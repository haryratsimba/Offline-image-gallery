<template>
  <nav
    class="blue-grey darken-4"
    role="navigation"
  >
    <div class="nav-wrapper container">
      <a
        id="logo-container"
        href="#"
        class="brand-logo"
      >
        Gallery
      </a>
      <ul class="right hide-on-med-and-down">
        <li>
          <router-link
            to="/gallery/travel"
          >
            Travel
          </router-link>
        </li><li>
          <router-link
            to="/gallery/nature"
          >
            Nature
          </router-link>
        </li>
        <li>
          <router-link
            to="/gallery/architecture"
          >
            Architecture
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style>
  .navbar {
    padding: 20px 80px;
    box-shadow: 0 4px 2px -2px lightgray;
  }
</style>
