<template>
  <header class="navbar">
    <section class="navbar-section">
      <h1 class="navbar-brand mr-2">
        Gallery
      </h1>
      <router-link
        to="/gallery/category-1"
        class="btn btn-link"
      >
        Catégorie 1
      </router-link>
      <router-link
        to="/gallery/category-2"
        class="btn btn-link"
      >
        Catégorie 2
      </router-link>
      <router-link
        to="/gallery/category-3"
        class="btn btn-link"
      >
        Catégorie 3
      </router-link>
    </section>
    <section class="navbar-section">
      <div class="input-group input-inline">
        <span class="label label-rounded label-error py-2">
          You are offline <i class="icon icon-stop" />
        </span>
      </div>
    </section>
  </header>
</template>
