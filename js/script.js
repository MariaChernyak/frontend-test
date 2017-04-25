var currentDate = new Date();
var date = new Date();
var actionDate = new Date();
var actions = [];
actions[0] = {
	event: "Встреча",
	partner: "Василий Пупкин",
	id: 20170320
}
drawing(0);
var editForm = document.getElementById('edit-form');
document.getElementById('refresh').addEventListener('click', refresh);
var calendar = document.getElementById('calendar');
var a = document.getElementsByTagName('a');

for(var i = 0; i< a.length; i++){
	a[i].addEventListener('click', function(e){
		e.preventDefault();
	})
}

var navigation = document.querySelector('.navigation');
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

createForm.querySelector('button').addEventListener('click', addEvent);
editForm.querySelector('.submit').addEventListener('click', editAction);
editForm.querySelector('.delete').addEventListener('click', deleteFunction);

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
function getMonthNames(month){
	var ar = [];
	ar[0] = "января"
	ar[1] = "февраля"
	ar[2] = "марта"
	ar[3] = "апреля"
	ar[4] = "мая"
	ar[5] = "июня"
	ar[6] = "июля"
	ar[7] = "августа"
	ar[8] = "сентября"
	ar[9] = "октября"
	ar[10] = "ноября"
	ar[11] = "декабря"
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
	clean();
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
		var subMonth = month;
		var subYear =date.getFullYear();
		 if(month){
		 	day = getDays(month-1, date.getFullYear());
		 	subMonth--;
		 }
		 else{
		 	day = getDays(11, date.getFullYear() - 1);
		 	subMonth = 11;
		 	subYear--;
		 }
		
		for(var i = firstDay.getDay() - 2; i >= 0 ||i == -2; i--){
			if(i<0){ i = 5}
			 days[i].querySelector('.date').innerText = day;
			 days[i].classList.remove('current');
			 days[i].setAttribute("id", getId(subYear, subMonth, day) );
			 day --;
		}
	}
	//текущий месяц
	day = 1;
	
		for(var i = firstDay.getDay() - 1; day <= getDays(month, date.getFullYear()) ; i++){
			if(i== -1){ i = 6}
			if(i < 35 ){
				days[i].querySelector('.date').innerText = day;
				days[i].setAttribute("id", getId(date.getFullYear(), month, day) );
				days[i].classList.remove('current');
			}
			day++;
			
		}
	//следующий месяц
	day = 1;
	for(var i = getDays(month, date.getFullYear()) + firstDay.getDay() -1; i < 35; i++){
		var subMonth = month;
		var subYear = date.getFullYear();
		if(firstDay.getDay() == 0){
			i = getDays(month, date.getFullYear()) + 5;
			if(i>=35){
				break;
			}
		}
		if(month == 11){
			subMonth = 0;
			subYear++;
		}
		else{
			subMonth ++;
		}
		days[i].querySelector('.date').innerText = day;
		days[i].classList.remove('current');
		days[i].setAttribute("id", getId(subYear, subMonth, day) );
		day++;
	}

	if(date.getMonth() == currentDate.getMonth() && date.getFullYear() == currentDate.getFullYear()){
		
		days[firstDay.getDay() + currentDate.getDate()-2].classList.add('current');
	}
	displayAction()
}


function prev(){
	value = -1;
	drawing(value);
}
function next(){
	value = 1;
	drawing(value);
}

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
			event: str[2],

		}
		if(isFinite(action.date) && isFinite(action.month)){
			if(action.month >=0 && action.month < 12){
				if(action.date > 0 && action.date <= getDays(action.month, date.getFullYear())){
					action.id = getId(date.getFullYear(), action.month, action.date);
					actions.push(action);
					drawingActions(action);
				}
					
			}
		}
		
		createForm.querySelector('input').value = '';
		createForm.style.display = "none";
		
	}
}
function drawingActions(action){
	var days = document.getElementsByClassName('day');
	for(var i = 0; i < 35; i++){
		if(action.id == days[i].id){
			days[i].classList.add('action');
			var div = days[i].querySelector('div');
			if(div == null){
				var div = document.createElement('div');
			}
			else{
				div.innerHTML = "";
			}
				var event = document.createElement('p');
				if(typeof action.event != 'undefined'){
					event.classList.add('event');
					event.innerText = action.event;
					div.appendChild(event);
				}
				var time = document.createElement('p');
				if(typeof action.time != 'undefined'){
					time.innerText = action.time;
					div.appendChild(time);
				}
				var partner = document.createElement('p');
				if(typeof action.partner != 'undefined'){
					partner.innerText = action.partner;
					div.appendChild(partner);
				}
								
				var description = document.createElement('p');
				if(typeof action.description != 'undefined'){
					description.innerText = action.description;
					div.appendChild(description);
				}
				
				days[i].appendChild(div);
		}
	}
}
function refresh(){
	
	var days = document.getElementsByClassName('day');
	for(var i = 0; i< 35; i++){
		var day = days[i].getElementsByTagName('div');
		days[i].classList.remove('action');
		if(day.length){
			for(var i = 0; i< day.length; i++){
				day[i].outerHTML = ""
			}
		}
	}
	actions.length = 0;
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
	editForm.setAttribute('id', this.id +'f');
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
		var id = parseInt(editForm.id);
			var str = "<p class='date'>" + id%100 + " ";
			id = parseInt(id/100);
			str += getMonthNames(id%100) + "</p>"
			editForm.querySelector('.date').outerHTML = str;
			editForm.querySelector('.event').outerHTML = "<input class='event' type='text' name='text' placeholder='Событие'>";
			editForm.querySelector('.partner').outerHTML = "<input class='partner' type='text' name='text' placeholder='Имена участников'>";
			editForm.querySelector('.description').outerHTML = "<textarea class='description' placeholder='Описание'></textarea>";
	for(var i = 0; i < actions.length; i++){

		if(editForm.id == actions[i].id +'f'){
			
			if(typeof(actions[i].event) != 'undefined' && actions[i].event !=null && actions[i].event != ""){
				editForm.querySelector('.event').outerHTML = "<p class='event'>" + actions[i].event + "</p>";
			}			
			if(typeof(actions[i].partner) != 'undefined' && actions[i].partner !=null && actions[i].event != ""){
				editForm.querySelector('.partner').outerHTML = "<p class='partner'>" + actions[i].partner + "</p>";
			}
			if(typeof(actions[i].description) != 'undefined' && actions[i].description !=null && actions[i].description != ""){
				editForm.querySelector('.description').outerHTML = "<p class='description'>" + actions[i].description + "</p>";
			}
		}
	}
}

function editAction(){
	var el = document.getElementById(parseInt(this.parentNode.id));
	this.parentNode.style.display = 'none';
	if(!actions.length){
		if(el.querySelector('div') == null ){
			var action = {};
			action.id = parseInt(this.parentNode.id);
			if(this.parentNode.querySelector('.event').value != "" && typeof(this.parentNode.querySelector('.event').value) != 'undefined'){
				action.event = this.parentNode.querySelector('.event').value;
			}	
			if(this.parentNode.querySelector('.partner').value != "" && typeof(this.parentNode.querySelector('.partner').value) != 'undefined'){
				action.partner = this.parentNode.querySelector('.partner').value;
			}	
			if(this.parentNode.querySelector('.description').value != "" && typeof(this.parentNode.querySelector('.description').value) != 'undefined'){
				action.description = this.parentNode.querySelector('.description').value;
			}	
		}
		actions.push(action);
		drawingActions(action);
	}
	else{
		for(var i = 0; i < actions.length; i++){
			var flag = 0;	
			if((actions[i].id +'f') == this.parentNode.id){
				flag++;
				if(this.parentNode.querySelector('.event').value != "" && typeof(this.parentNode.querySelector('.event').value) != 'undefined'){
					actions[i].event = this.parentNode.querySelector('.event').value;
				}	
				if(this.parentNode.querySelector('.partner').value != "" && typeof(this.parentNode.querySelector('.partner').value) != 'undefined'){
					actions[i].partner = this.parentNode.querySelector('.partner').value;
				}	
				if(this.parentNode.querySelector('.description').value != "" && typeof(this.parentNode.querySelector('.description').value) != 'undefined'){
					actions[i].description = this.parentNode.querySelector('.description').value;
				}	
				drawingActions(actions[i]);
				break;

			}
		}
	if(!flag){
		var action = {};
		action.id = parseInt(this.parentNode.id);
		if(this.parentNode.querySelector('.event').value != "" && typeof(this.parentNode.querySelector('.event').value) != 'undefined'){
			action.event = this.parentNode.querySelector('.event').value;
		}	
		if(this.parentNode.querySelector('.partner').value != "" && typeof(this.parentNode.querySelector('.partner').value) != 'undefined'){
			action.partner = this.parentNode.querySelector('.partner').value;
		}	
		if(this.parentNode.querySelector('.description').value != "" && typeof(this.parentNode.querySelector('.description').value) != 'undefined'){
			action.description = this.parentNode.querySelector('.description').value;
		}
		actions.push(action);
			drawingActions(action);	
		}
	}	
	

}
function getId(year, month, date){
	var str = year;
	if(parseInt(month/10) == 0){
		str = "" +str + "0" +month;
	}
	else{
		str = "" + str + month;
	}
	if(parseInt(date/10) == 0){
		str = "" +str + "0" + date;
	}
	else{
		str = "" + str + date;
	}
	return str;
}
function clean(){
	var days = document.getElementsByClassName('day');
	for(var i = 0; i< 35; i++){
		if(days[i].querySelector('div') != null){
			days[i].querySelector('div').outerHTML = "";
		}
	
		days[i].classList.remove('action');
	}
}
function displayAction(){
	for(var i =0; i< actions.length; i++){
		drawingActions(actions[i]);
	}
}
function deleteFunction(){
	for(var i = 0; i < actions.length; i++){
		if(actions[i].id == parseInt(this.parentNode.id)){
			actions.splice(i, 1);
			break;
		}
	}
	var el = document.getElementById(parseInt(this.parentNode.id));
	if(el.querySelector('div') != null){
		el.querySelector('div').outerHTML ="";
	}
	this.parentNode.style.display = 'none';
	el.classList.remove('action');
}