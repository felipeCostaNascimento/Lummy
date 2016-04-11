
$(document).ready(function(){
	var divs = ["#banner4", "#banner3", "#banner2", "#banner1"];
	var currentDiv = 0;
	var timer = setInterval(forwardBanner, 5500);
	var fadeTime = 800;
	var articleStartPositionY = 65; // 65%

	init();


	function init() {
        window.addEventListener('scroll', function(e){
        	$('div#menu-lateral').hide();
        
            var distanceY = $(window).scrollTop(),
            	headerLimit = 300;
                
            if (distanceY > headerLimit) {
                $('header').addClass("smaller");
            } else {
                if ($('header').hasClass("smaller")) {
                    $('header').removeClass("smaller");
                }
            }



            var telefones = $('article'),
            	result = $('section#pre-footer').offset().top - distanceY,
            	screenHeight = $(window).height(),
            	positiontoShow = (articleStartPositionY * screenHeight / 100) + 70;

            if(positiontoShow >= result){
            	telefones.addClass("showPhones");
            	telefones.css('top', result - 70 + 'px');
            }else{
            	if(telefones.hasClass("showPhones")){
            		telefones.removeClass("showPhones");
            		telefones.css('top', articleStartPositionY + '%');
            	}
            	
            }
        });
	}
	
	$('body').on('click', 'a.jsevent', function(e){
		var parent = $(this).closest('div');
		if(parent.attr('id') == "menu-lateral"){
			e.stopPropagation();
			automaticScroll($(this.hash));
			parent.animate({
				height: 'toggle'
			}, 500);


			return false
		}else if(parent.attr('id') == "menu-drop"){
			e.stopPropagation();
			$('div#menu-lateral').animate({
				height: 'toggle'
			}, 500);

			return false
		}

      	if(this.hash == "#prev-banner"){
      		clearInterval(timer);
      		timer = setInterval(forwardBanner, 5500);
      		backBanner();
      		return false;

      	}else if(this.hash == "#next-banner"){
      		clearInterval(timer);
      		timer = setInterval(forwardBanner, 5500);
      		forwardBanner();
      		return false;

      	}else{
      		automaticScroll($(this.hash));
      		return false;
      	}
	});

	function automaticScroll(target){
      		target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      		if (target.length) {
          		$('html,body').animate({
              		scrollTop: target.offset().top - 80
          		}, 1000);
          		return false;
      		}	
	}



	function forwardBanner(){
		if(currentDiv == divs.length-1){
			$(divs[0]).fadeIn(fadeTime, function(){
    			for (var i = 1; i < divs.length-1; i++) {
    				$(divs[i]).fadeIn(0);
    			};
    		});
		}else{
			$(divs[currentDiv]).fadeOut(fadeTime);
		}			

		currentDiv = (currentDiv + 1) % divs.length;
	}

	function backBanner(){
		var prevBanner = currentDiv - 1;
	    currentDiv = prevBanner >= 0 ? prevBanner : divs.length-1;

	    if(currentDiv == divs.length-1){
	    	for (var i = 1; i < divs.length-1; i++) {
    			$(divs[i]).fadeOut(0);
    		};
			$(divs[0]).fadeOut(fadeTime);

		}else{
			$(divs[currentDiv]).fadeIn(fadeTime);
		}
		
	}
});