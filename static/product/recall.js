window.onload = function(){
    [...document.querySelectorAll('.userComment')]
        .map(comment=>{
            if(comment.clientHeight<=comment.children[0].clientHeight){
                comment.parentElement.children[1].style.display ="flex"}})}
function editComment(event){
    let curtain
    if(event.target.classList.value==="curtain") {curtain = event.target}
    if(event.target.classList.value==="material-icons") {curtain = event.target.parentElement}
    let userComment = curtain.parentElement.parentElement.children[0]
    if(curtain.style.height === '8rem') {
        userComment.style.transition = '2s cubic-bezier(0.3, 0, 0.3, 1)'
        userComment.style.maxHeight = `${userComment.children[0].clientHeight+10}px`
        curtain.children[0].style.transition = '2s cubic-bezier(0.3, 0, 0.3, 1)'
        curtain.children[0].style.transform = 'rotate(180deg)'
        curtain.style.transition = '2s cubic-bezier(0.3, 0, 0.3, 1)'
        curtain.style.height = '1rem'
    }else{
        userComment.style.transition = '2s cubic-bezier(0.3, 0, 0.3, 1)'
        userComment.style.maxHeight = `130px`
        curtain.children[0].style.transition = '2s cubic-bezier(0.3, 0, 0.3, 1)'
        curtain.children[0].style.transform = 'rotate(0deg)'
        curtain.style.transition = '2s cubic-bezier(0.3, 0, 0.3, 1)'
        curtain.style.height = '8rem'
        }}