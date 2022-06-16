<template>
  <header>
    Header!!
    <!-- ul태그가 출력이 안되여..ㅠㅠ -->
    <ul> 
      <li
        v-for="path in workspaceStore.currentWorkspacePath"
        :key="path.id">
        <RouterLink :to="`/workspaces/${path.id}`">
          {{ path.title || '제목없음' }}
        </RouterLink>
      </li>
    </ul>
    []
  </header>
</template>

<script>
import {mapStores} from 'pinia'
import { useWorkspaceStore } from '~/store/workspace'

export default {
  computed: {
    ...mapStores(useWorkspaceStore),
    workspacesLoaded() {
      return this.workspaceStore.workspacesLoaded
    }
  },
  watch: {
    workspacesLoaded(value){
      value && this.workspaceStore.findWorkspacePath(this.$route.params.workspaceId)
    },
    $route() {
      this.workspaceStore.findWorkspacePath(this.$route.params.workspaceId)
    }
  }
}
</script>



<!-- <script>
import { mapStores } from 'pinia'
import { useWorkspaceStore } from '~/store/workspace' 
export default{
  computed: {
    ...mapStores(useWorkspaceStore),
    workspacesLoaded() {
      return this.workspaceStore.workspacesLoaded
    }

  },
  watch: {
    workspacesLoaded(value) {  
      value && this.workspaceStore.findWorkspacePath(this.$route.params.id) //true && 함수
      // if (value) { //위에가 더 간단!!
      //       this.workspaceStore.findWorkspacePath(this.$route.params.id)
      // }
    },
    $route() {
      this.workspaceStore.findWorkspacePath(this.$route.params.id)
    }
  }
}
</script> -->
