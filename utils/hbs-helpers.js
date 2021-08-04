module.exports = {
    stars(rating=0){
        const size = rating
        rating=rating.toFixed(0)
        const star = new Array(5).fill("#bcbcbc");
        if(rating>0){
            while(rating) {
                rating -= 1
                star[rating] = "#e7ad00"}}
        return (`<span data-id="${size}" class="material-icons recall-filter" style="color: ${star[0]}">star</span>
                 <span data-id="${size}" class="material-icons recall-filter" style="color: ${star[1]}">star</span>
                 <span data-id="${size}" class="material-icons recall-filter" style="color: ${star[2]}">star</span>
                 <span data-id="${size}" class="material-icons recall-filter" style="color: ${star[3]}">star</span>
                 <span data-id="${size}" class="material-icons recall-filter" style="color: ${star[4]}">star</span>`)},
    starRecall(number){
        if (number>0) {
            if (number === 1) return `${number} отзыв`
            if (number < 5) return `${number} отзыва`
            return `${number} отзывов`}
        return `--`},
    paymentFormat(format){
        if(format===1){
            return`<i class="material-icons">payment</i>
                   <p>Оплата наличными курьеру</p>`}
        if(format===2){
            return`<i class="material-icons">store</i>
                   <p>Варианты оплаты уточняйте в магазине</p>`}},
    toDate(date){
        function monthDays(year, month) {
            return (month === 2 ?
                ((year % 4 !== 0 ||
                    (year % 100 === 0 && year % 400 !== 0)) ? 28 : 29) :
                (((month < 8 && (month & 1) === 0) ||
                    (month > 7 && (month & 1) === 1)) ? 31 : 30));}
        function dateDiff(date1, date2) {
            let years, months, days, hours, minutes, seconds;
            let y1, m1, d1, d2, dd;
            years = date2.getUTCFullYear()-(y1 = date1.getUTCFullYear());
            months = date2.getUTCMonth()-(m1 = date1.getUTCMonth());
            days = (d2 = date2.getUTCDate())-(d1 = date1.getUTCDate());
            hours = date2.getUTCHours()-date1.getUTCHours();
            minutes = date2.getUTCMinutes()-date1.getUTCMinutes();
            seconds = date2.getUTCSeconds()-date1.getUTCSeconds();
            dd = 0;
            if (seconds < 0) {
                seconds += 60;
                minutes--;}
            if (minutes < 0) {
                minutes += 60;
                hours--;}
            if (hours < 0) {
                hours += 24;
                days--;
                dd = 1;}
            if (days < 0) {
                days = monthDays(y1, m1)-d1+d2-dd;
                months--;}
            if (months < 0) {
                months += 12;
                years--;}
            if (years>0) {
                if (months === 1) return `${months} год назад`
                if (months < 5) return `${months} года назад`
                return `${years} лет назад`}
            if (months>0) {
                if(months===1)return `${months} месяц назад`
                if(months<5)return `${months} месяца назад`
                return `${months} месяцев назад`}
            if (days>0) {
                if(days===1)return `${days} день назад`
                if(days<5)return `${days} дня назад`
                return `${days} дней назад`}
            if (hours>0){
                if(hours%10===1)return `${hours} час назад`
                if(hours%10<5)return `${hours} часа назад`
                return `${hours} часов назад`}
            if (minutes>0) {
                if(minutes===1)return `${minutes} минуту назад`
                if(minutes<5)return `${minutes} минуты назад`
                return `${minutes} минут назад`}
            if (seconds>0)return `${seconds} секунд назад`}
        let d1 = new Date(date);
        let d2 = new Date(+Date.now())
        return dateDiff(d1, d2);},
    ifeq(a,b,options){
        if(a==b) return options.fn(this)
        return options.inverse(this)},
    ifne(a,b,options){
        if(a!=b) return options.fn(this)
        return options.inverse(this)},
    ifgt(a,b,options){
        if(a>b) return options.fn(this)
        return options.inverse(this)},
}