window.onpopstate = event => console.log(document.location)

window.location.hash = 'party'
window.parent.party()
