 /*var scene = document.getElementById('scene');
  var scene2 = document.getElementById('scene2');
  var parallax2 = new Parallax(scene2);
  var parallax = new Parallax(scene, {
  calibrateX: true
    });*/
    var lastScrollTop = 0;
//evente scroll hacia arriba y hacia abajo con jquery
window.addEventListener("scroll", function(){
   var st = window.pageYOffset || document.documentElement.scrollTop;
   if (st > lastScrollTop){
     console.log('para abajo');
   } else {
     console.log('para arriba');
   }
   lastScrollTop = st;
}, false);
/*
	$( window ).scroll(function() {
		 var scrollTop = $(window).scrollTop();
      var posicion = $("#second").offset().top-130;
      if(scrollTop>0 && scrollTop < 700){
      var strAncla=$("section"); //id del ancla
        $('body,html').stop(true,true).animate({
          scrollTop: $(strAncla[1]).offset().top
        },1000);
        if(scrollTop>= posicion){
         //$("#rei").css("visibility", "true");


          $("#rei").css("visibility", "true");




        }

}


			// $( "#img1" ).show("slow");
//https://www.youtube.com/watch?v=2IUjVqJo5WE


});*/
$(function(){
           $(window).stellar();
           $('.wrapper').css({
             'height': screen.availHeight + 'px'
           });

         });

var menu = document.getElementById('container-menu');

var item = document.getElementById('item');
var btnaction= document.getElementById("action");
var fuc= "mostrar";
var icono="fas fa-bars icon-menu";
  btnaction.addEventListener("click", addEv);
function addEv(){
  if (fuc=="mostrar"){
    mostrar();
  }else {
    ocultar();
  }

}
function mostrar(){

    item.style.position="absolute";
     item.style.zIndex="13";

     menu.style.padding = '26px 26px 200vw 200vw';
     menu.style.zIndex="11";

    item.style.display = 'block';
    icono="fas fa-window-close icon-menu";
    btnaction.className=icono;
    fuc= "cerrar";
}

function ocultar(){
    menu.style.padding = '26px 26px 52px 52px';

    item.style.display = 'none';
    icono="fas fa-bars icon-menu";
      btnaction.className=icono;
    fuc= "mostrar";
}
