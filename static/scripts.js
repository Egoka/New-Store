M.AutoInit();
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
});
var instance = M.Carousel.init({
    fullWidth: true,
    indicators: true
})
