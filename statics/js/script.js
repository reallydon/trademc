function Slider(){
    var self = this;
    
    var slides = $('.slider > .slide'),
        count = slides.length,
        counter = 0;
    
    self.next = function(){
        var current = counter;
        
        if(++counter >= count){
            counter = 0;
            next = 0;
        }
        else
            next = counter;
        
        slides.eq(next).show().addClass('scale');
        slides.eq(current).css('z-index', 10).fadeOut(700, function(){
            $(this).css('z-index', '').removeClass('scale');
        });
        
        $('#games-title').attr('href', '/autodonate/' + slides.eq(next).attr('data-url')).text(slides.eq(next).attr('data-name'));
        
        setTimeout(self.next, 5000);
    }
    
    setTimeout(self.next, 5000);
};

var slider = new Slider();

$('.more-info').on('click', function(e){
    e.preventDefault();
    $('html, body').animate({scrollTop:$('header').height()}, 'slow');
}); 

$('.menu-toggle-button').on('click', function(){
    $('body').toggleClass('open-menu');
});

$('.menu > a').on('click', hideMenu);
$('#content').on('touchstart', hideMenu);

function hideMenu(){
    if($('body').hasClass('open-menu')){
        $('body').removeClass('open-menu');
    }
}

$('.show-pre > span').on('click', function(){
    $(this).parent().find('pre').toggle();
});

$('#feedback').on('submit', function(e){
    e = e || window.event;
    e.preventDefault();
    
    var form = $(this)
        button = form.find('button');
        
    if (button.hasClass('load') || button.hasClass('finish'))
        return false;
    button.addClass('load');
    
    form.find('.error').removeClass('error');
    
	$.ajax({
		type: 'get',
		url: '/actions/feedback.php',
		data: form.serialize(),
		success: function(data) {
			data = JSON.parse(data);
            button.removeClass('load');
            
            if(data[0] == "good") {
                button.text('Отправлено').addClass('finish');
                form[0].reset();
                return;
            }
            
            $('[name='+data[1]+']').addClass('error').focus();
		}
	});
});

/*$('.mobile-nav').on('click', function(e){
    e.stopPropagation();
    $('body').toggleClass('open-menu');
});
$('body > nav').on({
    'click': saveNav,
    'touchstart': saveNav
});
$('body').on({
    'click': hideNav,
    'touchstart': hideNav
});
function saveNav(e){
    e.stopPropagation();
}
function hideNav(){
    $(this).removeClass('open-menu');
}*/