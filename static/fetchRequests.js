function userLike(event, id) {
    fetch('/request/like/' + id,{method: 'get'})
        .then(res => res.json())
        .then(callback =>{
            if(callback){
                event.target.innerHTML = "favorite"
                event.target.style.color = "var(--red-dark)"
            }else{
                event.target.innerHTML = "favorite_border"
                event.target.style.color = "inherit"
            }
        })}
function userLikeDel(event, id) {
    fetch('/request/like/' + id,{method: 'get'})
        .then(res => res.json())
        .then(() =>{
            let product = event.target.parentElement.parentElement.parentElement
            product.style.transition='1s ease-out'
            product.style.maxHeight = '0'
            product.style.padding = '0'
            product.style.opacity = '0'
            window.setTimeout(()=>{
                product.innerHTML = ''
                window.location.reload()
            },1100)
        })}
function userList(event, id) {
    fetch('/request/list/' + id,{method: 'get'})
        .then(res => res.json())
        .then(callback =>{
            if(callback){
                event.target.innerHTML = "playlist_add_check"
                event.target.style.color = "var(--red-dark)"
            }else{
                event.target.innerHTML = "playlist_add"
                event.target.style.color = "inherit"
            }
        })}
function userListDel(event, id) {
    fetch('/request/list/' + id,{method: 'get'})
        .then(res => res.json())
        .then(() =>{
            let product = event.target.parentElement.parentElement.parentElement
            product.style.transition='All 1s linear'
            product.style.opacity = '0'
            product.style.width = '0'
            window.setTimeout(()=>{event.target.parentElement.children[0].remove()},100)
            window.setTimeout(()=>{
                product.remove()
                if(document.querySelectorAll('.model').length===0){
                    window.location.reload()}
                    },1000)
        })}
function userBasket(event, id) {
    const ids = event.target.parentElement.dataset.busketid
    fetch('/request/replenishBasket/' + id+'/'+ids,{method: 'get'})
        .then(res => res.json())
        .then(callback =>{
            if(callback){
                document.querySelectorAll(`.btnProduct[data-busketid='${ids}']`).forEach(button=>{
                    button.children[0].innerText = "shopping_cart"
                    button.children[1].innerText = "в корзине"})
            }else{
                document.querySelectorAll(`.btnProduct[data-busketid='${ids}']`).forEach(button=>{
                    button.children[0].innerText = "add_shopping_cart"
                    button.children[1].innerText = "в корзину"})
            }
        })}
function userEditCountProduct(event, id, mode) {
    fetch('/request/basket/' + id+'/'+mode,{method: 'get'})
        .then(res => res.json())
        .then(callback =>{
            const basketPrice = document.querySelector('.basketPrice')
            basketPrice.children[0].children[0].innerHTML=Number(basketPrice.children[0].children[0].innerHTML)+callback.direction
            let sum=+document.querySelector('#sum').innerHTML
                .split(',')[0].split("&nbsp;").join('')
            let price = +event.target.parentElement.parentElement.parentElement.children[0].children[0].innerHTML
                .split(',')[0].split("&nbsp;").join('')
            document.querySelector('#sum').innerHTML = new Intl.NumberFormat('ru-RU',{
                currency:'rub', style:'currency'
            }).format(sum+price*callback.direction)
            if(callback.count===0){
                if(event.target.parentElement.parentElement.parentElement.parentElement.children.length==1){
                    event.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
                }else{event.target.parentElement.parentElement.parentElement.remove()}}
            if(callback.count>0){
                event.target.parentElement.children[1].innerHTML=callback.count}
            if(document.querySelector('.bodyBusket').children.length==0){
                window.location.reload()}
        })}
function addInListReviews(event,idReviews, mode) {
    fetch('/request/reviews/',{
        method: 'POST',
        body:JSON.stringify({idReviews, mode}),
        headers: {'Content-Type': 'application/json'} })
        .then(res => res.json())
        .then(callback =>{
            let e = event.target
            let rating = e.parentElement.parentElement
            rating.style.transition = 'opacity .1s linear'
            rating.style.opacity='0'
            window.setTimeout(()=>{
                switch (e.innerHTML) {
                    case 'thumb_up':e.innerHTML = 'thumb_up_off_alt';break;
                    case 'thumb_up_off_alt':e.innerHTML = 'thumb_up';break;
                    case 'thumb_down':e.innerHTML = 'thumb_down_off_alt';break;
                    case 'thumb_down_off_alt':e.innerHTML = 'thumb_down';break;}
                rating.style.transition = 'opacity .5s linear'
                rating.style.opacity='1'
                let oppositeRating = rating.children[0**mode]
                let oppositeElement = oppositeRating.children[0]
                if(oppositeElement.innerHTML==='thumb_up'){
                    oppositeRating.children[1].innerHTML =
                        +oppositeRating.children[1].innerHTML-1
                    oppositeElement.innerHTML = 'thumb_up_off_alt'}
                else if(oppositeElement.innerHTML==='thumb_down'){
                    oppositeRating.children[1].innerHTML =
                        +oppositeRating.children[1].innerHTML-1
                    oppositeElement.innerHTML = 'thumb_down_off_alt'}
                e.parentElement.children[1].innerHTML =
                    +e.parentElement.children[1].innerHTML+(callback?1:-1)
            },300)
        })}
