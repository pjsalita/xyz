import { required, email, confirmed, min, max, regex, min_value, max_value } from 'vee-validate/dist/rules'
import { extend } from 'vee-validate'

extend('required', {
  ...required,
  message: 'This field is required'
})

extend('email', {
  ...email,
  message: 'Please enter a valid email'
})

extend('confirmed', {
  ...confirmed,
  message: 'Password confirmation did not match'
})

extend('min', {
  ...min,
  message: 'Password must have at least {length} characters'
})

extend('odd', value => {
  return value % 2 !== 0 || 'This field must be an odd number'
})

extend('regex', {
  ...regex,
  message: 'Valid characters: X, Y, Z'
})

extend('min_value', {
  ...min_value,
  message: 'Minimum size is {min}'
})

extend('max_value', {
  ...max_value,
  message: 'Maximum size is {max}'
})
