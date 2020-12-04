module.exports = {
    stars(rating){
        const size = rating
        rating=rating.toFixed(0)
        const star = new Array(5).fill("#bcbcbc");
        while(rating) {
            rating -= 1
            star[rating] = "#e7ad00"}
        return (`<i data-id="${size}" class="material-icons recall-filter" style="color: ${star[0]}">star</i>
                 <i data-id="${size}" class="material-icons recall-filter" style="color: ${star[1]}">star</i>
                 <i data-id="${size}" class="material-icons recall-filter" style="color: ${star[2]}">star</i>
                 <i data-id="${size}" class="material-icons recall-filter" style="color: ${star[3]}">star</i>
                 <i data-id="${size}" class="material-icons recall-filter" style="color: ${star[4]}">star</i>`)
    },
    starRecall(number){
        if (number>0) {
            if (number === 1) return `${number} отзыв`
            if (number < 5) return `${number} отзыва`
            return `${number} отзывов`}
        return `--`
    },
    paymentFormat(format){
        if(format==='courier'){
            return`<i class="material-icons">payment</i>
                   <p>Оплата наличными курьеру</p>`
        } else
        if(format==='store'){
            return`<i class="material-icons">store</i>
                   <p>Варианты оплаты уточняйте в магазине</p>`
        }
    },
    toDate(date){
        function monthDays(year, month) {
            return (month === 2 ?
                ((year % 4 !== 0 ||
                    (year % 100 === 0 && year % 400 !== 0)) ? 28 : 29) :
                (((month < 8 && (month & 1) === 0) ||
                    (month > 7 && (month & 1) === 1)) ? 31 : 30));}
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
                if(hours===1)return `${hours} час назад`
                if(hours<5)return `${hours} часа назад`
                return `${hours} часов назад`}
            if (minutes>0) {
                if(minutes===1)return `${minutes} минуту назад`
                if(minutes<5)return `${minutes} минуты назад`
                return `${minutes} минут назад`}
            if (seconds>0)return `${seconds} секунд назад`}
        var d1 = new Date(date);
        var d2 = new Date(+Date.now())
        return dateDiff(d1, d2);
    }
}