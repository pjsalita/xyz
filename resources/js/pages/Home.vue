<template>
  <ValidationObserver ref="observer" v-slot="{ passes }">
    <div class="container">
      <div class="row justify-content-center mb-3">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">XYZ Figlet</div>

            <div class="card-body">
              <form @submit.prevent="passes(submit)">
                <ValidationProvider tag="div" class="form-group row" :rules="{ required:true, regex:/^[XYZ]*$/ }" v-slot="{ errors, valid }">
                  <label for="input" class="col-md-4 col-form-label text-md-right">Input</label>

                  <div class="col-md-6">
                    <input v-model="input" :class="{ 'is-invalid': errors[0], 'is-valid': valid }" id="input" type="text" class="form-control" required>

                    <span class="invalid-feedback" v-if="errors">
                      <strong>{{ errors[0] }}</strong>
                    </span>
                  </div>
                </ValidationProvider>

                <ValidationProvider tag="div" class="form-group row" rules="required" v-slot="{ errors, valid }">
                  <label for="direction" class="col-md-4 col-form-label text-md-right">Direction</label>

                  <div class="col-md-6">
                    <select v-model="direction" :class="{ 'is-invalid': errors[0], 'is-valid': valid }" id="direction" class="custom-select mr-sm-2">
                      <option disabled value="">Choose...</option>
                      <option value="horizontal">Horizontal</option>
                      <option value="vertical">Vertical</option>
                    </select>
                    <span class="invalid-feedback" v-if="errors">
                      <strong>{{ errors[0] }}</strong>
                    </span>
                  </div>
                </ValidationProvider>

                <ValidationProvider tag="div" class="form-group row" rules="required|min_value:3|max_value:99|odd" v-slot="{ errors, valid }">
                  <label for="size" class="col-md-4 col-form-label text-md-right">Size</label>

                  <div class="col-md-6">
                    <input v-model="size" :class="{ 'is-invalid': errors[0], 'is-valid': valid }" id="size" type="number" class="form-control" required>

                    <span class="invalid-feedback" v-if="errors">
                      <strong>{{ errors[0] }}</strong>
                    </span>
                  </div>
                </ValidationProvider>

                <div class="form-group row mb-0">
                  <div class="col-md-8 offset-md-4">
                    <button type="submit" class="btn btn-primary" :disabled="requesting">
                      Process
                    </button>
                    <a href="/logs/xyz.log" class="btn btn-primary" target="_blank">
                      View log file
                    </a>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">Output</div>
            <div class="card-body">
              <pre>{{ output }}</pre>
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
    input: null,
    direction: '',
    size: null,
    output: null
  }),
  computed: {
    requesting: function() {
      return this.$store.getters['figlet/requesting']
    }
  },
  watch: {
    input: function(newVal, oldVal) {
      this.input = newVal.toUpperCase()
    }
  },
  methods: {
    submit: function() {
      const data = {
        input: this.input,
        direction: this.direction,
        size: this.size
      }

      this.$store.dispatch('figlet/process', data)
        .then(response => this.output = response.data.output)
    }
  }
}
</script>
