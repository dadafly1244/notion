import {defineStore} from 'pinia'

export const useWorkspaceStore = defineStore('workspace',{
  state() {
    return {
      // workspace: null, 
      workspace: {}, 
      workspaces: []
    }
  },
  getters: {

  },
  actions: {
    //CRUD
     async createWorkspace() {
      const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202204',
          'username': 'KDT2_YangDayoung'
        },
        body: JSON.stringify({
          // parentId: '',
          title: '처음만드는 워크스페이이스',
          content:'내용.....',
          // poster: ''
        })
      })
      const workspace = await res.json()
      console.log(workspace)
      this.readWorkspaces()
    },
    async readWorkspaces() {
      const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202204',
          'username': 'KDT2_YangDayoung'
        }
      })
      const workspaces = await  res.json()
      console.log(workspaces)

      this.workspaces = workspaces
    },
    async readWorkspace(id) {
      const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`,{
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202204',
          'username': 'KDT2_YangDayoung'
        }
      })
      const workspace = await res.json()
      console.log(workspace)
      this.workspace = workspace
    },

    async updateWorkspace(payload) {
      const {id, title, content} = payload
      await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`,{
        method: 'PUT',
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202204',
          'username': 'KDT2_YangDayoung'
        }, 
        body: JSON.stringify({
          //title: title
          title, 
          content
        })
      })
      this.readWorkspaces()
    },
    async deleteWorkspace(id) {
      await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`,{
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202204',
          'username': 'KDT2_YangDayoung'
        }
      })
      // const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`)
      // await res.json()//삭제되면true

      // 1 - id를 바탕으로 workspaces목록에서 개만 지우기!(로컬에서!)//최적화!
      // 2 - 목록을 서버에서 다시 가져오기! // 최적화는 아니지만 편함!
      this.readWorkspaces()
    }
    
  }

})
