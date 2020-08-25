<template>
  <div class="proposals">
    <div v-for="(chunk, index) in proposalChunks" :key="index" class="mb-2">
      <div
        v-for="(proposal, index) in chunk"
        :key="index"
        class="proposal mr-2 d-inline-block"
        :style="{ backgroundColor: proposal.thematicColor }">
        <a :href="proposal.link" target="_blank" :title="proposal.title">
          <font-awesome-icon :icon="retrieveIcon(proposal.color)" color="white"></font-awesome-icon>
        </a>
      </div>
    </div>
    <div>
      <div class="w-50 d-inline-block text-right pr-5">
        <div class="font-weight-bold">
          Status
        </div>
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
        <div>
          <font-awesome-icon icon="question"></font-awesome-icon> Manquante
        </div>
      </div>
      <div class="w-50 d-inline-block text-left pl-5">
        <div class="font-weight-bold">
          Thématique
        </div>
        <div v-for="thematic in thematics" :key="thematic.label">
          <font-awesome-icon icon="circle" :color="thematic.color"></font-awesome-icon>
          {{ thematic.label }}
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
import { chunk, find, get, indexOf, map, sortBy } from 'lodash'

import proposals from '../data/proposals.json'

export default {
  name: 'Proposals',
  data () {
    return {
      proposals,
      order: 'status',
      thematics : [{
        label: 'Propositions de révision de la Constitution',
        color: '#56ae6c'
      }, {
        label: 'Se loger',
        color: '#9750a1'
      }, {
        label: 'Se nourrir',
        color: '#ac9c3d'
      }, {
        label: 'Produire / Travailler',
        color: '#6778d0'
      }, {
        label: 'Se déplacer',
        color: '#ba543d'
      }, {
        label: 'Consommer',
        color: '#b94a73'
      }, {
        label: 'Inconnu',
        color: '#bbb'
      }]
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
      const thematic = find(this.thematics, { label: proposal.thematic })
      const color = get(thematic, 'color', null)
      return { thematicColor: color, ...proposal }
    })
  },
  methods: {
    retrieveIcon (color) {
      return {
        '#70cc3f': 'check',
        '#b7c145': 'check',
        '#ffd800': 'comment',
        '#e53434': 'exclamation',
        '#1e1e1e': 'times',
        '#f2992e': 'minus',
        '#eaeaea': 'question'
      }[color] || null
    }
  }
}
</script>

<style scoped>
.proposal {
  background-color: #bbb;
  border-radius: 2px;
  padding: 1px 0;
  width: 25px;
}
</style>
