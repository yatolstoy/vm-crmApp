<template>
<div class="col s12 m6 l8">
  <div class="card orange darken-4 bill-card">
    <div class="card-content white-text">
      <div class="card-header">
        <span class="card-title">Курс валют</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Валюта</th>
            <th>Курс</th>
            <th>Дата</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="cur in rates" :key="cur.id">
            <td>{{cur.name}}</td>
            <td>{{(cur.curs).toFixed(2)}}</td>
            <td>{{cur.date | date("date")}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['rates'],
  data: () => ({

  })
}
</script>
