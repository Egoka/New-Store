let feieldType = document.querySelector('.listType')
if(feieldType){feieldType.addEventListener('touchend',event=>{
    if (event.target.classList.contains('backgroundCategory')){event.preventDefault()} })}