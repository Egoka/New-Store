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
        } })}
}