<template>
<div class="col s12 m6">
  <div>
    <div class="page-subtitle">
      <h4>Редактировать</h4>
    </div>

    <form @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="current">
          <option v-for="c of categories" :key="c.key" :value="c.id">{{c.title}}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <div class="input-field">
        <input id="name" type="text" v-model="title" :class="{invalid: $v.title.$dirty && !$v.title.required}">
        <label for="name">Название</label>
        <span class="helper-text" v-if="$v.title.$dirty && !$v.title.required">Введите название категории</span>
      </div>

      <div class="input-field">
        <input id="limit" type="number" v-model.number="limit" :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}">
        <label for="limit">Лимит</label>
        <span class="helper-text" v-if="$v.limit.$dirty && !$v.limit.minValue">Минимальное значение {{$v.limit.$params.minValue.min}} </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</div>
</template>

<script>
import {
  required,
  minValue
} from 'vuelidate/lib/validators'
import M from 'materialize-css/dist/js/materialize.min'
export default {
  data: () => ({
    select: null,
    title: '',
    limit: 1,
    current: null
  }),
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  validations: {
    title: {
      required
    },
    limit: {
      minValue: minValue(1)
    }
  },
  watch: {
    current(catId) {
      const {
        title,
        limit
      } = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit
    }
  },
  created() {
    const {
      id,
      title,
      limit
    } = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$emit('updated', categoryData)
        this.$message('Категория успешно обновлена')
      } catch (e) {
        console.log(e)
        throw e
      }
    }
  },
  destroyed() {
    if (this.select && this.destroy) {
      this.select.destroy()
    }
  }
}
</script>
