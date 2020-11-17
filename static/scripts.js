M.AutoInit();
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
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
            const form = event.target.dataset.form
            const status = event.target.dataset.status
            const state = event.srcElement.checked
            const csrf = event.target.dataset.csrf
            console.log(id, form, status)
        }
    })
}
