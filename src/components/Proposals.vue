<template>
  <div class="proposals">
    <div v-for="(chunk, index) in proposalChunks" :key="index" class="mb-2">
      <div
        v-for="(proposal, index) in chunk"
        :key="index"
        :title="proposal.title"
        class="proposal mr-2 p-1 d-inline-block"
        :style="{ backgroundColor: retrieveColor(proposal) }">
        <font-awesome-icon :icon="retrieveIcon(proposal.color)" color="white"></font-awesome-icon>
      </div>
    </div>
    <div>
      <div>Légende :</div>
      <div class="w-50 d-inline-block text-right pr-5">
        <div>
          <font-awesome-icon icon="check"></font-awesome-icon> Appliquée intégralement
        </div>
        <div>
          <font-awesome-icon icon="check"></font-awesome-icon> Partiellement acceptée
        </div>
        <div>
          <font-awesome-icon icon="comment"></font-awesome-icon> Débattue
        </div>
        <div>
          <font-awesome-icon icon="exclamation"></font-awesome-icon> En danger
        </div>
        <div>
          <font-awesome-icon icon="times"></font-awesome-icon> Rejetée
        </div>
        <div>
          <font-awesome-icon icon="minus"></font-awesome-icon> Pas encore étudiée
        </div>
      </div>
      <div class="w-50 d-inline-block text-left pl-5">
        <div>
          <font-awesome-icon icon="circle" color="red"></font-awesome-icon> Se loger
        </div>
        <div>
          <font-awesome-icon icon="circle" color="green"></font-awesome-icon> Se nourrir
        </div>
        <div>
          <font-awesome-icon icon="circle" color="yellow"></font-awesome-icon> Produire et travailler
        </div>
        <div>
          <font-awesome-icon icon="circle" color="blue"></font-awesome-icon> Se déplacer
        </div>
        <div>
          <font-awesome-icon icon="circle" color="orange"></font-awesome-icon> Consommer
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

import proposals from '../data/proposals.json'
import thematics from '../data/thematics.json'

export default {
  name: 'HelloWorld',
  data () {
    return {
      proposals
    }
  },
  computed: {
    proposalChunks () {
      return _.chunk(Object.values(this.proposals), 30)
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
    },
    retrieveColor (proposal) {
      let color = null
      let thematic = null
      const plop = _.find(thematics, { title: proposal.title })
      if (plop) thematic = plop.thematic
      switch (thematic) {
        case 'Se loger':
          color = 'red'
          break
        case 'Se nourrir':
          color = 'green'
          break
        case 'Produire et travailler':
          color = 'yellow'
          break
        case 'Se déplacer':
          color = 'blue'
          break
        case 'Consommer':
          color = 'orange'
          break
      }
      return color
    }
  }
}
</script>

<style scoped>
.proposal {
  background-color: #bbb;
  width: 25px;
}
</style>
