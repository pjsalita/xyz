<template>
  <ValidationObserver ref="observer" v-slot="{ passes }">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">Register</div>

            <div class="card-body">

              <form @submit.prevent="passes(submit)">
                <ValidationProvider tag="div" class="form-group row" rules="required|email" v-slot="{ errors, valid }">
                  <label for="email" class="col-md-4 col-form-label text-md-right">Email Address</label>

                  <div class="col-md-6">
                    <input :class="{ 'is-invalid': errors[0], 'is-valid': valid }" v-model="email" id="email" type="email" class="form-control" required autocomplete="email" autofocus>

                      <span class="invalid-feedback" v-if="errors">
                        <strong>{{ errors[0] }}</strong>
                      </span>
                  </div>
                </ValidationProvider>

                <ValidationProvider tag="div" class="form-group row" rules="required" v-slot="{ errors, valid }">
                  <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                  <div class="col-md-6">
                    <input v-model="name" :class="{ 'is-invalid': errors[0], 'is-valid': valid }" id="name" type="name" class="form-control" required autocomplete="name">

                    <span class="invalid-feedback" v-if="errors">
                      <strong>{{ errors[0] }}</strong>
                    </span>
                  </div>
                </ValidationProvider>

                <ValidationProvider tag="div" class="form-group row" rules="required|min:8" vid="password" v-slot="{ errors, valid }">
                  <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                  <div class="col-md-6">
                    <input v-model="password" :class="{ 'is-invalid': errors[0], 'is-valid': valid }" id="password" type="password" class="form-control" required>

                    <span class="invalid-feedback" v-if="errors">
                      <strong>{{ errors[0] }}</strong>
                    </span>
                  </div>
                </ValidationProvider>

                <ValidationProvider tag="div" class="form-group row" rules="required|confirmed:password" v-slot="{ errors, valid }">
                  <label for="password_confirmation" class="col-md-4 col-form-label text-md-right">Confirm Password</label>

                  <div class="col-md-6">
                    <input v-model="password_confirmation" :class="{ 'is-invalid': errors[0], 'is-valid': valid }" id="password_confirmation" type="password" class="form-control" required>

                    <span class="invalid-feedback" v-if="errors">
                      <strong>{{ errors[0] }}</strong>
                    </span>
                  </div>
                </ValidationProvider>

                <div class="form-group row mb-0">
                  <div class="col-md-8 offset-md-4">
                    <button type="submit" class="btn btn-primary" :disabled="requesting">
                      Register
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
    name: null,
    password: null,
    password_confirmation: null
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
        name: this.name,
        password: this.password,
        password_confirmation: this.password_confirmation,
      }

      this.$store.dispatch('authentication/register', data)
        .then(response => this.$router.push('/'))
    }
  }
}
</script>
