function onButtonClick() {
    target = document.getElementById("output");
    var num = target.innerText = document.forms.form_id.text_box_id.value;
    if(num == 16){
        var doc0= document.getElementById("judgment");  
        doc0.innerHTML= "Correct!"; 
    } else {
        var doc0= document.getElementById("judgment");  
        doc0.innerHTML= "Wrong！"; 
    }
    target.innerText = num;
}
