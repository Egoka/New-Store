let feieldType = document.querySelector('.listType')
if(feieldType){feieldType.addEventListener('touchend',event=>{
    if (event.target.classList.contains('backgroundCategory')){event.preventDefault()} })}
/*---*/
if (/Android|iPhone/i.test(navigator.userAgent)) {
    document.querySelector('.positionCategory.listType').style.maxWidth="0"
    document.querySelector('.positionCategory.listSearch').style.maxWidth="0"
    Array.from(document.querySelectorAll(
        '.listCategory .roundingArrow[style]'
    )).map(list=>{list.removeAttribute('style')})
    let menu =document.querySelector('.menu')
    if(menu){menu.addEventListener('touchend',event=>{
        if (event.target.classList.contains('backgroundCategory')){
            let e = event.composedPath()
            if(e[3].classList.contains('listCategory')){
                if(e[4].children[1].style.maxWidth==='0px'){
                    e[3].style.transition='max-width .5s linear'
                    e[3].style.maxWidth='0px'
                    e[4].children[1].style.transition='max-width .5s linear'
                    e[4].children[1].style.maxWidth = '100%'}
                if(e[2].children[1].style.display==='block'){
                    if(e[4].children[2].style.maxWidth==='100%'){
                        e[4].children[2].style.transition='max-width .5s linear'
                        e[4].children[2].style.maxWidth = '0px'}
                    e[3].style.transition='max-width .5s linear'
                    e[3].style.maxWidth='100%'
                    e[4].children[1].style.transition='max-width .5s linear'
                    e[4].children[1].style.maxWidth = '0px'
                    e[2].children[1].removeAttribute('style')
                    event.preventDefault()
                    return} }
            if(e[4].classList.contains('listType')){
                if(e[5].children[2].style.maxWidth==='0px'){
                    e[4].style.transition='max-width .5s linear'
                    e[4].style.maxWidth='50%'
                    e[5].children[2].style.transition='max-width .5s linear'
                    e[5].children[2].style.maxWidth = '100%'}
                if(e[2].children[1].style.display==='block'){
                    e[4].style.transition='max-width .5s linear'
                    e[4].style.maxWidth='100%'
                    e[5].children[2].style.transition='max-width .5s linear'
                    e[5].children[2].style.maxWidth = '0px'
                    e[2].children[1].removeAttribute('style')
                    event.preventDefault()
                    return} }
            hoverCategory(event)
            if(e[3].classList.contains('listCategory')){
                Array.from(document.querySelectorAll(
                    '.listType .roundingArrow[style]'
                )).map(list=>{list.removeAttribute('style')})}
            if(e[4].classList.contains('listType')){
                Array.from(document.querySelectorAll(
                    '.listSearch .roundingArrow[style]'
                )).map(list=>{list.removeAttribute('style')})}
            event.preventDefault()
        } })}
}