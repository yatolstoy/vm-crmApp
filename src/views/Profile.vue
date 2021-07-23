<template lang="html">
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="description">Имя</label>
        <span
              class="helper-text invalid"
              v-if="$v.name.$dirty && !$v.name.required">Имя не может быть пустым</span>
      </div>

      <!-- Switch -->
      <div class="switch">
        <label>
          Eng
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Рус
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import M from 'materialize-css/dist/js/materialize.min'
import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  required
} from 'vuelidate/lib/validators'

export default {
  metaInfo() {
    return {
      title: this.$title('ProfileTitle')
    }
  },
  data: () => ({
    name: "",
    isRuLocale: true
  }),
  validations: {
    name: {
      required
    }
  },
  mounted() {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === "ru-RU"
    setTimeout(() => {
      M.updateTextFields()
    })
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
      } catch (e) {
        console.log(e)
        throw e
      }
    }
  }
}
</script>

<style lang="css" scoped>
.switch {
  margin-bottom: 2rem
}
</style>
