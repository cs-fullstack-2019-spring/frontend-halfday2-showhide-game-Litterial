var newbackground=document.getElementById('water');  /*background*/
var grassbackground = document.getElementsByTagName("table");   /*gets table tag*/
newbackground.addEventListener('click',oceanTheme); /*listens for click*/
function oceanTheme()
{
    console.log('hi');
    grassbackground[0].classList.toggle("newOcean");
}