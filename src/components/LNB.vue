<template>
  <nav>
    <div class="header">
      Dayoung's notion
    </div>
    <ul class="workspaces">
      <WorkspaceItem
        v-for="workspace in workspaceStore.workspaces"
        :key="workspace.id" 
        :workspace="workspace" />
    </ul>
    <div class="actions">
    </div>
  </nav>
</template>

<script>
  import { mapStores } from 'pinia'
  import { useWorkspaceStore } from '~/store/workspace'
  import WorkspaceItem from '~/components/WorkspaceItem.vue'

export default {
  components: {
    WorkspaceItem //재귀사용을 위해서 컴포넌트로 만들었음!
  },
  computed: {
    ...mapStores(useWorkspaceStore)
  },
  created() {
    this.workspaceStore.readWorkspaces()
  }
}
</script>


<style scoped lang="scss">
@import "~/scss/variables"; //scss에서 scss파일을 import해올때는 확장자명을 생략가능!!

nav{
  flex-shrink: 0;
  min-width: 160px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  background-color: $color-background;
  .header{
    flex-shrink: 0;
    height: 48px;
    padding: 14px;
  }
  ul.workspaces{
    flex-grow: 1;
    overflow: auto;
  }
  .actions{
    flex-shrink: 0;
    height: 48px;
    padding: 14px;
    border-top: 1px solid red;
  }
}
</style>
