module.exports = {
    stars(rating){
        rating=rating.toFixed(0)
        const star = new Array(5).fill("#bcbcbc");
        while(rating) {
            rating -= 1
            star[rating] = "#e7ad00"}
        return (`<i class="material-icons" style="color: ${star[0]}">star</i>
                 <i class="material-icons" style="color: ${star[1]}">star</i>
                 <i class="material-icons" style="color: ${star[2]}">star</i>
                 <i class="material-icons" style="color: ${star[3]}">star</i>
                 <i class="material-icons" style="color: ${star[4]}">star</i>`)
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
    }
}