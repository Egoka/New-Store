function openFilter() {
    if(document.querySelector('.filter').style.bottom === "0px"){
        document.querySelector('#filterMobile').style.bottom = "0.6rem"
        document.querySelector('.filter').style.bottom = "-90%"
    }else{
        document.querySelector('#filterMobile').style.bottom = "91%"
        document.querySelector('.filter').style.bottom = "0"}
}
