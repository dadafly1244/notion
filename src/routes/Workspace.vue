<template>
  <TheHeader />
  <h1>Workspace!</h1>
  <button @click="workspaceStore.createWorkspace">
    워크스페이스 생성
  </button>
  <!-- <button @click="workspaceStore.readWorkspaces">
    워크스페이스 조회
  </button> -->
  
  <section :key="$route.params.workspaceId">
    <div class="poster">
      <img
        v-if="workspaceStore.workspace.poster"
        :src="workspaceStore.workspace.poster"
        alt="Poster" />
      <input
        type="file" 
        @change="selectPoster" />
      <button
        @click="deletePoster">
        이미지 삭제!
      </button>
    </div>
    <h1
      ref="title"
      placeholder="제목 없음"
      contenteditable
      @keydown.prevent.enter="$refs.content.focus()"
      @blur="onInput">
      {{ workspaceStore.workspace.title }}
    </h1>
    <p
      ref="content"
      placeholder="내용을 입력하세요."
      contenteditable
      @blur="onInput"
      v-html="workspaceStore.workspace.content">
    </p>
  </section>
</template>

<script>
import { mapStores } from 'pinia'
import { useWorkspaceStore } from '~/store/workspace'
import TheHeader from '~/components/TheHeader.vue'

export default {
  components: {
    TheHeader
  },
  computed: {
    ...mapStores(useWorkspaceStore)
  },
  watch: {//반응형데이터 감시!
    $route(){ //페이지가 바뀔 때 마다 route(페이지정보)가 변경되었는지 감시해!!
      this.workspaceStore.readWorkspace(this.$route.params.workspaceId) 
    }
  },
  created() {
    this.workspaceStore.readWorkspace(this.$route.params.workspaceId) 
  },
  methods: {
    onInput() {
      const title = this.$refs.title.textContent
      const content = this.$refs.content.innerHTML
      if(!title.trim()) {
        this.$refs.title.innerHTML=''
      }
      if(!this.$refs.content.textContent.trim()) {
        this.$refs.content.innerHTML=''
      }

      this.workspaceStore.updateWorkspace({
        id: this.$route.params.workspaceId,
        title,
        content
      })
    },
    selectPoster(event) {
      const { files } = event.target
      for (const file of files) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', e => { //reader가 파일을 다 읽으면
          this.workspaceStore.updateWorkspace({
            id: this.$route.params.workspaceId,
            poster: e.target.result//base64코드가 들어있음
          })
        })
      }
    },
    deletePoster() {
      this.workspaceStore.updateWorkspace({
        id: this.$route.params.workspaceId,
        poster: '-1'
      })
    }
  }
}
// route: 페이지정보
// router: 
</script>

<style scoped lang="scss">
[contenteditable] {
  &:empty::before {//요소의 내용이 비워져 있을때
    content: attr(placeholder);
    color: lightgray;
  }
}
</style>
