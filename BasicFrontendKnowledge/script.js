function onButtonClick() {
    target = document.getElementById("output");
    var num = target.innerText = document.forms.form_id.text_box_id.value;
    console.log(num);
    if(num == 14){
        var doc0= document.getElementById("div0");  
        doc0.innerHTML= "正解！"; 
    } else {
        var doc0= document.getElementById("div0");  
        doc0.innerHTML= "不正解！"; 
    }
    target.innerText = num;
}
