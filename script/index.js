  const body =document.querySelector("body")
  
  const main = document.querySelector("main")

  const ulCard = document.querySelector(".main-cards ul")

  const ulCart = document.querySelector(".cart-list")

    let quantity = 0
    let totalValue = 0

function creatCardproduct(data){
  
  let cardproduct= document.createElement("li")
  cardproduct.className= "product-card"
  cardproduct.id = `p_${data.id}`

  let productImage = document.createElement("img")
  productImage.src= data.img
  productImage.className = "image-product"
  productImage.alt= "imagem roupa"
  cardproduct.appendChild(productImage)

  let produtcTag = document.createElement("p")
  produtcTag.className = "tag-product"
  produtcTag.innerText = data.tag
  cardproduct.appendChild(produtcTag)

  let productName =document.createElement("p")
  productName.className = "name-product"
  productName.innerText = data.nameItem
  cardproduct.appendChild(productName)

  let descriptionProduct = document.createElement("p")
  descriptionProduct.className = "description-product"
  descriptionProduct.innerText= data.description
  cardproduct.appendChild(descriptionProduct)

  let productPrice = document.createElement("p")
  productPrice.className ="price-product"
productPrice.innerText = `R$${data.value},00`
  cardproduct.appendChild(productPrice)

  let aditionProduct = document.createElement("span")
  aditionProduct.className = "adition-product"
  aditionProduct.id = `pro_${data.id}`
  aditionProduct.innerText = data.addCart 

  aditionProduct.addEventListener("click",function(e){
    let idElement = e.target.id 
    let id =parseInt(idElement.substring(4))
   
      let product = findProductId(id)

      quantity++
      document.querySelector(".quantity").innerHTML = `${quantity}`

      totalValue += data.value
      document.querySelector(".total").innerHTML= `R$ ${totalValue},00`

      let element = creatCartList(product)
      ulCart.appendChild(element)
      
      document.getElementById("idcart-empty").style.display = 
      "none"   
      document.getElementById("idcart-products").style.display="inline-flex"

  })
  cardproduct.appendChild(aditionProduct)
  
  return cardproduct
}

function creatProductList(list){
  ulCard.innerHTML =""
  document.getElementById("idcart-products").style.display="none"

  if(!list.length){
    for(let i =0; i<data.length; i++){
      let liProduct = data[i]
     let card = creatCardproduct(liProduct)
     ulCard.appendChild(card)
   } 
  }
  for(let i =0; i<list.length; i++){
     let liProduct = list[i]
    let card = creatCardproduct(liProduct)
    ulCard.appendChild(card)
  } 
}
creatProductList(data)

function findProductId(id){
  for( let i = 0; i<data.length; i++){
    if(data[i].id == id){
      return data[i]
    }
  }
}

function creatCartList(product){
  let cardproduct= document.createElement("li")
  cardproduct.className= "product-cart"
  cardproduct.id = `l_${product.id}`

  let divImage= document.createElement("div")
  divImage.className = "div-image"
  cardproduct.appendChild(divImage)

  let productImage = document.createElement("img")
  productImage.src= product.img
  productImage.className = "image-product -cart" 
  divImage.appendChild(productImage)

  let divCartDetails = document.createElement("div")
  divCartDetails.className = "div-cart-details"
  cardproduct.appendChild(divCartDetails)


  let productName =document.createElement("p")
  productName.className = "name-product"
  productName.innerText = product.nameItem
  divCartDetails.appendChild(productName)

  let productPrice = document.createElement("p")
  productPrice.className ="price-product"
productPrice.innerText = `R$${product.value},00`
  divCartDetails.appendChild(productPrice)

  let aditionProduct = document.createElement("span")
  aditionProduct.className = "adition-product"
  aditionProduct.id = `sel_${product.id}`
  aditionProduct.innerText = "Remover produto"

  aditionProduct.addEventListener("click",function(e){
    let idElement= e.target.id 
    let id = parseInt(idElement.substring(4)) 

    let productCart = findProductId(id)
    totalValue -=productCart.value
    document.querySelector(".total").innerHTML= `R$ ${totalValue},00`
    
    quantity--
    document.querySelector(".quantity").innerHTML = `${quantity}`
    
    if(quantity == 0){
      document.getElementById("idcart-empty").style.display= "inline-flex" 
      document.getElementById("idcart-products").style.display ="none"
      
    }
    
    let idCart = document.querySelector(`#l_${product.id}`)
    idCart.remove()
  })

  divCartDetails.appendChild(aditionProduct)
 
  return cardproduct
}

let listShirt =[]
let listAccessories = []
function separetList(data){
  for(let i = 0; i<data.length; i++){
    if(data[i].tag[0] == "Camisetas"){
      listShirt.push(data[i])
    }if(data[i].tag[0] == "Acessórios"){
      listAccessories.push(data[i])
    }
  }
}
separetList(data)

let containerMenu = document.getElementsByClassName("header-container")
let ulMenu = document.querySelector(".header-menu")

function capturElement(ulMenu){
  for(let i =0; i<ulMenu.children.length; i++){
    elementCapture = ulMenu.children[i]
    if(ulMenu.children[0].innerText== "Todos"){
      ulMenu.children[0].className = "todos"}
      if(ulMenu.children[1].innerText == "Acessórios"){
        ulMenu.children[1].className = "acessorios"}
        if(ulMenu.children[2].innerText == "Camisetas"){
          ulMenu.children[2].className = "camisetas"
         }
    }
}
capturElement(ulMenu)

let menuTodos = document.querySelector(".todos")
menuTodos.addEventListener("click",function(){
  menuTodos.classList.toggle(creatProductList(data))
})
  let menuAcessorios = document.querySelector(".acessorios")
menuAcessorios.addEventListener("click",function(){
  menuAcessorios.classList.toggle(creatProductList(listAcessorios))
})    

let menuCamisetas = document.querySelector(".camisetas")
menuCamisetas.addEventListener("click",function(){
  menuCamisetas.classList.toggle(creatProductList(listCamisetas))
})

const searchInput = document.querySelector(".search-input")

const searchButton = document.querySelector(".search-button")


 function searchProduct(list, input){
  const result = list.filter(function (data) {
    if (data.nameItem.toLowerCase().includes(input) || 
    data.description.toLowerCase().includes(input)){
      return true
    }
    return false
  })
  return result
  }
  


searchButton.addEventListener("click",function(e){
    let searchText =  searchInput.value.toLowerCase()
 let filterProduct = searchProduct(data, searchText)
creatProductList(filterProduct)
 
})











