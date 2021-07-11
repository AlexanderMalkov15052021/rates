window.addEventListener('load', async () => {
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.register('js/sw.js')
      console.log('Service worker register success')
    } catch (e) {
      console.log('Service worker register fail')
    }
  }
})
