<template>
  <header>
  </header>
</template>

<script>
import { mapStores } from 'pinia'
import { useWorkspaceStore } from '~/store/workspace' 
export default{
  computed: {
    ...mapStores(useWorkspaceStore)
  },
  mounted() {
    this.useWorkspaceStore.findWorkspacePath()
    console.log(this.useWorkspaceStore.currentWorkspacePath)
  }

}
</script>
