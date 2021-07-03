import { message as AtdMessage } from 'ant-design-vue'
import { SendMessageBody } from './constant';

class WSocket {
  socket: any;

  constructor() { }

  // 连接服务
  connectWS() {
    try {
      this.socket = io('http://localhost:18303/chat');
      AtdMessage.success("连接服务器成功！")
    } catch (error) {
      console.log(error)
      AtdMessage.error("连接服务器失败！")
    }
  }

  // 接收消息
  onMessage(cb: (message: any) => void) {
    this.socket.on('sendMessage', (message: any) => {
      console.log(message)
      cb(message);
    });
  }

  // 监听进入房间
  onEnterRoom(cb: (message: any) => void) {
    this.socket.on('enteredRoom', (message: any) => {
      console.log(message)
      cb(message);
    });
  }

  // 监听离开房间
  onLeaveRoom(cb: (message: any) => void) {
    this.socket.on('leavedRoom', (message: any) => {
      console.log(message)
      cb(message);
    });
  }

  // 进入房间
  enterRoom(message: SendMessageBody) {
    console.log(message)
    this.socket.emit('enterRoom', message);
  }

  // 离开房间 
  leaveRoom(message: SendMessageBody) {
    console.log(message)
    this.socket.emit('leaveRoom', message);
  }

  // 发送信息
  sendMsg(message: SendMessageBody) {
    console.log(message)
    this.socket.emit('sendMessage', message)
  }
}

export const chatWebSocket = new WSocket()