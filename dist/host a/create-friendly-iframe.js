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
    var parser = new DOMParser()
    var doc = parser.parseFromString(html, "text/html")
    var newHtml = doc.querySelector('html')
    var oldHtml = iframeDocument.querySelector('html')
    
    iframe.contentDocument.replaceChild(newHtml, oldHtml)

    iframeDocument.querySelectorAll('script').forEach(function(script) {
      const newScript = iframeDocument.createElement('script')
      newScript.src = script.src
      iframeDocument.querySelector('head').appendChild(newScript)
    })
    container.setAttribute('status', '3')  
})

const html = iframeDocument.createElement('html')
iframeDocument.appendChild(html)
iframeDocument.close()


iframeDocument.invitePeopleForParty()
container.setAttribute('status', '2')  


