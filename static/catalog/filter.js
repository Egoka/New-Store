function filter(event){
    let state = true
    window.setTimeout(()=>{
        if(state){
            document.querySelector(".messege").style.display = "flex"
            window.setTimeout(()=>{
                document.querySelector(".messege").style.transition='3s ease-out'
                document.querySelector(".messege").style.opacity = "1"},1)}
    },1000)
    let data
    if(event.target.classList[0]==='js-filter'){
        data = {
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
            option:event.composedPath()[5].children[0].innerText}}
    if(event.target.classList[0]==='typeSort'){
        data = {sort: event.target.dataset.sort}}
    const type = window.location.pathname.split('/')[3]
    fetch('/catalog/section/filters/'+type,{
        method: 'POST',
        body:JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(callback =>{
            let sort = '<div class="sortTytle flexCenter"><b>'
            switch (callback.sort) {
                case 'rating-1':sort+='Популярные';break
                case 'date-1':sort+='Новинки';break
                case 'price1':sort+='Сначала дешовые';break
                case 'price-1':sort+='Сначала дорогие';break}
            sort+='</b><i class="material-icons">arrow_drop_down</i></div><div class="sortBody">'
            if(callback.sort !='rating-1'){sort+='<div class="typeSort" data-sort="1" onclick="filter(event)">Популярные</div>'}
            if(callback.sort !='date-1'){sort+='<div class="typeSort" data-sort="2" onclick="filter(event)">Новинки</div>'}
            if(callback.sort !='price1'){sort+='<div class="typeSort" data-sort="3" onclick="filter(event)">Сначала дешовые</div>'}
            if(callback.sort !='price-1'){sort+='<div class="typeSort" data-sort="4" onclick="filter(event)">Сначала дорогие</div>'}
            sort+='</div>'
            document.querySelector(".sortList").innerHTML = sort
            document.querySelector(".messege").style.transition='.5s ease-out'
            document.querySelector(".messege").style.opacity = ".1"
            window.setTimeout(()=>{
                state = false
                document.querySelector(".messege").style.display = "none"},300)
            document.querySelector('.filteredProduct').innerHTML =callback.products.length>0?
                callback.products.map(product=>
                    '<div class="device">'+
                    (product.daysCount?'<div class="tagNEW">new</div>':'')+
                        `<div class="filterImage">
                            <img class="materialboxed" src="${product.photoURL}" alt="">
                        </div>
                        <div class="description">
                            <a href="/catalog/product/${product._id}" title="${product.nameProduct}" class="nameProduct>
                                <span class="">${product.nameProduct}</span>
                            </a>
                            <ul class="depiction">` +
                    product.depiction.map(index=>`<li>${index.items}</li>`).join("") +
                            `</ul>
                            <div class="starProduct">
                                <span class="material-icons" style="color: ${product.stars>0?'#e7ad00':'#bcbcbc'}">star</span>
                                <span class="material-icons" style="color: ${product.stars>1?'#e7ad00':'#bcbcbc'}">star</span>
                                <span class="material-icons" style="color: ${product.stars>2?'#e7ad00':'#bcbcbc'}">star</span>
                                <span class="material-icons" style="color: ${product.stars>3?'#e7ad00':'#bcbcbc'}">star</span>
                                <span class="material-icons" style="color: ${product.stars>4?'#e7ad00':'#bcbcbc'}">star</span>
                            </div>
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
                    (product.price?`<a href="/catalog/product/${product._id}" class="price">
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
            M.Materialbox.init(document.querySelectorAll('.materialboxed'));
            document.querySelector('.productGrid').innerHTML = callback.products.length>0?
                callback.products.map(product=>
                    `<a href="/catalog/product/${product._id}" class="productObject">
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