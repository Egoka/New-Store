function editAccout(event){
    let object = event.target.parentElement.children
    if(object[0].innerHTML !== "save"){
        object[0].innerHTML = "save"
        let inputElement = document.createElement('input')
        inputElement.setAttribute("type", "url")
        inputElement.setAttribute("onchange",
            "event.target.parentElement.children[0].children[0].src = event.srcElement.value")
        inputElement.style.fontSize = "18px"
        inputElement.style.width = "max-content"
        let src = document.querySelector('.photoAccount').children[0].src
        if(src==undefined){src="Ссылка на аватарку"}
        inputElement.value = src
        inputElement.style.color = "var(--truly-black)"
        object[2].append(inputElement);
        function stylesElement(object,fontSize) {
            let inputElement = document.createElement('input');
            inputElement.setAttribute("class", "infoAccount")
            inputElement.style.color = "var(--truly-black)"
            inputElement.value = object.innerText
            inputElement.style.fontSize = `${fontSize}px`
            object.innerText = ""
            object.append(inputElement);}
        stylesElement(object[4],25)
    }else {
        fetch('/account/editAccout',{
            method: 'post',
            body:JSON.stringify({
                'photoUrl': object[2].children[1].value,
                'fullName': object[4].children[0].value}),
            headers: {'Content-Type': 'application/json'}
        })
        object[0].innerHTML = "edit"
        object[2].children[1].remove()
        object[4].innerHTML = object[4].children[0].value
    }
}
function editColorSchema(event, theme=0){
    let link = document.getElementById('colorTheme')
    switch(theme) {
        case 2:
            theme = 0
            event.target.innerHTML = 'brightness_auto'
            link.attributes[1].value = '/theme/auto.css'
            break;
        case 0:
            theme = 1
            event.target.innerHTML = 'brightness_2'
            link.attributes[1].value = '/theme/dark.css'
            break;
        case 1:
            theme = 2
            event.target.innerHTML = 'brightness_low'
            link.attributes[1].value = '/theme/light.css'
            break;
    }
    event.target.attributes[2].value = `editColorSchema(event, ${theme})`
    fetch('/account/editTheme',{
        method: 'post',
        body:JSON.stringify({theme}),
        headers: {'Content-Type': 'application/json'}
    })
}