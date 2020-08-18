<template>
  <div class="hello">
    <div v-for="(chunk, index) in measureChunks" :key="index" class="mb-2">
      <div v-for="(measure, index) in chunk" :key="index" :title="measure.title" class="measure mr-2 p-1 d-inline-block">
        <font-awesome-icon :icon="retrieveIcon(measure.color)" color="white" />
      </div>
    </div>
    <div>
      <div>Légende :</div>
      <div>
        <font-awesome-icon icon="check" /> Appliquée intégralement
      </div>
      <div>
        <font-awesome-icon icon="check" /> Partiellement acceptée
      </div>
      <div>
        <font-awesome-icon icon="comment" /> Débattue
      </div>
      <div>
        <font-awesome-icon icon="exclamation" /> En danger
      </div>
      <div>
        <font-awesome-icon icon="times" /> Rejetée
      </div>
      <div>
        <font-awesome-icon icon="minus" /> Pas encore étudiée
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

import measures from '../data/measures.json';

export default {
  name: 'HelloWorld',
  data () {
    return {
      measures
    }
  },
  computed: {
    measureChunks () {
      return _.chunk(Object.values(this.measures), 30)
    }
  },
  methods: {
    retrieveIcon (color) {
      let icon = null
      switch (color) {
        case '#70cc3f':
          icon = 'check'
          break
        case '#b7c145':
          icon = 'check'
          break
        case '#ffd800':
          icon = 'comment'
          break
        case '#e53434':
          icon = 'exclamation'
          break
        case '#1e1e1e':
          icon = 'times'
          break
        case '#f2992e':
          icon = 'minus'
          break
        default:
          icon = 'check'
      }
      return icon
    }
  }
}
</script>

<style scoped>
.measure {
  background-color: #bbb;
  width: 25px;
}
</style>
