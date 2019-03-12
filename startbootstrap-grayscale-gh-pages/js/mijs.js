 /*setInterval(change, 4000);
 function change(){


    $("#gray").hide("slow");
    setTimeout(function(){
    $("#gray").show("slow");
    }, 1000)



 }*/

$( "#img1" ).css("display","none");

	$( window ).scroll(function() {
		 var scrollTop = $(window).scrollTop();
		 if(scrollTop>=800){
       $( "#img1" ).show("slow");
       $("#img1").animate({left: "500px", height: "200px", width: "200px"},5000);

			// $( "#img1" ).show("slow");
	 }


});
