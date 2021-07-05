// 滚动到底部
export const scrollToBottom = () => {
  const messageContainer = document.querySelector('.m-message') as HTMLElement
  messageContainer.scrollTop = messageContainer.scrollHeight
}

// 格式化时间
export const renderTime = (date: string) => {
  const dateee = new Date(date).toJSON();
  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}

/**
 * @description 获取当前时间
 * @param type string yyyy-MM-dd or yyyy-MM-dd HH:mm:ss
 * @returns string 当前时间
 */
export const getNowTime = (type: string) => {
  const now = new Date()
  const typeOption: any = {
    "M+": now.getMonth() + 1,
    "d+": now.getDate(),
    "H+": now.getHours(),
    "m+": now.getMinutes(),
    "s+": now.getSeconds(),
    "q+": Math.floor((now.getMonth() + 3) / 3),
    "S": now.getMilliseconds()
  };
  if (/(y+)/.test(type)) {
    type = type.replace(
      RegExp.$1,
      (now.getFullYear() + "").substr(4 - RegExp.$1.length)
    )
  }
  for (let k in typeOption) {
    if (new RegExp("(" + k + ")").test(type)) {
      type = type.replace(RegExp.$1, (RegExp.$1.length == 1)
        ? (typeOption[k])
        : (("00" + typeOption[k]).substr(("" + typeOption[k]).length)))
    }
  }

  return type;
}