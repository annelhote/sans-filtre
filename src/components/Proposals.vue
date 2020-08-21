<template>
  <div class="proposals">
    <div v-for="(chunk, index) in proposalChunks" :key="index" class="mb-2">
      <div
        v-for="(proposal, index) in chunk"
        :key="index"
        class="proposal mr-2 p-1 d-inline-block"
        :style="{ backgroundColor: proposal.thematicColor }">
        <a :href="proposal.link" target="_blank" :title="proposal.title">
          <font-awesome-icon :icon="retrieveIcon(proposal.color)" color="white"></font-awesome-icon>
        </a>
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
        <div>
          <font-awesome-icon icon="circle" color="#bbb"></font-awesome-icon> Inconnu
        </div>
      </div>
    </div>
    <div>
      <div>Trier par:</div>
      <div>
        <input type="radio" id="status" value="status" v-model="order">
        <label for="status" class="mr-2">
          Status
        </label>
        <input type="radio" id="thematic" value="thematic" v-model="order">
        <label for="thematic">
          Thématique
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { chunk, find, indexOf, map, sortBy } from 'lodash'

import proposals from '../data/proposals.json'
import thematics from '../data/thematics.json'

export default {
  name: 'Proposals',
  data () {
    return {
      proposals,
      order: 'status'
    }
  },
  computed: {
    proposalChunks () {
      return chunk(Object.values(this.orderedProposals), 30)
    },
    orderedProposals () {
      // Pas encore étudiée, rejetée, en danger, débattue, partiellemnt acceptée, appliquée intégralement
      const order = ['#f2992e', '#1e1e1e', '#e53434', '#ffd800', '#b7c145', '#70cc3f']
      if (this.order === 'status') {
        return sortBy(this.proposals, [o => -indexOf(order, o.color)])
      } else {
        return sortBy(this.proposals, ['thematic'])
      }
    }
  },
  mounted () {
    this.proposals = map(this.proposals, proposal => {
      const { color, thematic } = this.consolidateData(proposal)
      return { thematicColor: color, thematic, ...proposal }
    })
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
      }
      return icon
    },
    consolidateData (proposal) {
      let color = null
      let thematic = null
      const prop = find(thematics, { title: proposal.title })
      if (prop) thematic = prop.thematic
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
      return { color, thematic }
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
