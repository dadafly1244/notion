import {defineStore} from 'pinia'

export const useWorkspaceStore = defineStore('workspace',{
  state() {
    return {
      // workspace: null, 
      workspace: {}, 
      workspaces: [],
      workspacesLoaded: false,
      currentWorkspacePath: []
    }
  },
  getters: {

  },
  actions: { 
    //CRUD
     async createWorkspace(payload = {}) { //기본값으로 빈 객체
      const { parentId } = payload
      const workspace = await request({
        method: 'POST',
        body: {
          parentId,
          title: ''
        }
      })
      console.log(workspace)
      this.readWorkspaces()
      // this.$router.push('./login')랑 router랑 같음
      // router.push(`/workspaces/${workspace.id}`) //에러가 나서 그냥 밑코드로 바꿔!!ㄴ
      window.location.href=`/workspaces/${workspace.id}`
    },
    async readWorkspaces() {
      const workspaces = await request({
        method: 'GET'
      })
      // console.log(workspaces)
      this.workspaces = workspaces
      this.workspacesLoaded = true

      if(!this.workspaces.length){ //아무것도 안들어있으면!
        this.createWorkspace()
      }
    },
    async readWorkspace(id) {
      const workspace = await request({
        id, 
        method: 'GET'
      })
      // console.log(workspace)
      this.workspace = workspace
    },

    async updateWorkspace(payload) {
      const {id, title, content, poster} = payload //poster에 들어오는 것이 없으면 undefined
      const updatedWorkspace = await request({//수정된결과를 받음
        id,
        method: 'PUT',
        body:{
          //title: title
          title, 
          content,
          poster
        }
      }) 
      this.workspace = updatedWorkspace //현제워크스페이스 업데이트

      this.readWorkspaces()
    },
    async deleteWorkspace(id) {
      await request({
        id,
        method: 'DELETE'
      })
    
      // const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`)
      // await res.json()//삭제되면true

      // 1 - id를 바탕으로 workspaces목록에서 개만 지우기!(로컬에서!)//최적화!
      // 2 - 목록을 서버에서 다시 가져오기! // 최적화는 아니지만 편함!
      this.readWorkspaces()
    },
    findWorkspacePath(currentWorkspaceId) { //재귀를 써서 아래에서 위로 부모를 찾아낼것임!
      const find = (workspace, parents) => {
        if(currentWorkspaceId === workspace.id) { //현제워크스페이스 아이디와 워크스페이스 아이디가 같으면
          this.currentWorkspacePath = [...parents, workspace] //전역 상태 부분에 배열을 추가
        }
        if (workspace.children) { //만약 객체에 자식요소가 있다면 
          workspace.children.forEach(ws => {
            find(ws, [...parents, workspace]) //...parents얕은 복사 
          })
        }
      }
      this.workspaces.forEach(workspace => {
        find(workspace, [])//최상위만 돌리기 때문에 부모가 없어서 빈배열!
      }) 
    }
  }
})


async function request(options) {
  const { id = '', method, body } = options
  const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`,{
    method,
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202204',
      'username': 'KDT2_YangDayoung'
    },
    body: JSON.stringify(body)
  })
  //await res.json() -> 123
  //res.json() -> promise 인스턴스
  return res.json()
  //나중에 호출할때 await 붙이면됨!
}
