function invalidMessege(e, messege) {
    e.classList = 'invalid'
    if(Array.from(document.querySelectorAll('.prompt'))
        .filter(prompt=>prompt.style.opacity==="1").length<1){
        e = e.parentElement.children[1]
        e.innerText = messege
        e.style.display = 'block'
        window.setTimeout(()=>{
            e.style.padding='1rem'
            e.style.opacity='1'
            e.style.transition='.2s ease-out'
        },10)}}
function validMessege(e) {
    e.classList = 'valid'
    e = e.parentElement.children[1]
    e.style.padding = '0'
    e.style.opacity = '0'
    window.setTimeout(()=>{
        e.style.display = 'none'
    },1100)}
function messegeNone(e) {
    e = e.parentElement.children[1]
    e.style.padding = '0'
    e.style.opacity = '0'
    window.setTimeout(()=>{e.style.display = 'none'},1100)}
function authorizationErrorDisplayNone(event) {
    if(document.querySelector('#authorizationError')!==null) {
        document.querySelector('#authorizationError').style.display = 'none'
        validMessege(event)}}
/********************************/
function validName(event){
    if(event.value!==undefined) {
        const re = /(^[A-Z]{1}[a-z]{1,14} [A-Z]{1}[a-z]{1,14}$)|(^[А-Я]{1}[а-я]{1,14} [А-Я]{1}[а-я]{1,14}$)|(^[A-Z]{1}[a-z]{1,14}$)|(^[А-Я]{1}[а-я]{1,14}$)/
        if (re.test(String(event.value))) { validMessege(event);return true
        }else{invalidMessege(event, "Имя должно начинаться с заглавой буквы");return false}
    }else{messegeNone(event);return false}}
function validEmail(event){
    if (event.value!==undefined) {
        const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (re.test(String(event.value).toLowerCase())){ validMessege(event);return true
        }else{invalidMessege(event, "Не верный формат почты");return false}
    }else{messegeNone(event);return false}}
function validPassword(event){
    const e = event.value
    if(e!==undefined){
        let re = /([0-9])/
        if(re.test(e)){
            re = /([A-Za-zА-Яа-я])/
            if(re.test(e)){
                let frequencyValidation = Array.from(e)
                if(frequencyValidation.length>6&&frequencyValidation.length<20){
                    frequencyValidation = Object.entries(
                        frequencyValidation.reduce((acc, el) =>
                        {acc[el] = (acc[el] || 0) + 1; return acc;}, {}))
                    if(frequencyValidation.length>4){
                        frequencyValidation = frequencyValidation.filter(symbol =>symbol[1]>8)
                        if(frequencyValidation.length==0){
                            validMessege(event);return true
                        }else{invalidMessege(event, "Пароль должен быть сложнее");return false}
                    }else{invalidMessege(event, "Пароль должен быть сложнее");return false}
                }else{invalidMessege(event, "Пароль должен быть длиннее, от 6 до 20 знапков");return false}
            }else{invalidMessege(event, "Пароль дожен состоять из букв");return false}
        }else{invalidMessege(event, "Пароль дожен состоять из цифр");return false}
    }else{messegeNone(event);return false}}
function validPasswordDup(event){
    const valuePassword = document.querySelector('input[name=registrationPassword]').value
    if(event.value!==undefined){
        if(valuePassword===event.value){ validMessege(event);return true
        }else{invalidMessege(event, "Пароли не совпадают");return false}
    }else{messegeNone(event);return false}}
/********************************/
let authorization =document.querySelector('.authorization')
if(authorization){
    authorization.addEventListener('change',event=>{
        event = event.target
        if (event.name==='name'){validName(event)}
        if (event.name==='email') {validEmail(event)}
        if (event.name==='password'||event.name==='registrationPassword'){
            validPassword(event)}
        if (event.name==='registrationPasswordDup'){validPasswordDup(event)} })
    authorization.addEventListener('mouseup',event=>{
        if (event.target.classList.contains('prompt')){
            messegeNone(event.target)} })
    authorization.addEventListener('touchend',event=>{
        if (event.target.classList.contains('prompt')){
            messegeNone(event.target)} })
    authorization.addEventListener('submit',event=>{
        if(Array.from(document.querySelectorAll('input')).length -
            Array.from(document.querySelectorAll('.valid')).length>0){
            if(!validName(document.querySelector('input[name=name]'))) {event.preventDefault()}
            if(!validEmail(document.querySelector('input[name=email]'))){event.preventDefault()}
            if(!validPassword(document.querySelector('input[name=registrationPassword]'))){event.preventDefault()}
            if(!validPasswordDup(document.querySelector('input[name=registrationPasswordDup]'))){event.preventDefault()}
        }
    })
}