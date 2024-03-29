url = "https://script.google.com/macros/s/AKfycbxJ7duZLgYz0kI2pq2Xu6iIGNPFHV9e_pSqd1fanrHJaa83pKeowQh9BxpZ9mQ7CI4/exec";
mode = "";
function data_road(){
    document.getElementById("all1").style.opacity = 1;
    document.getElementById("all1").style.display = "block";
    document.getElementById("all2").style.opacity = 0;
    document.getElementById("all2").style.display = "none";
fetch(url,{
    "method":"get",
    "mode":"cors"
})
.then(response=>{
    if(response.ok){
        return response.json();
    }
})
.then(resJson =>{
    //画面切り替え
    document.getElementById("all1").style.opacity = 0;
    document.getElementById("all1").style.display = "none";
    document.getElementById("all2").style.opacity = 1;
    document.getElementById("all2").style.display = "block";
    console.log(JSON.stringify(resJson));
    var status = resJson[0];
    mode = resJson[1];
    try{
        var message = resJson[2];
        if(message == undefined){
            message = "メッセージはありません";
        }
    }
    catch{
        var message = "メッセージはありません";
       console.log("メッセージはありません")
    }
    document.getElementById("text").innerHTML = message;
    console.log("status:"+status);
    console.log("mode:"+mode);
    
    //onの場合
    if(status == "on"){
     document.getElementById("body").style.backgroundColor = "#fed65dd2";
     document.getElementById("img1").style.opacity = 1;
     document.getElementById("img2").style.opacity = 0;
    }
    //offの場合
    else if(status = "off"){
     document.getElementById("body").style.backgroundColor = "#929292d2";
     document.getElementById("img1").style.opacity = 0;
     document.getElementById("img2").style.opacity = 1;
    }
    //その他
    else{
     alert("予期せぬエラーが発生しました")
     document.getElementById("text").innerHTML = "予期せぬエラーが発生しました";
    }
     //時間変更処理
 var time = new Date();
 var hour = time.getHours();
 var minute = time.getMinutes();
 time = hour+":"+minute;
 document.getElementById("time2").innerHTML = time;
 check();
})

}
time_data = '';
function check(){
    console.log("mode:"+mode)
    if(mode == "home"){
        control = setInterval(()=>{
            console.log("check2")
            clearInterval(branch_t);
            location.href = "https://matsuoka18.github.io/home-control/index.html"
        },600000)
        time_data = 600000;
      //600000
    }else if(mode == "leave"){
      
      control = setInterval(()=>{
        console.log("check2")
        clearInterval(branch_t);
        location.href = "https://matsuoka18.github.io/home-control/index.html"
    },1800000)
    time_data = 1800000;
    }else{
      
      control = setInterval(()=>{
        console.log("check2")
        clearInterval(branch_t);
        location.href = "https://matsuoka18.github.io/home-control/index.html"
    },3600000)
    time_data = 3600000;
    }
    var data = [{
      "branch":"time"
    }];
    var params = {
        "method":"post",
        "mode":"no-cors",
        "Content-Type":"application/json",
        "body":JSON.stringify(data)
        }
    fetch(url,params);
    count();
}
branch_t = '';
function count(){
    time_data = time_data/1000;
    branch_t = setInterval(count2,1000);
}
function count2(){
    time_data--;
    document.getElementById("time3").innerHTML = time_data+"sec";
}
//1800000