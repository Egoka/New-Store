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
    node.textContent = new Intl.NumberFormat('ru-RU',{
        currency:'rub',
        style:'currency'
    }).format(node.textContent)
})
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
