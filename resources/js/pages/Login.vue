<template>
  <ValidationObserver ref="observer" v-slot="{ passes }">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">Login</div>

            <div class="card-body">

              <form @submit.prevent="passes(submit)">
                <ValidationProvider tag="div" class="form-group row" rules="required|email" v-slot="{ errors, valid }">
                  <label for="email" class="col-md-4 col-form-label text-md-right">Email Address</label>

                  <div class="col-md-6">
                    <input v-model="email" :class="{ 'is-invalid': errors[0], 'is-valid': valid }" id="email" type="email" class="form-control" required autocomplete="email" autofocus>

                    <span class="invalid-feedback" v-if="errors">
                      <strong>{{ errors[0] }}</strong>
                    </span>
                  </div>
                </ValidationProvider>

                <ValidationProvider tag="div" class="form-group row" rules="required" v-slot="{ errors, valid }">
                  <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                  <div class="col-md-6">
                    <input v-model="password" :class="{ 'is-invalid': errors[0], 'is-valid': valid }" id="password" type="password" class="form-control" required autocomplete="password">

                    <span class="invalid-feedback" v-if="errors">
                      <strong>{{ errors[0] }}</strong>
                    </span>
                  </div>
                </ValidationProvider>

                <div class="form-group row mb-0">
                  <div class="col-md-8 offset-md-4">
                    <button type="submit" class="btn btn-primary" :disabled="requesting">
                      Login
                    </button>
                  </div>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    email: null,
    password: null
  }),
  computed: {
    requesting: function() {
      return this.$store.getters['authentication/requesting']
    }
  },
  methods: {
    submit: function() {
      const data = {
        email: this.email,
        password: this.password,
      }

      this.$store.dispatch('authentication/login', data)
        .then(response => this.$router.push('/'))
    }
  }
}
</script>
