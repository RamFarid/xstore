import { products } from '../../data/products.js'

// Init Database
;(() => {
  try {
    const productsAsString = localStorage.getItem('products')
    const productsParsed = JSON.parse(productsAsString)

    if (productsParsed.length <= 0)
      localStorage.setItem('products', JSON.stringify(products))
  } catch (error) {
    console.log(error)
    localStorage.setItem('products', JSON.stringify(products))
  }

  try {
    const usersString = localStorage.getItem('users')
    const usersParsed = JSON.parse(usersString)

    if (usersParsed.length <= 0)
      localStorage.setItem('users', JSON.stringify([]))
  } catch (error) {
    console.log(error)
    localStorage.setItem('users', JSON.stringify([]))
  }
})()

// Init Header & Footer and Append Scripts
;(async function () {
  await loadComponent('header', '../header.html')
  await loadComponent('footer', '../footer.html')

  loadScript('./static/js/header.js', true)
})()

async function loadComponent(id, file) {
  try {
    const res = await fetch(file)
    const html = await res.text()
    const element = document.getElementById(id)
    element.innerHTML = html
  } catch (error) {
    console.error(`Error while getting Component of ${id} in path "${file}"`)
  }
}

function loadScript(src, module = false) {
  const script = document.createElement('script')
  script.defer = true
  if (module) script.type = 'module'
  script.src = src
  document.head.appendChild(script)
}
