M.AutoInit();
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});
var elem = document.querySelector('.collapsible.expandable');
var instance = M.Collapsible.init(elem, {
    accordion: false
});
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.materialboxed');
    var instances = M.Materialbox.init(elems);
});
document.querySelectorAll('.price').forEach(node =>{
    if(node.textContent==="null")
        node.textContent = "Нет в продажи"
    else{
        node.textContent = new Intl.NumberFormat('ru-RU',{
            currency:'rub',
            style:'currency'
        }).format(node.textContent)}
})
$(document).ready(function() {
    $('input#input_text, textarea#textarea2').characterCounter();
});
var instance = M.Carousel.init({
    fullWidth: true,
    indicators: true
})
const $filter = document.querySelector('.request')
if ($filter){
    $filter.addEventListener('click',event=>{
        if (event.target.classList.contains('js-filter')){
            const id = event.target.dataset.id
            const state = event.srcElement.checked
            console.log(state,id)
            const form = event.target.dataset.form
            const status = event.target.dataset.status
            console.log(id, form, status)
            const csrf = event.target.dataset.csrf
        }
    })
}
const $filterRecall = document.querySelector('.filterRecall')
if ($filterRecall){
    $filterRecall.addEventListener('click',event=>{
        if (event.target.classList.contains('recall-filter')){
            const star = event.target.dataset.id
            console.log(star)
        }
    })
}
const $filterComment = document.querySelector('.commentInput')
if ($filterComment){
    $filterComment.addEventListener('click',event=>{
        if (event.target.classList.contains('comment-filter')){
            let number = event.target.dataset.id
            console.log(number)
            const size = number
            const star = new Array(5).fill("#bcbcbc");
            while(number) {
                number -= 1
                star[number] = "#e7ad00"}
            $filterComment.querySelector('.commentInput').innerHTML =
                `<i data-id="1" class="material-icons comment-filter" style="color: ${star[0]}">star</i>
                 <i data-id="2" class="material-icons comment-filter" style="color: ${star[1]}">star</i>
                 <i data-id="3" class="material-icons comment-filter" style="color: ${star[2]}">star</i>
                 <i data-id="4" class="material-icons comment-filter" style="color: ${star[3]}">star</i>
                 <i data-id="5" class="material-icons comment-filter" style="color: ${star[4]}">star</i>
                 <input name="stars" id="stars" class="commentStar" type="number" style="display: none" value="${size}" required>`
        }
    })
}
const $typeProducts = document.querySelector('#typeProducts')
if ($typeProducts){
    $typeProducts.addEventListener('click',event=>{
        if (event.target.classList.contains('js-typeProduct')){
            const number = event.target.dataset.id
            console.log(number)
        }
    })
}