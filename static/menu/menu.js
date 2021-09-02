function hoverCategory(event) {
    switch (event.composedPath()[2].classList[1]) {
        case 'category': {
            /*удаление стилий*/
            Array.from(document.querySelectorAll(
                '.listSearch .absolutePositionCategory[style]'
            )).map(list=>{list.removeAttribute('style')})
            Array.from(document.querySelectorAll(
                '.listType .absolutePositionCategory[style]'
            )).map(list=>{list.removeAttribute('style')})
            Array.from(document.querySelectorAll(
                '.listCategory .roundingArrow[style]'
            )).map(list=>{list.removeAttribute('style')})
            Array.from(document.querySelectorAll(
                '.listType .roundingArrow[style]'
            )).map(list=>{list.removeAttribute('style')})
            /*Вывод поля на дисплей*/
            document.querySelectorAll(
                `.listType .absolutePositionCategory[data-index='${
                    event.composedPath()[2].dataset.index
                }']`)[0].style.display = 'block'
            let element = document.querySelectorAll(
                `.listSearch .absoluteCategory[data-index='${
                    event.composedPath()[2].dataset.index
                }'] .absolutePositionCategory[data-index='0']`)[0]
            if(element !== undefined){
                element.style.display = 'block'}
            event.composedPath()[2].children[1].style.display = 'block'
            element = event.composedPath()[4].children[1].children
                [+event.composedPath()[2].dataset.index].children[1].children[1]
            if(element !== undefined){
                element.style.display = 'block'}
            break}
        case 'type': {
            /*удаление стилий*/
            Array.from(document.querySelectorAll(
                '.listSearch .absolutePositionCategory[style]'
            )).map(list=>{list.removeAttribute('style')})
            Array.from(document.querySelectorAll(
                '.listType .roundingArrow[style]'
            )).map(list=>{list.removeAttribute('style')})
            /*Вывод поля на дисплей*/
            document.querySelectorAll(
                `.listSearch .absoluteCategory[data-index='${
                    event.composedPath()[3].dataset.index
                }'] .absolutePositionCategory[data-index='${
                    event.composedPath()[2].dataset.index
                }']`)[0].style.display = 'block'
            event.composedPath()[2].children[1].style.display = 'block'
            break}
    }
}
let feield = document.querySelector('.menu')
if(feield){feield.addEventListener('mouseover',event=>{
    if (event.target.classList.contains('backgroundCategory')){
        hoverCategory(event)}})}