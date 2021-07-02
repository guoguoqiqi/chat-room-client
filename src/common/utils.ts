export const scrollToBottom = () => {
  const messageContainer = document.querySelector('.m-message') as HTMLElement

  console.log(messageContainer, 'messageContainer')
  console.log(messageContainer.scrollTop, 'messageContainer')
  console.log(messageContainer.scrollHeight, 'messageContainer')


  messageContainer.scrollTop = messageContainer.scrollHeight
}

export const renderTime = (date: string) => {
  const dateee = new Date(date).toJSON();
  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}