<template>
  <Search />
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Search from '../components/Search/Search'

export default {
  name: 'Home',
  components: {
    Search
  }
}
</script>
