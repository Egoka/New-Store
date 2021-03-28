function editAccout(event){
    let object = event.target.parentElement.children
    if(object[0].innerHTML !== "save"){
        object[0].innerHTML = "save"
        let inputElement = document.createElement('input')
        inputElement.setAttribute("type", "url")
        inputElement.setAttribute("onchange",
            "event.path[1].children[0].children[0].src = event.srcElement.value")
        inputElement.style.fontSize = "18px"
        inputElement.style.width = "max-content"
        inputElement.value = document.querySelector('.photoAccount').children[0].src
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
        stylesElement(object[5],18)
    }else {
        object[0].innerHTML = "edit"
        object[2].children[1].remove()
        object[4].innerHTML = object[4].children[0].value
        object[5].innerHTML = object[5].children[0].value
    }
}
function editColorSchema(event){
    let link = document.getElementById('colorTheme')
    const icon = event.target.innerHTML
    if(icon ==='brightness_auto'){
        event.target.innerHTML = 'brightness_2'
        link.attributes[1].value = '/theme/dark.css'}
    if(icon ==='brightness_2'){
        event.target.innerHTML = 'brightness_low'
        link.attributes[1].value = '/theme/light.css'}
    if(icon ==='brightness_low'){
        event.target.innerHTML = 'brightness_auto'
        link.attributes[1].value = '/theme/auto.css'}
}