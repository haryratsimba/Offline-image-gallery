<template>
  <nav
    class="light-blue lighten-1"
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
            to="/gallery/category-1"
          >
            Catégorie 1
          </router-link>
        </li><li>
          <router-link
            to="/gallery/category-2"
          >
            Catégorie 2
          </router-link>
        </li>
        <li>
          <router-link
            to="/gallery/category-3"
          >
            Catégorie 3
          </router-link>
        </li>
        </li>
      </ul>
    </div>
  </nav>
  </header>
</template>

<style>
  .navbar {
    padding: 20px 80px;
    box-shadow: 0 4px 2px -2px lightgray;
  }
</style>
