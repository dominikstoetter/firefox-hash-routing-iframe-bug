//this creates a friendly iframe

var container = document.querySelector('.friendly-iframe-container')
container.setAttribute('status', '1')

var iframe = window.document.createElement('iframe')
iframe.src = 'javascript:void(0)'
iframe.title = ''
iframe.role = 'presentation'

container.appendChild(iframe)

var iframeDocument = iframe.contentWindow.document

iframeDocument.open()
iframeDocument.invitePeopleForParty = () => fetch('http://localhost:3001/index.html')
  .then(xhr => xhr.text())
  .then(html => {
    iframeDocument.open()
    iframeDocument.write(html)
    iframeDocument.location.hash = ''
    iframeDocument.close()
    container.setAttribute('status', '3')  
})

const body = iframeDocument.createElement('body')
body.addEventListener('invitePeopleForParty', iframeDocument.invitePeopleForParty, { once: true })
iframeDocument.appendChild(body)
iframeDocument.close()

setTimeout(() => {
  var event = iframeDocument.createEvent('Event')
  event.initEvent('invitePeopleForParty', false, false)
  body.dispatchEvent(event)
  container.setAttribute('status', '2')  
})

