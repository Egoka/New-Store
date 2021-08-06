function filter(event){
    let state = true
    window.setTimeout(()=>{
        if(state){
            document.querySelector(".messege").style.display = "flex"
            window.setTimeout(()=>{
                document.querySelector(".messege").style.transition='3s ease-out'
                document.querySelector(".messege").style.opacity = "1"},1)}
    },1000)
    fetch('/catalog/filters',{
        method: 'POST',
        body:JSON.stringify({
            id:event.target.dataset.id,
            prohibitedOption:Array.from(event.composedPath()[3].children)
                .map(option=>{
                    option = option.children[0].children[0]
                    if(option.attributes["disabled"]){
                        return {
                            id:option.dataset.id,
                            status:!event.target.attributes['checked']}
                    }else{return false}})
                .filter(option=>option!==false),
            option:event.composedPath()[5].children[0].innerText}),
        headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(callback =>{
            document.querySelector(".messege").style.transition='.5s ease-out'
            document.querySelector(".messege").style.opacity = ".1"
            window.setTimeout(()=>{
                state = false
                document.querySelector(".messege").style.display = "none"},300)
            document.querySelector('.filteredProduct').innerHTML =callback.products.length>0?
                callback.products.map(product=>
                    `<div class="device">
                        <div class="filterImage">
                            <img class="materialboxed" src="${product.photoURL}" alt="">
                        </div>
                    <div class="description">
                        <a href="/catalog/${product._id}" title="${product.nameProduct}">
                            <span class="">${product.nameProduct}</span>
                        </a>
                        <ul class="depiction">` +
                    product.depiction.map(index=>`<li>${index.items}</li>`).join("") +
                        `</ul>
                        <div class="purchase flexCenter">` +
                    (callback.isAuth?(
                            `<i class="material-icons"
                                onclick="userList(event,'${product._id}')"`+
                                (product.list?`style="color:var(--red-dark)"`:"") +
                            '>' +
                    (product.list?`playlist_add_check`:`playlist_add`) +
                            `</i>
                            <i class="material-icons"
                                onclick="userLike(event,'${product._id}')"` +
                    (product.like?`style="color:var(--red-dark)"`:"") +
                            '>' +
                    (product.like?'favorite':'favorite_border') +
                            `</i>`)
                    :'') +
                        `<div class="priceFilter">` +
                    (product.price?`<a href="/catalog/${product._id}" class="price">
                    ${new Intl.NumberFormat('ru-RU',{currency:'rub', style:'currency'}).format(product.price)}
                        </a>`:'') +
                            `</div>
                        </div>
                    </div>
                </div>`).join(""):
                `<div class="noDataBlock">
                    <div class="cartIsEmpty">Такого продукта не найдено</div>
                    <i class="material-icons cartIsEmpty" style="font-size: 3rem;text-align: center;">category</i>
                </div>`
            document.querySelector('.productGrid').innerHTML = callback.products.length>0?
                callback.products.map(product=>
                    `<a href="/catalog/${product._id}" class="productObject">
                        <div class="productGrid flexCenter">
                            <img src="${product.photoURL}" alt="">
                        </div>
                        <p class="price">${product.price}</p>
                        <p>${product.nameProduct}</p>
                    </a>`).join(""):
            `<div class="noDataBlock">
                    <div class="cartIsEmpty">Такого продукта не найдено</div>
                    <i class="material-icons cartIsEmpty" style="font-size: 3rem;text-align: center;">category</i>
                </div>`
            Array.from(document.querySelector(".filter").children[0].children).map((description, keyDes)=>
                description.children[0].innerText=== callback.filters[keyDes]._id?
                    Array.from(description.children[1].children[0].children).map((option,keyOpt)=> {
                        let optionOne = option.children[0].children[0]
                        let optionTwo = option.children[0].children[1]
                        if(optionTwo.innerText===callback.filters[keyDes].options[keyOpt].value){
                            if(callback.filters[keyDes].options[keyOpt].state===1){
                                optionOne.setAttribute('checked',"checked")
                                return 1}
                            if(callback.filters[keyDes].options[keyOpt].state===-1) {
                                optionOne.setAttribute('disabled', "disabled")
                                optionTwo.setAttribute('style', "text-decoration: line-through")
                                return -1}
                            if(callback.filters[keyDes].options[keyOpt].state===0) {
                                if(optionOne.attributes["checked"]){
                                    optionOne.removeAttribute('checked')}
                                if(optionOne.attributes["disabled"]){
                                    optionTwo.removeAttribute('style')
                                    optionOne.removeAttribute('disabled')}
                                optionOne.setAttribute('onclick',"filter(event)")
                                optionOne.setAttribute('data-id',
                                    `${callback.filters[keyDes].options[keyOpt]._id}`)
                            }
                        }else{return 0} })
                    :description)
        })
}