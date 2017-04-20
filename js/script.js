
var a = document.getElementsByTagName('a');
for(var i = 0; i< a.length; i++){
	a[i].addEventListener('click', function(e){
		e.preventDefault();
	})
}
var closeForm = document.getElementsByClassName('close');
for(var i = 0; i < closeForm.length; i++){
	closeForm[i].addEventListener('click', function(){
		this.parentNode.style.display = 'none';
	})
}
document.getElementById('create-button').addEventListener('click', function(){
	document.getElementById('create-form').style.display = "block";
})