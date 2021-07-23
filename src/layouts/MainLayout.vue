<template lang="html">
  <div>
    <Loader v-if="loader" />
    <div class="app-main-layout" v-else>
      <navbar @click="isOpen = !isOpen" />

      <sidebar v-model="isOpen" :key="locale"/>

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn" >
        <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Добавить запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
      </div>
    </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
import messages from '../utils/messages'

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true,
    loader: true
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
      this.loader = false
    }
  },
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    locale() {
      console.log(this.$store.getters)
      return this.$store.getters.info.locale
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || "Что-то пошло не так")
    }
  }
}
</script>

<style lang="css" scoped>
</style>
