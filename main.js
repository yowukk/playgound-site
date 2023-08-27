//* current year
var currentYear = new Date().getFullYear();
document.getElementById("rights").innerHTML = currentYear + ' © Все права защищены';

//* carousel
$('#recipeCarousel').carousel({
  interval: 10000
})

$('.carousel .carousel-item').each(function(){
    let minPerSlide = 3;
    let next = $(this).next();
    if (!next.length) {
    	next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
    
    for (let i = 0; i < minPerSlide; i++) {
        next = next.next();
        if (!next.length) {
        	next = $(this).siblings(':first');
      	}
        
        next.children(':first-child').clone().appendTo($(this));
      }
});


//* phone
function formatPhoneInput(input) {
  // Удаление всех символов, кроме цифр
  let phoneNumber = input.value.replace(/\D/g, '');

  // Добавление форматирования
  let formattedPhoneNumber = '';
  if (phoneNumber != '') {
	formattedPhoneNumber = '+'
  }
  if (phoneNumber.length > 0) {
    if (phoneNumber.substring(0, 1) == '8') {
        formattedPhoneNumber += '7';
    } else {
        formattedPhoneNumber += phoneNumber.substring(0, 1);
    }
  }
  if (phoneNumber.length > 1) {
    formattedPhoneNumber += ' ' + phoneNumber.substring(1, 4);
  }
  if (phoneNumber.length > 4) {
    formattedPhoneNumber += ' ' + phoneNumber.substring(4, 7);
  }
  if (phoneNumber.length > 7) {
    formattedPhoneNumber += '-' + phoneNumber.substring(7, 9);
  }
  if (phoneNumber.length > 9) {
    formattedPhoneNumber += '-' + phoneNumber.substring(9, 11);
  }

  // Обновление значения в поле ввода
  input.value = formattedPhoneNumber;
}


//* map
ymaps.ready(init);

	function init() {
		let map = new ymaps.Map("map", {
			center: [55.756685, 37.404923],
			zoom: 10
		});
		
		map.controls.remove('searchControl');
		map.controls.remove('trafficControl');

		let placemark1 = init_my_placemark(55.756685, 37.404923)
		let placemark2 = init_my_placemark(55.856685, 37.304923)

		function init_my_placemark(coord1, coord2) {
			let placemark = new ymaps.Placemark([coord1, coord2], {
				hintContent: 'Перейти в режим панорамы'
			}, {
				preset: 'islands#icon',
				iconColor: '#528ae7'
			});
			placemark.events.add('mouseenter', function (e) {
				e.get('target').options.set('iconColor', '#ff0000');
			});
			
			placemark.events.add('mouseleave', function (e) {
				e.get('target').options.set('iconColor', '#528ae7');
			});
			
			placemark.events.add('click', function () {
				let locateRequest = ymaps.panorama.locate([coord1, coord2]);
				locateRequest.then(
					function (panoramas) {
						if (panoramas.length) {
							let panoram = document.getElementById('panoram');
							let map = document.getElementById('map');
							map.classList.add('map-hidden'); // Скрываем карту
							panoram.classList.remove('map-hidden'); // Показываем панораму
							map.classList.remove('map-visible'); // Удаляем класс для показа карты
							panoram.classList.add('map-visible'); // Добавляем класс для показа панорамы
							let player = new ymaps.panorama.Player('panoram', panoramas[0], {
								direction: [0, -50]
							});
							player.events.add('destroy', function () {
								map.classList.remove('map-hidden'); // Показываем карту при выходе из режима панорамы
								panoram.classList.add('map-hidden'); // Скрываем панораму при выходе из режима панорамы
							});
						} else {
							console.log("В заданной точке нет панорам.");
						}
					}
				)
			});
			map.geoObjects.add(placemark);
			return placemark
		}
		
	}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
//* checker
function checker() {
	let flag = true
	let email = document.getElementById("email").value
	if (!(email.indexOf("@") >= 0 && email.indexOf(".")) || email.length < 7) {
		document.getElementById('email-wrap').classList.add('required')
		flag = false
	}
	else {
		document.getElementById('email-wrap').classList.remove('required')
	}
	let phone = document.getElementById('phone').value.replace(/\D/g, '');
	if (phone.length < 11) {
		document.getElementById('phone-wrap').classList.add('required')
		flag = false
	}
	else {
		document.getElementById('phone-wrap').classList.remove('required')
	}
	let name = document.getElementById('name').value
	if (name.length < 1) {
		document.getElementById('name-wrap').classList.add('required')
		flag = false
	}
	else {
		document.getElementById('name-wrap').classList.remove('required')
	}

	//* email sending
	if (flag) {
		$(function() {
			
			//E-mail Ajax Send
			$("form").submit(function() { //Change
				var th = $(this);
				$.ajax({
					type: "POST",
					url: "mail.php", //Change
					data: th.serialize()
				}).done(function() {
					alert("Thank you!");
					document.getElementById('message').classList.add('map-visible')
					document.getElementById('form').classList.add('map-hidden')
					setTimeout(() => { window.location.href = "index.html"; }, 3000);
				});
				return false;
			});	
		});
	}
}

//* hamburger
function my_lstn() {
    document.getElementById('line1').classList.toggle('line1-action')
    document.getElementById('line2').classList.toggle('line2-action')
    document.getElementById('line3').classList.toggle('line3-action')
    document.getElementById('menu').classList.toggle('menu-action')
}