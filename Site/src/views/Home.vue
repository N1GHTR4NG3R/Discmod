<template lang="pug">
  section {{ message }}
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        message: ''
      }
    },

    async mounted () {
      const { data } = await axios('/hello-world')
      this.message = data
    }
  }
</script>