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
            window.setTimeout(()=>{product.innerHTML = ''},4000)
            window.location.reload()
        })}
