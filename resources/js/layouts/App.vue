<template>
  <div>
    <Navbar />
    <main class="py-4">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar
  },
  async created() {
    const getUser = await localStorage.getItem('api_token') && this.$store.dispatch('authentication/user')
  }
}
</script>
