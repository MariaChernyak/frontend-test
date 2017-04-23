var currentDate = new Date();
var date = new Date();
var actionDate = new Date();
drawing(0);
var editForm = document.getElementById('edit-form');
//количество дней в каждом месяце
function getDays(month, year){
	var ar = [];
	ar[0] = 31 // Январь
	ar[1] = (isLeapYear(year)) ? 29 : 28 // Февраль
	ar[2] = 31 // Март
	ar[3] = 30 // Апрель
	ar[4] = 31 // Май
	ar[5] = 30 // Июнь
	ar[6] = 31 // Июль
	ar[7] = 31 // Август
	ar[8] = 30 // Сентябрь
	ar[9] = 31 // Октябрь
	ar[10] = 30 // Ноябрь
	ar[11] = 31 // Декабрь
	return ar[month]
}
//проверка високосности года
function isLeapYear(year)
{
 if ((year % 4 == 0 && year % 100) || year % 400 == 0){
 	 return true; // Является високосным годом
 } 
 else{
 	return false; // не является високосным годом
 } 
}
//название месяца
function getMonthName(month){
	var ar = [];
	ar[0] = "Январь"
	ar[1] = "Февраль"
	ar[2] = "Март"
	ar[3] = "Апрель"
	ar[4] = "Май"
	ar[5] = "Июнь"
	ar[6] = "Июль"
	ar[7] = "Август"
	ar[8] = "Сентябрь"
	ar[9] = "Октябрь"
	ar[10] = "Ноябрь"
	ar[11] = "Декабрь"
	return ar[month];
}
function getMonthNumber(month){
	switch(month){
		case 'января': return 0;
		case 'февраля': return 1;
		case 'марта': return 2;
		case 'апреля': return 3;
		case 'мая': return 4;
		case 'июня': return 5;
		case 'июля': return 6;
		case 'августа': return 7;
		case 'сентября': return 8;
		case 'октября': return 9;
		case 'ноября': return 10;
		case 'декабря': return 11;
	}
}
function drawing(value){
	var month = date.getMonth();
	var firstDay = date;
	firstDay.setDate(1);
	
	var monthBlock = document.querySelector('.month');

	if(month && month < 11){
		month += value;
		date.setMonth(month);
	}
	else{
		if(!month){
			if(value == -1){
				month = 11;
				date.setFullYear(date.getFullYear() -1);
			}
			else{
				month += value;
			}
			
			date.setMonth(month);
			
		}
		if(month ==11 ) {
			if(value == 1){
				month = 0;
				date.setFullYear(date.getFullYear() +1);
			}
			else{
				month += value;
			}
			date.setMonth(month);
			
		}
	}

	var days = document.getElementsByClassName('day');
	monthBlock.innerText = getMonthName(month) + ", " + date.getFullYear();
	
	 var day = 0; 
	 //предыдущий месяц
	if(firstDay.getDay() > 1 || firstDay.getDay() == 0){
		 if(month){
		 	day = getDays(month-1, date.getFullYear());
		 }
		 else{
		 	day = getDays(11, date.getFullYear() - 1);
		 }
		
		for(var i = firstDay.getDay() - 2; i >= 0 ||i == -2; i--){
			if(i<0){ i = 5}
			 days[i].querySelector('.date').innerText = day;
			 days[i].classList.remove('current');
			 day --;
		}
	}
	//текущий месяц
	day = 1;
	
		for(var i = firstDay.getDay() - 1; day <= getDays(month, date.getFullYear()) ; i++){
			if(i== -1){ i = 6}
			if(i < 35 ){
				days[i].querySelector('.date').innerText = day;
				days[i].classList.remove('current');
			}
			day++;
			
		}
	//следующий месяц
	day = 1;
	for(var i = getDays(month, date.getFullYear()) + firstDay.getDay() -1; i < 35; i++){
		if(firstDay.getDay() == 0){
			i = getDays(month, date.getFullYear()) + 5;
			if(i>=35){
				break;
			}
		}
		days[i].querySelector('.date').innerText = day;
		days[i].classList.remove('current');
		day++;
	}

	if(date.getMonth() == currentDate.getMonth() && date.getFullYear() == currentDate.getFullYear()){
		
		days[firstDay.getDay() + currentDate.getDate()-2].classList.add('current');
	}
}

//динамика
var calendar = document.getElementById('calendar');
var a = document.getElementsByTagName('a');
for(var i = 0; i< a.length; i++){
	a[i].addEventListener('click', function(e){
		e.preventDefault();
	})
}

var navigation = document.querySelector('.navigation');
function prev(){
	value = -1;
	drawing(value);
}
function next(){
	value = 1;
	drawing(value);
}

navigation.querySelector('.prev').addEventListener('click', prev);
navigation.querySelector('.next').addEventListener('click', next);
//закрытие форм
var closeForm = document.getElementsByClassName('close');
for(var i = 0; i < closeForm.length; i++){
	closeForm[i].addEventListener('click', function(){
		this.parentNode.style.display = 'none';
	})
}
document.getElementById('create-button').addEventListener('click', function(){
	document.getElementById('create-form').style.display = "block";
})
//выделение выбранного элемента
var days = document.getElementsByClassName('day');
for (var i = 0; i < days.length; i++) {
	days[i].addEventListener('click', function(e){
		for(var i = 0; i < days.length; i++){
				if(days[i].classList.contains('active')){
					days[i].classList.remove('active');
				}
		}
		this.classList.add('active');
		actionDate.setDate(this.querySelector('.date').innerText);
		actionDate.setMonth(currentDate.getMonth());
		actionDate.setFullYear(currentDate.getFullYear());
	});
	days[i].addEventListener('click', displayForm);
}

//добавление события
var createForm = document.getElementById('create-form');
var actions = [];
function addEvent(e){

	e.preventDefault();
	
	var str = createForm.querySelector('input').value;
	if(str != ""){
		var str = str.split(',');
		var regularMonth = /\s[а-яА-Я]+/;
		var action = {
			date: parseInt(str[0]),
			month: getMonthNumber(str[0].match(regularMonth)[0].trim()),
			time: str[1],
			event: str[2]

		}
		actions.push(action);
		createForm.querySelector('input').value = '';
		createForm.style.display = "none";
		drawingActions(action);
	}
}
function drawingActions(action){
	if(action.month == date.getMonth()){
		var days = document.getElementsByClassName('day');
		for(var i = 0; i < 35; i++ ){
			console.log(days[i].querySelector('.date').innerText);
			console.log(action.date);
			if(days[i].querySelector('.date').innerText == action.date){
				days[i].classList.add('action');
				var div = document.createElement('div');
				var event = document.createElement('p');
				event.classList.add('event');
				event.innerText = action.event;
				div.appendChild(event);
				var time = document.createElement('p');
				time.innerText = action.time;
				div.appendChild(time);
				days[i].appendChild(div);
			}
		}
	}
}
function refresh(){
	var days = document.getElementsByClassName('day');
	for(var i = 0; i< 35; i++){

	}
}
function topSize(e){
	 var top = 0;
	while(e.offsetParent!= calendar.offsetParent){
		top = e.offsetTop;
		e = e.offsetParent;
	}
	return top;
}
function leftSize(e){
	var left = 0;
	while(e.offsetParent!= calendar.offsetParent){
		left = e.offsetLeft;
		e = e.offsetParent;
	}
	return left;
}
function displayForm(){
	
	editForm.style.display = "block";
	if(leftSize(this)< 500){
		editForm.style.left = leftSize(this)+195 +"px";
	}
	else{
		editForm.style.left = leftSize(this) - 270 +"px";
	}
	if(topSize(this) < 350){
		editForm.style.top = topSize(this) + 30 +"px";
	}
	else{
		if(topSize(this) > 400){
			
			editForm.style.top = topSize(this) -150 +"px";
		}
		else{
			editForm.style.top = topSize(this) -50 +"px";
		}
	
	}
	// this.offsetLeft;
}
createForm.querySelector('button').addEventListener('click', addEvent);

editForm.querySelector('.submit').addEventListener('click',function(){})
function editAction(){
	// for(var i = 0; i < actions.length; i++){
	// 	if(actions[i].date == this)
	// }
}