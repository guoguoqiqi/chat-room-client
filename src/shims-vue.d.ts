declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'socket.io-client'
declare module 'emoji-mart-vue-fast/src'

type ioCb = (message: any) => void
type ioReturnObject = {
  on: (eventName: string, cb: ioCb) => void,
  emit: (eventName: string, message: any) => void,
}

declare function io(uri: string): ioReturnObject
