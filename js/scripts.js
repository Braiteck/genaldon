$(() => {
	// Ширина окна для ресайза
	WW = $(window).width()


	// Моб. меню
	$('.menu_btn').click((e) => {
		e.preventDefault()

		!$('.menu_btn').hasClass('active')
			? $('.menu').fadeIn(300)
			: $('.menu').fadeOut(200)

		$('.menu_btn').toggleClass('active')
	})


	// Вспылвашка при наведении мыши
	let mouseTip = new MouseTip({
		cssPadding: "12px 20px",
		cssBorderRadius: "0",
		cssBackground: "rgba(0,0,0,.6)",
		cssColor: "#fff"
	})

	mouseTip.start()


	// Видео
	if ($('.videos .swiper-container').length) {
		new Swiper('.videos .swiper-container', {
			loop: true,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		})
	}


	// Проекты
	if ($('.projects .swiper-container').length) {
		new Swiper('.projects .swiper-container', {
			direction: 'horizontal',
			slidesPerView: 'auto',
			freeMode: true,
			mousewheel: true,
			breakpoints: {
				0: {
					spaceBetween: 60
				},
				1280: {
					spaceBetween: 80
				},
				1900: {
					spaceBetween: 108
				}
			},
			on: {
				setTranslate: swiper => {
					swiper.translate < 0
						? $('header, aside').addClass('hide')
						: $('header, aside').removeClass('hide')
				}
			}
		})
	}


	// Parallax
	if ($(window).width() > 1023 && $('.parallax').length) {
		$('.parallax').parallaxify({
			horizontalParallax: true,
			verticalParallax: true,
			positionProperty: 'transform',
			motionType: 'linear'
		})
	}
})



$(window).on('load', () => {
	// Parallax
	if ($(window).width() > 1023 && $('.parallax').length) {
		$('.parallax').addClass('active')
	}
})



$(window).on('resize', () => {
	if (typeof WW !== 'undefined' && WW != $(window).width()) {
		// Моб. версия
		if (!firstResize) {
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
			if ($(window).width() < 480) $('meta[name=viewport]').attr('content', 'width=480, user-scalable=no')

			firstResize = true
		} else {
			firstResize = false
		}


		// Перезапись ширины окна
		WW = $(window).width()
	}
})


function onMouseWheel(e) {
	clearTimeout($.data(this, 'timer'))

	$('.swiper-wrapper').addClass('mousewheel')

	$.data(this, 'timer', setTimeout(function () {
		$('.swiper-wrapper').removeClass('mousewheel')

	}, 250))
}

window.addEventListener('mousewheel', onMouseWheel, false)
window.addEventListener('DOMMouseScroll', onMouseWheel, false)