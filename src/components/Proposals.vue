<template>
  <div class="hello">
    <div v-for="(chunk, index) in proposalChunks" :key="index" class="mb-2">
      <div v-for="(proposal, index) in chunk" :key="index" :title="proposal.title" class="proposal mr-2 p-1 d-inline-block">
        <font-awesome-icon :icon="retrieveIcon(proposal.color)" color="white" />
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

import proposals from '../data/proposals.json';

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
