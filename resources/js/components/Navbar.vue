<template>
  <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
    <div class="container">
        <router-link class="navbar-brand" :to="{ name: 'home' }">
          XYZ
        </router-link>
        <button class="navbar-toggler" type="button" @click.prevent="menuCollapse = !menuCollapse">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" :class="{ show: menuCollapse }" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown" :class="{show: dropdown}" v-if="user">
              <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" @click.prevent="dropdown = !dropdown">
                {{ user.name }} <span class="caret"></span>
              </a>
              <div class="dropdown-menu dropdown-menu-right" :class="{show: dropdown}">
                <a class="dropdown-item" href="#" @click.prevent="logout" :class="{ disabled: requesting }">Logout</a>
              </div>
            </li>

            <li class="nav-item" v-if="!user">
              <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
            </li>
            <li class="nav-item" v-if="!user">
              <router-link class="nav-link" :to="{ name: 'register' }">Register</router-link>
            </li>
          </ul>
        </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    dropdown: false,
    menuCollapse: false
  }),
  computed: {
    user: function() {
      return this.$store.getters['authentication/user']
    },
    requesting: function() {
      return this.$store.getters['authentication/requesting']
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch('authentication/logout')
        .then(response => this.$router.push('/login'))
    }
  }
}
</script>
