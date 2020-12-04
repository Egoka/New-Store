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
const toDate = date => {
    function monthDays(year, month) {
        return (month == 2 ?
            ((year % 4 != 0 ||
                (year % 100 == 0 && year % 400 != 0)) ? 28 : 29) :
            (((month < 8 && (month & 1) == 0) ||
                (month > 7 && (month & 1) == 1)) ? 31 : 30));
    }
    function dateDiff(date1, date2) {
        var years, months, days, hours, minutes, seconds;
        var y1, m1, d1, d2, dd;
        years = date2.getUTCFullYear()-(y1 = date1.getUTCFullYear());
        months = date2.getUTCMonth()-(m1 = date1.getUTCMonth());
        days = (d2 = date2.getUTCDate())-(d1 = date1.getUTCDate());
        hours = date2.getUTCHours()-date1.getUTCHours();
        minutes = date2.getUTCMinutes()-date1.getUTCMinutes();
        seconds = date2.getUTCSeconds()-date1.getUTCSeconds();
        dd = 0;
        if (seconds < 0) {
            seconds += 60;
            minutes--;
        }
        if (minutes < 0) {
            minutes += 60;
            hours--;
        }
        if (hours < 0) {
            hours += 24;
            days--;
            dd = 1;
        }
        if (days < 0) {
            days = monthDays(y1, m1)-d1+d2-dd;
            months--;
        }
        if (months < 0) {
            months += 12;
            years--;
        }
        if (years>0)return `${years} год назад`
        if (months>0) {
            if(months===1)return `${months} месяц назад`
            if(months<5)return `${months} месяца назад`
            return `${months} месяцев назад`
        }
        if (days>0) {
            if(days===1)return `${days} час назад`
            if(days<5)return `${days} часа назад`
            return `${days} дня назад`
        }
        if (hours>0){
            if(hours===1)return `${hours} час назад`
            if(hours<5)return `${hours} часа назад`
            return `${hours} часов назад`}
        if (minutes>0) {
            if(minutes===1)return `${minutes} минуту назад`
            if(minutes<5)return `${minutes} минуты назад`
            return `${minutes} минут назад`}
        if (seconds>0)return `${seconds} секунд назад`
    }
    var d1 = new Date(date);
    var d2 = new Date(+Date.now() * 1)
    return dateDiff(d1, d2);
}
document.querySelectorAll('.date').forEach(node => {
    node.textContent = toDate(node.textContent)
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
