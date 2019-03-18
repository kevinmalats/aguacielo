

$(document).ready(function(){


  	var index = 0;
sessionStorage.setItem('scrollTo',index);
	if(window.innerWidth > 992){
		$('.bottle-cont').each(function(){ $(this).height(window.innerHeight) })
	}

	 if($(window).scrollTop() == 0){
	 	$('.bottle-cont').eq(0).addClass('transition')
	 	setTimeout(function(){
	 		$('.bottle-cont').eq(0).addClass('active')
	 		setTimeout(function(){
	 			$('.bottle-cont').eq(0).addClass('mousemove').removeClass('transition')
	 		},2250)
	 	},1000)
	 }
	var initScroll = sessionStorage.getItem('scrollTo') ? sessionStorage.getItem('scrollTo') : 0
	sessionStorage.clear()
	$('.bottle-cont').eq(initScroll).addClass('transition')
	if(initScroll != 0){
		$('.bottle-cont').eq(initScroll).find('img[data-pre-src]').each(function(){
			if(!$(this).hasClass('loaded')) $(this).attr('src', $(this).data('pre-src')).addClass('loaded');
		})
	}
	scrollSections($('.bottle-cont').eq(initScroll))
	setTimeout(function(){
		window.onscroll = scrollBind
	},1100)

	var initOffset = 0,
		checkBottom = $('.bottle-cont').last().offset().top + $('.bottle-cont').last().height()

	// window.onscroll = scrollBind

	$(document).on('click','.navigator span',function(){
		window.onscroll = null

		$('.bottle-cont').eq($(this).parent().index()).find('img[data-pre-src]').each(function(){
			if(!$(this).hasClass('loaded')) $(this).attr('src', $(this).data('pre-src')).addClass('loaded');
		})

		$('.bottle-cont.active').removeClass('mousemove')
		$('.bottle-cont.active').find('.pattern img').each(function(){ $(this).removeAttr('style') })
		$('.bottle-cont').eq($(this).parent().index()).addClass('transition')
		scrollSections($('.bottle-cont').eq($(this).parent().index()),$(this).parent().index())
		setTimeout(function(){ window.onscroll = scrollBind },1100)
	})

	$(document).on('click','.nextSection',function(){

		window.onscroll = null
		$(this).closest('.bottle-cont').removeClass('mousemove')
		$(this).closest('.bottle-cont').find('.pattern img').each(function(){ $(this).removeAttr('style') })
		$(this).closest('.bottle-cont').next('.bottle-cont').addClass('transition')
		if($(this).closest('.bottle-cont').next('.bottle-cont')[0]) scrollSections($(this).closest('.bottle-cont').next('.bottle-cont'))
		else {
			jQuery('html,body').animate({
				scrollTop: $('#storia').offset().top
			}, 1000, function(){
				jQuery('html,body').stop(true,true);
			})
		}
		setTimeout(function(){ window.onscroll = scrollBind },1100)
	})

	function scrollSections(newElem){
		$('.navigator span').each(function(){ $(this).removeClass('active') })
		$('.navigator span').eq(newElem.index()).addClass('active')

		newElem.removeClass('mousemove')
		newElem.find('.pattern img').each(function(){ $(this).removeAttr('style') })

		if(newElem.next('.bottle-cont')[0]){
			newElem.next('.bottle-cont').find('img[data-pre-src]').each(function(){
				if(!$(this).hasClass('loaded')) $(this).attr('src', $(this).data('pre-src')).addClass('loaded');
			})
		}

		if(newElem.prev('.bottle-cont')[0]){
			newElem.prev('.bottle-cont').find('img[data-pre-src]').each(function(){
				if(!$(this).hasClass('loaded')) $(this).attr('src', $(this).data('pre-src')).addClass('loaded');
			})
		}

  
		jQuery('html,body').animate({
			scrollTop: newElem.offset().top
		}, 1000, function(){
			jQuery('html,body').stop(true,true);

			initOffset = $(window).scrollTop()
			$('.bottle-cont').each(function(){ $(this).removeClass('active') })
			newElem.addClass('active')
			setTimeout(function(){
				newElem.addClass('mousemove').removeClass('transition');

			},2250)
      let pres=  $('#presentacion');
      if (pres.hasClass('active')){

        $('div.presentaciones').show("slow");

    }else {
        $('div.presentaciones').hide("slow");
    }

		});

	}

	function scrollBind(){

		if(window.innerWidth > 992){

			var $activeView = $('.bottle-cont.active');

      if($activeView[0]==undefined) $activeView=$("#storia");
     var sig=$activeView.next('.bottle-cont')[0];
			if($activeView[0] == undefined && ($(window).scrollTop() < (window.innerHeight * 7))){
				$('.bottle-cont').eq(0).addClass('transition')
				scrollSections($('.bottle-cont').eq(0))
			}else{

				if((initOffset-10) < $(window).scrollTop() && $(window).scrollTop() < (initOffset+10) ) return false;
				else{
					$activeView.removeClass('mousemove')
					$activeView.find('.pattern img').each(function(){ $(this).removeAttr('style') })
					if($(window).scrollTop() > initOffset){
						if($activeView.next('.bottle-cont')[0]){
							if(!$activeView.next('.bottle-cont').hasClass('transition')){
								$activeView.next('.bottle-cont').addClass('transition')
								scrollSections($activeView.next('.bottle-cont'))
							}
						}else{
							scrollSections($('#storia'))
						/*	setTimeout(function(){
								window.onscroll = scrollIntoB
							},1100)*/
						}
					}else if($(window).scrollTop() < initOffset){
						if(!$activeView.prev('.bottle-cont').hasClass('transition')){
							$activeView.prev('.bottle-cont').addClass('transition')
							scrollSections($activeView.prev('.bottle-cont'))
						}
					}
				}
			}
		}
	}

	function scrollIntoB(){
    return true;
		/*var offset = $('.bottle-cont').last().offset().top + $('.bottle-cont').last().height()
		if(offset - $(window).scrollTop() > 100) $('.navigator span').last().trigger('click')*/
	}

	/*var parallaxBox = document.getElementById ( 'box' );
	var c1left = $('.animation-bg').get(0).offsetLeft,
	c1top = $('.animation-bg').get(0).offsetTop,
	c2left = $('.animation-cc').get(0).offsetLeft,
	c2top = $('.animation-cc').get(0).offsetTop,
	c3left = $('.animation-fg').get(0).offsetLeft,
	c3top = $('.animation-fg').get(0).offsetTop
*/
	$(document).on('mousemove',function(event){
		event = event || window.event;
		var x = event.clientX ,
		y = event.clientY ;

		var container = $('.bottle-cont.active')

		mouseParallax ( $(container).find('.animation-bg').get(0) , 0, 0, x, y, 10 );
		mouseParallax ( $(container).find('.animation-cc').get(0), 0, 0, x, y, 30 );
		mouseParallax ( $(container).find('.animation-fg').get(0), 0, 0, x, y, 90 );
	})



	function mouseParallax ( obj, left, top, mouseX, mouseY, speed ) {
		if(obj !== undefined){
			var parentObj = obj.parentNode,
			containerWidth = parseInt( parentObj.offsetWidth ),
			containerHeight = parseInt( parentObj.offsetHeight );
			if($(parentObj).closest('.bottle-cont').index() % 2 == 0) obj.style.left = left - ( ( ( mouseX - ( parseInt( obj.offsetWidth ) / 2 + left ) ) / containerWidth ) * speed ) + 'px';
			else obj.style.right = left - ( ( ( mouseX - ( parseInt( obj.offsetWidth ) / 2 + left ) ) / containerWidth ) * speed ) + 'px';
			if(!$(obj).closest('.bottle-cont').hasClass('transition')){
				obj.style.top = top - ( ( ( mouseY - ( parseInt( obj.offsetHeight ) / 2 + top ) ) / containerHeight ) * speed ) + 'px';
			}
		}
	}

	$(document).on('click','.open-modal',function(){
		$('.overlay').addClass('show')
		var index = $(this).closest('.bottle-cont').index()
		var $bImg = $('.b-modal').eq(index).find('[data-modal-src]')
		$bImg.attr('src',$bImg.data('modal-src'))
		$('.b-modal').eq(index).addClass('show')
		// window.onscroll = function(event){ event.preventDefault() }
	})

	$(document).on('click','.close-modal',function(){
		$('.overlay').removeClass('show')
		$('.b-modal.show').removeClass('show')
	})

	$( window ).resize(function() {
		if(window.innerWidth > 992){
			$('.bottle-cont').each(function(){ $(this).height(window.innerHeight) })
			setTimeout(function(){ scrollSections($('.bottle-cont.active')) },200)

		}else{
			$('.bottle-cont').each(function(){ $(this).height('auto') })
		}
	});
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
       menu.style.zIndex="12";
menu.style.overflow= "scroll";
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
})
/*var lastScrollTop = 0;
var st=1;
if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;

	function wheel(event) {
		var delta = 0;
		if (event.wheelDelta) delta = event.wheelDelta / 120;
		else if (event.detail) delta = -event.detail / 3;
    if((window.pageYOffset || document.documentElement.scrollTop)==0 ){
      st=1;
    }else
     st = window.pageYOffset || document.documentElement.scrollTop;

		handle(delta);

	}

	function handle(delta) {
		var time = 500;
		var distance = 937;


      var scrollTop = $(window).scrollTop();
        var posicion = $("#second").offset().top-130;

      if (st > lastScrollTop){
        console.log('para abajo');
        if(scrollTop>=0 && scrollTop < 700){
          var strAncla=$("section"); //id del ancla
          $('html, body').stop().animate({
            scrollTop: $(window).scrollTop() - ($(strAncla).offset().top * delta)
          }, time );

          /*$('body,html').stop(true,true).animate({
            scrollTop: $($("#second")).offset().top
          },"slow");*/
/*          if(scrollTop>= posicion){
           //$("#rei").css("visibility", "true");


            $("#rei").css("visibility", "true");




          }

     }
      } else {
        console.log('para arriba');

      }
      lastScrollTop = st;



	}

 /*var scene = document.getElementById('scene');
  var scene2 = document.getElementById('scene2');
  var parallax2 = new Parallax(scene2);
  var parallax = new Parallax(scene, {
  calibrateX: true
    });
    var lastScrollTop = 0;
//evente scroll hacia arriba y hacia abajo con jquery
window.addEventListener("scroll", function(){
   var st = window.pageYOffset || document.documentElement.scrollTop;
   var scrollTop = $(window).scrollTop();
     var posicion = $("#second").offset().top-130;

   if (st > lastScrollTop){
     console.log('para abajo');
     if(scrollTop>0 && scrollTop < 700){
     var strAncla=$("section"); //id del ancla
       $('body,html').stop(true,true).animate({
         scrollTop: $($("#second")).offset().top
       },"slow");
       if(scrollTop>= posicion){
        //$("#rei").css("visibility", "true");


         $("#rei").css("visibility", "true");




       }

}
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
