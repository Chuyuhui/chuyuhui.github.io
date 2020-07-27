function able(){
  document.getElementById("next_mouse").disabled = false; document.getElementById("next_stage").disabled = false;
}
function auto(){

  for(t=0;t<20;t++) {
    recordScore(3);
    if(t<19) buttonNextADJ();
  }
  //buttonNextADJ();
  //submitForm();
}
function getAbsPos(el) {
  var rect=el.getBoundingClientRect();
  return {x:rect.left,y:rect.top};
}

function copyUrl(value) {
    var tempInput = document.createElement("input");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}
$(function(){
  var onoff=false;
  var image;
  $(".mousePic").attr("title","點擊圖片可放大");
  $(".mousePic").click(function(){
    image = this;

    var $img=$("<img />",{
      src:this.src,
      height:this.height*1.5,
      width:this.width*1.5,
      top:getAbsPos(this).top,
      left:getAbsPos(this).left,
      title:"再點擊一次縮小"
    });
    this.style.display = "none";
    $("#enlarge_"+this.id).html($img);
  });
  $(".enlargePic").click(function(){
    image.style.display = "";
    $(this).html("");
  });
});



var password = ['0110','0220','0330','0440','0550','0660','0770','0880','0990','1001','1111','1221','1331','1441','1551','1661','1771','1881','1991','2002','2112','2222','2332','2442','2552','2662','2772','2882','2992','3003'];
var participant;
var stage=1;
var mouse_order = 1;
var mouse_sample = [
  ['G01','G02','G03','G04'],      // #01
  ['G01','G02','G04','G03'],      // #02
  ['G01','G03','G02','G04'],      // #03
  ['G01','G03','G04','G02'],      // #04
  ['G01','G04','G02','G03'],      // #05
  ['G01','G04','G03','G02'],      // #06
  ['G02','G01','G03','G04'],      // #07
  ['G02','G01','G04','G03'],      // #08
  ['G02','G03','G01','G04'],      // #09
  ['G02','G03','G04','G01'],      // #10
  ['G02','G04','G01','G03'],      // #11
  ['G02','G04','G03','G01'],      // #12
  ['G03','G01','G02','G04'],      // #13
  ['G03','G01','G04','G02'],      // #14
  ['G03','G02','G01','G04'],      // #15
  ['G03','G02','G04','G01'],      // #16
  ['G03','G04','G01','G02'],      // #17
  ['G03','G04','G02','G01'],      // #18
  ['G04','G01','G02','G03'],      // #19
  ['G04','G01','G03','G02'],      // #20
  ['G04','G02','G01','G03'],      // #21
  ['G04','G02','G03','G01'],      // #22
  ['G04','G03','G01','G02'],      // #23
  ['G04','G03','G02','G01'],      // #24
  ['G01','G02','G03','G04'],      // #25
  ['G02','G04','G01','G03'],      // #26
  ['G03','G01','G04','G02'],      // #27
  ['G04','G03','G02','G01'],      // #28
  ['G01','G03','G04','G02'],      // #29
  ['G04','G02','G03','G01']       // #30
];
var q_order = 1;
var q_first =[
  ['L','L'],      // #01
  ['L','L'],      // #02
  ['L','L'],      // #03
  ['L','L'],      // #04
  ['L','V'],      // #05
  ['L','V'],      // #06
  ['L','V'],      // #07
  ['L','V'],      // #08
  ['L','V'],      // #09
  ['L','V'],      // #10
  ['V','V'],      // #11
  ['V','V'],      // #12
  ['V','V'],      // #13
  ['V','V'],      // #14
  ['V','L'],      // #15
  ['V','L'],      // #16
  ['V','L'],      // #17
  ['V','L'],      // #18
  ['V','L'],      // #19
  ['V','L'],      // #20
  ['L','L'],      // #21
  ['L','L'],      // #22
  ['L','L'],      // #23
  ['L','L'],      // #24
  ['L','V'],      // #25
  ['V','V'],      // #26
  ['V','V'],      // #27
  ['V','V'],      // #28
  ['V','V'],      // #29
  ['V','L']      // #30
];
/*
  var mouse_img_url = [
    ['G01',"https://imgur.com/DfDHgo3.png"],   //靜音亮 G01
    ['G02',"https://imgur.com/A3KoR9N.png"],   //靜音霧 G02
    ['G03',"https://imgur.com/oXN5QL5.png"],   //有聲亮 G03
    ['G04',"https://imgur.com/uyl6yof.png"]];  //有聲霧 G04
  var mouse_video_url = [
    ['G01',"1"],   //靜音亮 G01
    ['G02',"2"],   //靜音霧 G02
    ['G03',"3"],   //有聲亮 G03
    ['G04',"4"]];  //有聲霧 G04
  var mouse_description_url = [
    ['G01',"https://imgur.com/5HZKPm1.png"],   //靜音亮 G01
    ['G02',"https://imgur.com/F3yvUDn.png"],   //靜音霧 G02
    ['G03',"https://imgur.com/GfLrtfL.png"],   //有聲亮 G03
    ['G04',"https://imgur.com/pFrmyT9.png"]];  //有聲霧 G04
    */

/*順序：img vid des*/
var mouse_media_url = [
  ['G01',"https://imgur.com/JKzJqwW.png","https://youtube.com/embed/BnYSWKm9caI","https://imgur.com/nYRA7BN.png"],   //靜音亮 G01
  ['G02',"https://imgur.com/bGjgjHX.png","https://youtube.com/embed/rlCQnh7jfvo","https://imgur.com/sgP7wyI.png"],   //靜音霧 G02
  ['G03',"https://imgur.com/6oQMH1g.png","https://youtube.com/embed/kz5nh7_h3z4","https://imgur.com/V4KqnSQ.png"],   //有聲亮 G03
  ['G04',"https://imgur.com/gg0FxHy.png","https://youtube.com/embed/MDPhWTU3Wn4","https://imgur.com/eGmqzbO.png"]];  //有聲霧 G04

var time_used=0;
var startExp;
$(function(){
  startExp = new Date().getTime();

});

function countDown(){
  document.getElementById("container_countdown").style.display = '';
  document.getElementById("container_MediaAndQuestionnaire").style.display = 'none';
  document.getElementById("container_questionnaire").style.display = 'none';

  var start = new Date().getTime();

  //記錄總填寫時間用
  time_used = start - startExp + 1000 * 60 * 5;

  // Set the date we're counting down to
  var countDownDate = new Date(start + 1000 * 60 *5 + 5000);
  //var countDownDate = new Date(start + 5000 + 5000);

  var fiveminutes = false;
  // Update the count down every 1 second
  var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    // Find the distance between now and the count down date

    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor(((distance - 5000) % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor(((distance - 5000) % (1000 * 60)) / 1000);

    if(minutes < 10){
      minutes = "0" + minutes;
    }
    if(seconds < 10){
      seconds = "0" + seconds;
    }
    // Display the result in the element with id="countdown"
    if(fiveminutes == false) {
      document.getElementById("countdown").innerHTML = "等待時間："
        + minutes + " 分 " + seconds + " 秒";
    }
    // If the count down is finished, write some text

    if (distance < 5000 && fiveminutes == false) {
      fiveminutes = true;
      document.getElementById("container_countdown").innerHTML = "<br>已經過5分鐘，可以開始階段二。<br>"
      var sound = document.getElementById("audio");
      sound.play();
    }

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("container_countdown").style.display = 'none';
      document.getElementById("container_MediaAndQuestionnaire").style.display = '';
      document.getElementById("container_questionnaire").style.display = '';
    }
  }, 1000);
}  

function recordTime(){
  var endExp = new Date().getTime();
  // Set the date we're counting down to
  time_used += endExp - startExp;
  var minutes = Math.floor((time_used % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((time_used % (1000 * 60)) / 1000);

  if(minutes < 10){
    minutes = "0" + minutes;
  }
  if(seconds < 10){
    seconds = "0" + seconds;
  }
  // Display the result in the element with id="countdown"
  //alert("填答花費時間（含五分鐘等待）："+ minutes + " 分 " + seconds + " 秒");
}  


function validation(){
  var pw = document.getElementById("password").value;
  for(i=0;i<30;i++){
    if(password[i] == pw){
      participant = i+1;
      document.getElementById("iframe_basic_info").src = "https://docs.google.com/forms/d/e/1FAIpQLScwGzpfygS33NrfSBvIhCaAn8S1SaFg9Vcy5kJ9xZp6TXY9gA/viewform?usp=pp_url&entry.592112992=" + participant;
      document.getElementById("iframe_ADJ_corresponding").src = "https://docs.google.com/forms/d/e/1FAIpQLScaDcVsJ-ftDVqsE7UaVKzvh4iQn-CFMu42l3WbWQI6Mz_TFQ/viewform?usp=pp_url&entry.793241340=" + participant;
      document.getElementById("div_password").style.display="none";
      document.getElementById("container_basic").style.display ="";
      break;
    }
  }
  if(!participant) alert("密碼錯誤！");
  return;
}
function showBasicInfo(){
  document.getElementById('welcome').style.display = 'none';
  document.getElementById('basic_info').style.display = '';
  $('html,body').animate({scrollTop:0}, 250);

}
//var to count times iframe has loaded
var timesRefreshed_basic_info = 0; // = 4 為提交
var timesRefreshed_ADJ_corresponding = 0; // = 4 為提交

function checkpost_basic_info(e){
  timesRefreshed_basic_info++;
  if(timesRefreshed_basic_info>2 && timesRefreshed_basic_info<4) $('html,body').animate({scrollTop:0}, 500);
  if(timesRefreshed_basic_info>=4) {
    document.getElementById("buttonshowADJCorresponding").disabled = false;
    $('html,body').animate({scrollTop:$(document).height()}, 500);
  }
}

function checkpost_ADJ_corresponding(e){
  timesRefreshed_ADJ_corresponding++;
  if(timesRefreshed_basic_info>2 && timesRefreshed_basic_info<4) $('html,body').animate({scrollTop:0}, 500);
  if(timesRefreshed_ADJ_corresponding>=4) {
    document.getElementById("startstage_1").disabled = false;
    $('html,body').animate({scrollTop:$(document).height()}, 500);
  }
}
function showADJCorresponding(){

  document.getElementById('basic_info').style.display = 'none';
  document.getElementById('ADJ_corresponding').style.display = '';
  $('html,body').animate({scrollTop:0}, 500);
}
function loadMediaAndData(){
  if(stage==1){

    for(i=0;i<4;i++){
      if(mouse_sample[participant-1][mouse_order-1] == mouse_media_url[i][0]){
        document.getElementById("stage_1_mouse_image").src = mouse_media_url[i][1];
        break;
      }
    }
  }
  else if(stage==2){
    for(i=0;i<4;i++){
      if(mouse_sample[participant-1][mouse_order-1] == mouse_media_url[i][0]){
        //document.getElementById("stage_2_mouse_image").src =  mouse_media_url[i][1];
        $('#stage_2_mouse_video').attr('src', mouse_media_url[i][2]);
        document.getElementById("stage_2_mouse_description").src =  mouse_media_url[i][3];
        break;
      }
    }
  }
  changeQuestionnaire();
}
function changeMouse(){
  if(mouse_order<4){
    mouse_order++;
    loadMediaAndData();
    doForwards_STAGE();
    if(mouse_order==4){
      document.getElementById("next_mouse").disabled = true;
      document.getElementById("next_stage").disabled = false;
    }
  }
  //for(i=0;i<2;i++) $('#iframe_Q'+i).attr('src', $('#iframe_Q'+i).attr('src'));
  $('html,body').animate({scrollTop:$('#container_questionnaire').offset().top}, 500);
}
function loadStage(){

  if(stage==1) document.getElementById("container_basic").style.display ="none";
  loadMediaAndData();

  document.getElementById("interaction").style.display="";
  document.getElementById('container_stage').style.display = '';
  document.getElementById("container_questionnaire").style.display = '';
  document.getElementById("container_SD").style.display="none";
  document.getElementById("div_stage_end").style.display="none";

  var stage_elements = document.getElementsByClassName("stage_"+stage);
  for(i=0;i<stage_elements.length;i++) stage_elements[i].style.display = "";
  var close_elements = document.getElementsByClassName("stage_"+(stage % 2+1));
  for(i=0;i<close_elements.length;i++) close_elements[i].style.display = "none";
  $('html,body').animate({scrollTop:0}, 500);
}

function changeStage(){
  mouse_order = 1;
  stage++;
  for(var l=1;l<g_maxVal_STAGE;l++) doBackwards_STAGE();
  document.getElementById("finish_SD").style.display = "none";
  document.getElementById("container_SD").style.display = "none";
  document.getElementById("next_mouse").disabled = false;
  document.getElementById("next_stage").disabled = true;
  loadStage();
  countDown();
}

//淨空填畢問卷，並自動填入問卷資料
function changeQuestionnaire(){ //participant, stage, order, sample, scale
  //alert(participant +" "+ stage +" "+ mouse_order +" "+ mouse_sample[participant-1][mouse_order-1] +" "+ q_order);

  //重置ADJ分數，不可放在submitForm()，否則會報錯
  for(k=0;k<ADJ_Score.length;k++){
    ADJ_Score[k] = null;
    if(ADJ_i!=1) buttonBackADJ();}

  document.getElementById("part_ADJ").style.display = 'none';
  var scaleType_elements = document.getElementsByClassName(scaleType);
  for(var i = 0; i < scaleType_elements.length; i++) scaleType_elements[i].style.display = 'none';

  var q;
  if(q_first[participant-1][stage-1]=='L'){
    if(q_order==1)
      q = 'RadioButton';
    else
      q = 'Range';
  }
  else if(q_first[participant-1][stage-1]=='V'){
    if(q_order==1)
      q = 'Range';
    else
      q = 'RadioButton';
  }
  fillInData(true,participant,stage,mouse_order,mouse_sample[participant-1][mouse_order-1],q);
  if(q=='RadioButton'){
    for(var y=1;y<=5;y++){
      document.getElementById("ADJ_RadioButton_"+y).name = ADJ_Entry[0];
    }
  }

  document.getElementById("explanation").style.display = '';
  document.getElementById('example').style.display = '';
  document.getElementById('container_progressADJ').style.display = 'none';
  document.getElementById('finish').style.display = 'none';
  document.getElementById("fill_Q2").style.display='none';
  document.getElementById("next_mouse").style.display='none';
  document.getElementById('submit_LV').style.display = 'none';
  document.getElementById('submit_LV').disabled = true;
  if(q_order==1){
    document.getElementById("container_Q1").style.display = "";
    document.getElementById("container_Q2").style.display = "none";
    $('#Q1').after($('#SCALE'));
    //$(window).scrollTop($('#container_questionnaire').offset().top);
  }
  else {
    document.getElementById("container_Q1").style.display = "none";
    document.getElementById("container_Q2").style.display = "";
    $('#Q2').after($('#SCALE'));
    $(window).scrollTop($('#container_questionnaire').offset().top);
  }
}

/*共用，不需調整*/
function fillInData(isFilled, p, s, order, sample, scale){
  if(isFilled){
    document.getElementById('participant').value = p;
    document.getElementById('stage').value = s;
    document.getElementById('order').value = order;
    document.getElementById('sample').value = sample;
    scaleType = scale;
    showScale();
  }
}

function showScale() {
  var participant = document.getElementById('participant').value;
  var stage = document.getElementById('stage').value;
  var order = document.getElementById('order').value;
  var sample = document.getElementById('sample').value;
  if(!participant || !stage || !order || !sample || !scaleType){
    document.getElementById('no text').style.display = '';
  }
  else{
    document.getElementById('no text').style.display = 'none'; 
    document.getElementById('part_Name_Stage_Order_Sample').style.display = 'none';
    document.getElementById('part_ADJ').style.display = '';
    onLoadSetup();
  }
}

function closeNoText(){
  document.getElementById('no text').style.display = 'none'; 
}

function startAnswer() {

  document.getElementById('explanation').style.display = 'none';
  document.getElementById('example').style.display = 'none';
  document.getElementById('container_progressADJ').style.display = '';
  $(window).scrollTop($('#container_questionnaire').offset().top);
  if(scaleType=="Range") setCrossPosition();
  if(stage==2 && mouse_order==1 && q_order==1) startExp = new Date().getTime();
}

function DetectIsIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // 回傳版本 <=10 的版本
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // 回傳版本 >=11 的版本
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // 判斷Edge
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

function detectBrowser(){

  var isFirefox = navigator.userAgent.search("Firefox") > -1;
  var isOpera = navigator.userAgent.search("Opera") > -1;
  var isSafari = navigator.userAgent.search("Safari") > -1;//Google瀏覽器是用這核心

  var isIE =  DetectIsIE();

  if (isFirefox) {
    browser = 'Firefox';
  }
  if (isOpera) {
    browser = 'Opera';
  }
  if (isSafari) {
    browser = 'Safari/Chrome';
  }
  if (isIE) {
    browser = 'IE';
  }
  return browser;
}

var browser = detectBrowser();

var ADJ_i = 1;
var ADJ_Score = new Array();

/* 沒有html換行字元的版本，寬度各需8字元，min-width設20+8*2=36rem */
var ADJ_Word = [
  "小巧的","碩大的",
  "細紋路的","粗紋路的",
  "簡約的","複雜的",
  "低噪的","非低噪的",
  "有回饋的","無回饋的",
  "回饋聲音清晰的","回饋聲音不清晰的",
  "便攜的","不便攜的",
  "手感明確的","手感不明確的",
  "好按的","不好按的",
  "輕鬆掌握的","無法輕鬆掌握的",
  "舒適的","不舒適的",
  "堅固的","不堅固的",
  "輕薄的","厚重的",
  "符合人體工學的","不符合人體工學的",
  "包覆性的","非包覆性的",
  "耐髒的","不耐髒的",
  "靈敏的","不靈敏的",
  "精準的","不精準的",
  "滿意的","不滿意的",
  "想購買的","不想購買的"];



/* 有html換行字元的版本，寬度各需5字元，min-width設20+5*2=30rem */
/* 長得很怪，不用 */
/*
var ADJ_Word = [
  "小巧的","碩大的",
  "細紋路的","粗紋路的",
  "簡約的","複雜的",
  "低噪的","非低噪的",
  "有回饋的","無回饋的",
  "回饋聲音<br>清晰的","回饋聲音<br>不清晰的",
  "便攜的","不便攜的",
  "手感明確的","手感不明確的",
  "好按的","不好按的",
  "輕鬆掌握的","無法<br>輕鬆掌握的",
  "舒適的","不舒適的",
  "堅固的","不堅固的",
  "輕薄的","厚重的",
  "符合<br>人體工學的","不符合<br>人體工學的",
  "包覆性的","非包覆性的",
  "耐髒的","不耐髒的",
  "靈敏的","不靈敏的",
  "精準的","不精準的",
  "滿意的","不滿意的",
  "想購買的","不想購買的"];
*/
var ADJ_Entry = [
  "entry.511407135",
  "entry.1152870785",
  "entry.1079921585",
  "entry.927862003",
  "entry.1883799580",
  "entry.1465052067",
  "entry.985700968",
  "entry.418613732",
  "entry.94031112",
  "entry.1120322361",
  "entry.156344772",
  "entry.1428082092",
  "entry.1292637192",
  "entry.423724387",
  "entry.1755300774",
  "entry.1164985306",
  "entry.1902800109",
  "entry.814714499",
  "entry.202069723",
  "entry.31311220"];

var explanation_pic_Range_url = "https://imgur.com/zLAh7o4.png";
var explanation_pic_RadioButton_url = "https://imgur.com/wBvRcLw.png";

var example_Range_image_url=[
  "https://imgur.com/Q81cRSD.gif",  //V-不偏向
  "https://imgur.com/mqfkq3V.gif",  //V-非常樸素
  "https://imgur.com/UnjBgfS.gif"   //V-有點華麗
];

var example_RadioButton_image_url=[
  "https://imgur.com/0BLzP3q.gif",  //L-不偏向
  "https://imgur.com/K1pllpS.gif",  //L-非常樸素
  "https://imgur.com/gQaIVyd.gif"   //L-有點華麗
];

$(function(){
  for(var w=1;w<=3;w++){
    $("#example_Range_image_" + w).attr('src', example_Range_image_url[w-1]);
    $("#example_RadioButton_image_" + w).attr('src', example_RadioButton_image_url[w-1]);
  }
});

function recordScore(score){
  ADJ_Score[ADJ_i - 1] = score;
  document.getElementById('not yet').style.display = 'none';
  if (ADJ_i == 20) document.getElementById('submit_LV').disabled = false;
  var input_exist = document.getElementById("ADJSCORE_" + ADJ_i);
  if(input_exist) input_exist.value = ADJ_Score[ADJ_i-1];
  else{
    var tr = document.getElementById("tr_ADJ_hidden");
    var td = document.createElement('td');
    var input = document.createElement('input');
    input.type = "hidden";
    input.id = "ADJSCORE_" + ADJ_i;
    input.name = ADJ_Entry[ADJ_i-1];
    input.value = ADJ_Score[ADJ_i-1];
    td.appendChild(input);
    tr.appendChild(td);
  }
  setCrossPosition();
}
function buttonNextADJ() {
  /*
    var bodyRect_L = document.body.getBoundingClientRect();
    var elemRect_L = document.getElementById("ADJ_RadioButton_1").getBoundingClientRect();
    var offset_L = elemRect_L.left - bodyRect_L.left;
    alert(offset_L);
    var bodyRect_R = document.body.getBoundingClientRect();
    var elemRect_R = document.getElementById("ADJ_RadioButton_5").getBoundingClientRect();
    var offset_R   = elemRect_R.left - bodyRect_R.left;
    alert(offset_R);
    alert("length = " + offset_R-offset_L);
    */

  if(!ADJ_Score[ADJ_i - 1]) document.getElementById('not yet').style.display = '';
  else{
    document.getElementById('back').disabled = false;
    document.getElementById('next').disabled = false;
    document.getElementById('not yet').style.display = 'none';
    ADJ_i += 1;
    changeADJ();
    doForwards();
    if (ADJ_i == 20){
      document.getElementById('next').disabled = true;
      document.getElementById('submit_LV').style.display = '';
    }
  }
  return true;
}
function buttonBackADJ() {
  document.getElementById('back').disabled = false;
  document.getElementById('next').disabled = false;
  document.getElementById('not yet').style.display = 'none';
  ADJ_i -= 1;
  changeADJ();
  doBackwards();
  if (ADJ_i == 1) document.getElementById('back').disabled = true;
  return true;
}
//不清除的話題交置表單時最後顯示的那個選項會被重複填兩次
function clearInputName(){ 
  for(i=1;i<=5;i++) document.getElementById("ADJ_RadioButton_"+i).setAttribute("name","");
}

function submitForm(){
  clearInputName();

  document.getElementById("part_ADJ").style.display='none';
  document.getElementById("finish").style.display='';

  if(q_order==1) {
    document.getElementById("fill_Q2").style.display='';
    q_order++;
  }
  else{
    if(q_order==2){
      if(mouse_order==4){
        document.getElementById("div_stage_end").style.display = "";
        $('html,body').animate({scrollTop:$(document).height()}, 500);
        fillInData_SD(true,participant,stage);
      }
      else{
        document.getElementById("next_mouse").style.display='';
      }
    }
    q_order=1;
  }

  document.getElementByName('theme').submit();
}


/*共用，注意Range 跟 RadioButton不同的地方用scaleType判斷。*/
var scaleType = ""; //設定本單形式： Range / RadioButton；不指定時可用radio選擇

//設定表單目的地、解釋文字、圖片與填答格式
function onLoadSetup(){
  if(scaleType=='Range'){
    document.theme.action = "https://docs.google.com/forms/u/1/d/e/1FAIpQLSfzOo5rmqiuAGwNdBlf8TQE1Rc1ZklReffOUk4cPqqOkbBnWA/formResponse";
    document.getElementById('explanation_pic').src= explanation_pic_Range_url ;
    var Ranges = document.getElementsByClassName('Range');
    for(var i = 0; i < Ranges.length; i++) Ranges[i].style.display = '';
    document.getElementById('back').addEventListener("mousedown touchstart",()=>{setCrossPosition();});
    document.getElementById('next').addEventListener("mousedown touchstart",()=>{setCrossPosition();});
  }
  else if(scaleType=='RadioButton'){
    document.theme.action = "https://docs.google.com/forms/u/1/d/e/1FAIpQLSflGs_MBw2e_ad5h2qzEu5Z7Rad5q6Zi2-U_DF1s03W7j1NNw/formResponse";
    document.getElementById('explanation_pic').src= explanation_pic_RadioButton_url;
    var RadioButtons = document.getElementsByClassName('RadioButton');
    for(var i = 0; i < RadioButtons.length; i++) RadioButtons[i].style.display = '';
  }
  else window.close();
}
//變換顯示table內容
function changeADJ(){
  document.getElementById("td_left_" + scaleType).innerHTML = ADJ_Word[(ADJ_i-1)*2];
  document.getElementById("td_right_" + scaleType).innerHTML = ADJ_Word[(ADJ_i-1)*2+1];
  if(scaleType=='Range') changeADJRange();
  else if(scaleType=='RadioButton') changeADJRadioButton();
  else return false;
}

/*Range調整*/

/*jquery UI Slider*/
$( function() {
  var handle = $( "#custom-handle" );
  var track = $( "#slider" );
  track.slider({
    range:false,
    step: 0.1,
    min:-100,
    max:0,
    create: function() {
      handle.css("background-size", "cover");
      handle.css("background-color", "transparent");
      handle.css("border", "0px black solid");
    },
    slide: function( event, ui ) {
      recordScore(Math.abs(ui.value));
      handle.css("background-image", "url('https://imgur.com/94YyvTo.png')");
      track.css("background","#777");
    }});
  track.hover(()=>{
    track.css("background","#777");
    handle.css("background-image", "url('https://imgur.com/94YyvTo.png')");
  },()=>{
    track.css("background","#ccc");
    handle.css("background-image", "url('https://imgur.com/06zVfHc.png')");});
  track.focus(()=>{
    track.css("background","#777");
    handle.css("background-image", "url('https://imgur.com/94YyvTo.png')");
  });
  track.blur(()=>{
    track.css("background","#ccc");
    handle.css("background-image", "url('https://imgur.com/06zVfHc.png')");});
} );

$( function() {
  var handleT = $( "#custom-handleTest" );
  var trackT = $( "#sliderTest" );
  trackT.slider({
    range:false,
    step: 0.1,
    min:-100,
    max:0,
    create: function() {
      handleT.css("background-size", "cover");
      handleT.css("background-color", "transparent");
      handleT.css("border", "0px black solid");
    },
    slide: function( event, ui ) {
      recordScore(Math.abs(ui.value));
      handleT.css("background-image", "url('https://imgur.com/94YyvTo.png')");
      trackT.css("background","#777");
    }});
  trackT.hover(()=>{
    trackT.css("background","#777");
    handleT.css("background-image", "url('https://imgur.com/94YyvTo.png')");
  },()=>{
    trackT.css("background","#ccc");
    handleT.css("background-image", "url('https://imgur.com/06zVfHc.png')");});
  trackT.focus(()=>{
    trackT.css("background","#777");
    handleT.css("background-image", "url('https://imgur.com/94YyvTo.png')");
  });
  tracTk.blur(()=>{
    trackT.css("background","#ccc");
    handleT.css("background-image", "url('https://imgur.com/06zVfHc.png')");});
} );


function changeADJRange(){
  setCrossPosition();
}
function setCrossPosition(){
  if(ADJ_Score[ADJ_i-1] && ADJ_Score[ADJ_i-1]!=null){
    /*by jQuery UI*/
    $( "#slider" ).slider("value",-ADJ_Score[ADJ_i-1]);
    $( "#custom-handle" ).show();  
  }
  else{
    /*by jQuery UI*/
    $( "#custom-handle" ).hide();  
  }
}

/*Radio Button調整*/
function changeADJRadioButton(){
  for(i=1;i<=5;i++)
  {
    document.getElementById("ADJ_RadioButton_"+i).checked = false;
    document.getElementById("ADJ_RadioButton_"+i).setAttribute("name",ADJ_Entry[ADJ_i-1]);
    if(ADJ_Score[ADJ_i-1]){
      if((6-i) == ADJ_Score[ADJ_i-1]) document.getElementById("ADJ_RadioButton_" + i).checked = true;
    }
  }
}

/*感官主導性*/
function fillInData_SD(isFilled, participant, stage){
  if(isFilled){
    document.getElementById('participant_SD').value = participant;
    document.getElementById('stage_SD').value = stage;
  }
}

function showSD() {
  var participant = document.getElementById('participant_SD').value;
  var stage = document.getElementById('stage_SD').value;
  document.getElementById('container_stage').style.display = 'none';
  document.getElementById('container_SD').style.display = '';
  $('html,body').animate({scrollTop:0}, 500);

  if(!participant || !stage){
    document.getElementById('no text_SD').style.display = '';
  }
  else{
    document.getElementById('no text_SD').style.display = 'none'; 
    document.getElementById('part_Name_Stage').style.display = 'none';
    document.getElementById('part_Choose').style.display = '';
  }
  document.getElementById('explanation_SD').style.display = '';
  document.getElementById('container_progressRadio').style.display = 'none';

  changeSDButtonWordImage();
}

function closeNoText_SD(){
  document.getElementById('no text_SD').style.display = 'none'; 
}

function startAnswer_SD() {
  document.getElementById('explanation_SD').style.display = 'none';
  document.getElementById('container_progressRadio').style.display = '';
  $(window).scrollTop($('#part_Choose').offset().top);

}


var Ans_i = 1;
var Ans_Array = new Array();
var Ans_Word = [
  ["視覺","觸覺"],
  ["視覺","聽覺"],
  ["觸覺","聽覺"]
];
var Ans_Entry = [
  "entry.727990184",
  "entry.2073835214",
  "entry.1677724600"
];
//變換SD按鈕的顏色
function changeSDButtonColor(){
  var Buttons = document.getElementsByClassName("SDButton");
  for(i=0;i<Buttons.length;i++){
    Buttons[i].style.backgroundColor = "#e7e7e7";
    Buttons[i].style.color = "black";
    if(Ans_Array[Ans_i-1]==Buttons[i].dataset.value){
      Buttons[i].style.backgroundColor = "turquoise";
      document.getElementById('not yet_SD').style.display = 'none';
    }
  }
}
//載入SD按鈕的字跟圖片
function changeSDButtonWordImage(){
  var option = document.getElementsByClassName("SDButton");
  var option_id = [
    "#SDButton_Left",
    "#SDButton_Right"
  ];
  for(i=0;i<2;i++){
    var word = Ans_Word[Ans_i-1][i];
    var element_img = $(option_id[i]).find('img');
    var img_url;
    option[i].dataset.value = word;
    $(option[i]).children('.text').text(word);

    if(word=="視覺") img_url = "https://imgur.com/eeNMcgU.png";
    else if(word=="觸覺") img_url =  "https://imgur.com/a8WZ3RX.png";
    else if(word=="聽覺") img_url =  "https://imgur.com/IaeBkEz.png";

    $(element_img).attr('src',img_url);
    $(element_img).attr('style',"height:2rem;");
  }
  changeSDButtonColor();
}


function recordScore_SD(Ans,id){
  var name = Ans_Entry[Ans_i-1];
  Ans_Array[Ans_i - 1] = Ans;
  changeSDButtonColor();

  if (Ans_i == 3) document.getElementById('submit_SD').disabled = false;
  var input_exist = document.getElementById("Ans_" + Ans_i);
  if(input_exist) input_exist.value = Ans_Array[Ans_i - 1];
  else{
    var tr = document.getElementById("tr_hidden_SD");
    var td = document.createElement('td');
    var input = document.createElement('input');
    input.type = "hidden";
    input.id = "Ans_" + Ans_i;
    input.name = name;
    input.value = Ans_Array[Ans_i - 1];
    td.appendChild(input);
    tr.appendChild(td);
  }
}
function buttonNext_SD() {
  if(!Ans_Array[Ans_i - 1]) document.getElementById('not yet_SD').style.display = '';
  else{
    document.getElementById('back_SD').disabled = false;
    document.getElementById('next_SD').disabled = false;
    document.getElementById('not yet_SD').style.display = 'none';
    Ans_i += 1;
    changeSDButtonWordImage();
    doForwards_SD();
    if (Ans_i == 3){
      document.getElementById('next_SD').disabled = true;
      document.getElementById('button_Submit_SD').style.display = '';
    }
  }
  return true;
}
function buttonBack_SD() {
  document.getElementById('back_SD').disabled = false;
  document.getElementById('next_SD').disabled = false;
  document.getElementById('not yet_SD').style.display = 'none';
  Ans_i -= 1;
  changeSDButtonWordImage();
  doBackwards_SD();
  if (Ans_i == 1) document.getElementById('back_SD').disabled = true;
  return true;
}
function submitForm_SD(){
  document.getElementById("part_Choose").style.display='none';
  document.getElementById("finish_SD").style.display='';
  $('html,body').animate({scrollTop:$(document).height()}, 500);
  if(stage<2) document.getElementById("startstage_"+(stage+1)).disabled = '';
  else recordTime();
  document.getElementById('button_Submit_SD').style.display = 'none';
  document.getElementById('button_Submit_SD').disabled = 'true';
  for(j=0 ; j<Ans_Array.length;j++){
    Ans_Array[j] = null;
    if(Ans_i!=1) buttonBack_SD();
  }
  document.getElementByName('theme_SD').submit();
}
/*進度條*/
var g_progress1 = null;
var g_$startButton = null;
var g_intervalID = null; // the handle of the interval set when the example is running
var g_curVal = 0;
var g_maxVal = 20;
var g_id = "LV";
// function increment() increments the value and passes the new value to the progress bar
// widget. If the progress bar is at 100%, it stops the increment.
//
function doForwards () {

  if (g_progress1.getProgress() == 100) {
    //clearInterval(g_intervalID);
    //g_intervalID = null;

    // make sure that the progress bar shows that it is full
    g_progress1.$progDiv.css('width', '100%');

    g_curVal = 0;
    //g_$startButton.html('Reset Example');
    return;
  }

  g_curVal = g_curVal + g_maxVal/g_maxVal;
  g_progress1.setValue(g_curVal);
}

function doBackwards () {

  if (g_progress1.getProgress() == 100) {
    //clearInterval(g_intervalID);
    //g_intervalID = null;

    // make sure that the progress bar shows that it is full
    g_progress1.$progDiv.css('width', '100%');

    g_curVal = 0;
    //g_$startButton.html('Reset Example');
    return;
  }

  g_curVal = g_curVal - g_maxVal/g_maxVal;
  g_progress1.setValue(g_curVal);
}

$(document).ready(function() {

  var running = false; // true if example is running

  // progress1 is a progress bar
  g_progress1 = new progressbar(g_id, g_maxVal, true);

  g_$startButton = $('#pb' + g_id + '_control');

  // bind a click handler to the start  button
  g_$startButton.click(function(e) {

    if (g_progress1.getProgress() == 100) {
      g_progress1.setValue(0);
    }

    if (running == true) {
      //clearInterval(g_intervalID);
      //g_intervalID = null;
      //g_$startButton.html('Start Example');
      running = false;
    }
    else {
      // create an interval timer to increment the count every second

      //g_intervalID = setInterval("doUpdate()", 100);
      doUpdate();
      //g_$startButton.html('Stop Example');

      running = true;
    }
  });

}); // end document ready

////////////////////////////////////////////////////
//
// function progressbar() is a class to define an ARIA-enabled progressbar widget.
//
// @param(container_id string) container_id is the containing div for the progressbar
//
// @param(max integer) max is the maximum value for the values being set. Used to calculate percent progress
//
// @param(showVal boolean) showVal is true if the current progress value should be shown
//
// @return N/A
//
function progressbar(id, max, showVal) {

  // define progressbar object properties

  this.$container = $('#pb' + id);
  this.valMax = max;
  this.showVal = showVal;
  this.divWidth = 0;

  // Store the size of the progress bar
  this.width = this.$container.width();

  // Store the page position of the widget
  this.left = Math.round(this.$container.offset().left);
  this.top = Math.round(this.$container.offset().top);

  // Create and initialize the progress indicator
  this.$container.append('<div id="progDiv' + id + '" class="progressIndicator" ></div>');
  this.$progDiv = $('#progDiv' + id);
  this.$progDiv.css('width', Math.round(100/max) + '%');

  // Create and initialize the value box
  this.$container.append('<div id="progVal' + id + '" class="progressVal" aria-hidden="false"></div>');
  this.$progVal = $('#progVal' + id);
  this.$progVal.html('1/' + max);

  if (this.showVal == false) {
    this.$progVal.addClass('hidden').attr('aria-hidden', 'true');
  }

} // end progressbar constructor

//
// function setValue() is a member function to set the value of the progress bar.
//
// @param(val integer) val is the new value to calculate the progress from
//
// @return N/A
//
progressbar.prototype.setValue = function(val)  {

  var percent = val * 100 / this.valMax;

  if (percent <= 100.0) {
    this.$container.attr('aria-valuenow', Math.round(percent));
    this.$progDiv.css('width', percent + Math.round(100/this.valMax) + '%'); //Math.round(percent) + '%');
    this.$progVal.html((Math.round(this.$container.attr('aria-valuenow')/(100/this.valMax))+1) + '/' + this.valMax);
  }
}

//
// function getProgress() is a member function to return the percent progress
//
// @return (integer) Returns the percent progress in integer form (e.g. 50 represents 50%)
//
progressbar.prototype.getProgress = function()  {

  return this.$container.attr('aria-valuenow');
}

//
// function positionHandle() is a member function to position a handle at the specified value for the
// progressbar. If showVal is true, it also positions and updates the displayed value container.
//
// @param($handle object) $handle is a pointer to the handle jQuery object to manipulate
//
// @param (val integer) val is the new value of the progressbar
//
// @return N/A
//
progressbar.prototype.positionHandle = function($handle, val) {

  var handleHeight = $handle.outerHeight(); // the total height of the handle
  var handleWidth = $handle.outerWidth(); // the total width of the handle
  var handleOffset; // the distance from the value position for centering the handle
  var xPos; // calculated horizontal position of the handle;
  var yPos; // calculated vertical position of the handle;
  var valPos; //calculated new pixel position for the value;


  // calculate the horizontal pixel position of the specified value
  valPos = ((val - this.min) / (this.max - this.min)) * this.width + this.left;

  xPos = Math.round(valPos - (handleWidth / 2));
  yPos = Math.round(this.top + (this.height / 2) - (handleHeight / 2));

  // Set the position of the handle
  $handle.css('top', yPos + 'px');
  $handle.css('left', xPos + 'px');

  // Set the aria-valuenow position of the handle
  $handle.attr('aria-valuenow', val);

  // Update the stored handle values
  if (/1$/.test($handle.attr('id')) == true) {
    // first handle
    this.val1 = val;
  }
  else {
    // second handle
    this.val2 = val;
  }

  // if showVal is true, update the value container
  if (this.showVals == true) {
    this.updateValBox($handle, Math.round(valPos));
  }

} // end positionHandle()

//
// function updateValBox() is a member function to reposition a handle value box and update its contents
//
// @return N/A
//
progressbar.prototype.updateValBox = function() {

  var $valBox = $('#' + $handle.attr('id') + '_val');

  var xPos; // horizontal pixel position of the box
  var yPos; // vertical pixel position of the box

  // Set the position of the handle
  var boxWidth = $valBox.outerWidth();

  yPos = $handle.css('top');

  // Adjust the horizontal position to center the value box on the value position
  xPos = Math.round(valPos - (boxWidth / 2)) + 'px';

  // Set the position of the value box
  $valBox.css('top', yPos);
  $valBox.css('left', xPos);

  // Set the text in the box to the handle value
  $valBox.text($handle.attr('aria-valuenow'));

} // end updateValBox()

/*進度條_SD*/
var g_progress1_SD = null;
var g_$startButton_SD = null;
var g_intervalID_SD = null; // the handle of the interval set when the example is running
var g_curVal_SD = 0;
var g_maxVal_SD = 3;
var g_id_SD = "SD";


// function increment() increments the value and passes the new value to the progress bar
// widget. If the progress bar is at 100%, it stops the increment.
//
function doForwards_SD () {

  if (g_progress1_SD.getProgress() == 100) {
    //clearInterval(g_intervalID);
    //g_intervalID = null;

    // make sure that the progress bar shows that it is full
    g_progress1_SD.$progDiv.css('width', '100%');

    g_curVal_SD = 0;
    //g_$startButton.html('Reset Example');
    return;
  }

  g_curVal_SD = g_curVal_SD + g_maxVal_SD/g_maxVal_SD;
  g_progress1_SD.setValue(g_curVal_SD);
}

function doBackwards_SD () {
  if (g_progress1_SD.getProgress() == 100) {
    //clearInterval(g_intervalID);
    //g_intervalID = null;

    // make sure that the progress bar shows that it is full
    g_progress1_SD.$progDiv.css('width', '100%');

    g_curVal_SD = 0;

    //g_$startButton.html('Reset Example');
    return;
  }
  g_curVal_SD = g_curVal_SD - g_maxVal_SD/g_maxVal_SD;
  g_progress1_SD.setValue(g_curVal_SD);

}

$(document).ready(function() {

  var running = false; // true if example is running

  // progress1 is a progress bar
  g_progress1_SD = new progressbar(g_id_SD, g_maxVal_SD, true);

  g_$startButton_SD = $('#pb'+ g_id_SD + '_control');

  // bind a click handler to the start  button
  g_$startButton_SD.click(function(e) {

    if (g_progress1_SD.getProgress() == 100) {
      g_progress1_SD.setValue(0);
    }

    if (running == true) {
      //clearInterval(g_intervalID);
      //g_intervalID = null;
      //g_$startButton.html('Start Example');
      running = false;
    }
    else {
      // create an interval timer to increment the count every second

      //g_intervalID = setInterval("doUpdate()", 100);
      doUpdate();
      //g_$startButton.html('Stop Example');

      running = true;
    }
  });

}); // end document ready

/*進度條_STAGE*/
var g_progress1_STAGE = null;
var g_$startButton_STAGE = null;
var g_intervalID_STAGE = null; // the handle of the interval set when the example is running
var g_curVal_STAGE = 0;
var g_maxVal_STAGE = 4;
var g_id_STAGE = "STAGE";


// function increment() increments the value and passes the new value to the progress bar
// widget. If the progress bar is at 100%, it stops the increment.
//
function doForwards_STAGE () {

  if (g_progress1_STAGE.getProgress() == 100) {
    //clearInterval(g_intervalID);
    //g_intervalID = null;

    // make sure that the progress bar shows that it is full
    g_progress1_STAGE.$progDiv.css('width', '100%');

    g_curVal_STAGE = 0;
    //g_$startButton.html('Reset Example');
    return;
  }

  g_curVal_STAGE = g_curVal_STAGE + g_maxVal_STAGE/g_maxVal_STAGE;
  g_progress1_STAGE.setValue(g_curVal_STAGE);
}

function doBackwards_STAGE () {
  if (g_progress1_STAGE.getProgress() == 100) {
    //clearInterval(g_intervalID);
    //g_intervalID = null;

    // make sure that the progress bar shows that it is full
    g_progress1_STAGE.$progDiv.css('width', '100%');

    g_curVal_STAGE = 0;

    //g_$startButton.html('Reset Example');
    return;
  }
  g_curVal_STAGE = g_curVal_STAGE - g_maxVal_STAGE/g_maxVal_STAGE;
  g_progress1_STAGE.setValue(g_curVal_STAGE);

}


$(document).ready(function() {

  // progress1 is a progress bar
  g_progress1_STAGE = new progressbar(g_id_STAGE, g_maxVal_STAGE, true);


}); // end document ready

//順序：isFilled, participant, stage, order, sample, scale
//isFilled是要不要填，true代表我先輸好
//scale有Range和RadioButton

//fillInData(true,1,1,1,'G01','Range');

