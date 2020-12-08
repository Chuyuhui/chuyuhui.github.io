var participant;
var mouse_order;

var ADJ_i = 1;
var ADJ_Score = new Array();

/* 沒有html換行字元的版本，寬度各需8字元，min-width設15+8*2=31rem */
var ADJ_Word = [
  "小巧的","碩大的",
  "細紋路的","粗紋路的"];

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

var ADJ_Entry = [
  "entry.511407135",
  "entry.1152870785"];

var explanation_pic_Range_url = "https://imgur.com/zLAh7o4.png";

var example_Range_image_url=[
  "https://imgur.com/Q81cRSD.gif",  //V-不偏向
  "https://imgur.com/mqfkq3V.gif",  //V-非常樸素
  "https://imgur.com/UnjBgfS.gif"   //V-有點華麗
];


$(function(){
  for(var w=1;w<=3;w++){
    $("#example_Range_image_" + w).attr('src', example_Range_image_url[w-1]);
  }
});

/*共用，不需調整*/
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


/*共用，不需調整*/
function checkText(){
  participant = document.getElementById('participant').value;
    mouse_order = document.getElementById('sample').value;
  if(!participant || !mouse_order){
    document.getElementById('no text').style.display = '';
  }
  else
	changeQuestionnaire();
}

//淨空填畢問卷，並自動填入問卷資料
function changeQuestionnaire(){ //participant, stage, order, sample, scale
  //alert(participant +" "+ stage +" "+ mouse_order +" "+ mouse_sample[participant-1][mouse_order-1] +" "+ q_order);
  document.getElementById("part_ADJ").style.display = 'none';
  if(scaleType){
    var scaleType_elements = document.getElementsByClassName(scaleType);
    for(var i = 0; i < scaleType_elements.length; i++) scaleType_elements[i].style.display = 'none';
  }
  fillInData(true,participant,stage,mouse_order,mouse_sample[participant-1][mouse_order-1]);

  document.getElementById("explanation").style.display = '';
  document.getElementById('example').style.display = '';
  document.getElementById('container_progressADJ').style.display = 'none';
  document.getElementById('finish').style.display = 'none';
  document.getElementById('submit_LV').style.display = 'none';
  document.getElementById('submit_LV').disabled = true;

}

function fillInData(isFilled, p, order, sample){
  if(isFilled){
    document.getElementById('participant').value = p;
    document.getElementById('order').value = order;
    document.getElementById('sample').value = sample;
    showScale();
  }
}
function showScale() {
  document.getElementById('no text').style.display = 'none'; 
  document.getElementById('part_Name_Stage_Order_Sample').style.display = 'none';
  document.getElementById('part_ADJ').style.display = '';
  onLoadSetup();
}

function closeNoText(){
  document.getElementById('no text').style.display = 'none'; 
}

function startAnswer() {
  document.getElementById('explanation').style.display = 'none';
  document.getElementById('example').style.display = 'none';
  document.getElementById('container_progressADJ').style.display = '';
  $(window).scrollTop($('#container_questionnaire').offset().top);
  setCrossPosition();
}


function recordScore(score){
  ADJ_Score[ADJ_i - 1] = score;
  document.getElementById('not yet').style.display = 'none';
  if (ADJ_i == 2) document.getElementById('submit_LV').disabled = false;
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

//不清除的話題交置表單時最後顯示的那個選項會被重複填兩次
function clearInputName(){ 
  for(i=1;i<=5;i++) document.getElementById("ADJ_RadioButton_"+i).setAttribute("name","");
}
function auto(){

  for(t=0;t<20;t++) {
    recordScore(3);
    if(t<19) buttonNextADJ();
  }
  //buttonNextADJ();
  //submitForm();
}
function submitForm(){
  clearInputName();

  document.getElementById("part_ADJ").style.display='none';
  document.getElementById("finish").style.display='';
  $('#theme').submit();
  
}

/*共用，注意Range 跟 RadioButton不同的地方用scaleType判斷。*/

//設定表單目的地、解釋文字、圖片與填答格式
function onLoadSetup(){
    document.theme.action = "https://docs.google.com/forms/u/1/d/e/1FAIpQLSfzOo5rmqiuAGwNdBlf8TQE1Rc1ZklReffOUk4cPqqOkbBnWA/formResponse";
    document.getElementById('explanation_pic').src= explanation_pic_Range_url ;
    var Ranges = document.getElementsByClassName('Range');
    for(var i = 0; i < Ranges.length; i++) Ranges[i].style.display = '';
    document.getElementById('back').addEventListener("mousedown touchstart",()=>{setCrossPosition();});
    document.getElementById('next').addEventListener("mousedown touchstart",()=>{setCrossPosition();});
  }
  else window.close();
}


/*Range調整*/

/*jquery UI Slider*/
$( function() {
  var handles = $( ".custom-handle" );
  var tracks = $( ".slider" );
  var handle, track;

  for(i=0; i<2; i++){
  handle = handles[i];
  track = tracks[i];
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
  }
} );


function setCrossPosition(){
  if(ADJ_Score[ADJ_i-1] && ADJ_Score[ADJ_i-1]!=null){
    /*by jQuery UI*/
    $( "#slider_" + i ).slider("value",-ADJ_Score[ADJ_i-1]);
    $( "#custom-handle_" + i ).show();  
  }
  else{
    /*by jQuery UI*/
    $( "#custom-handle_" +i ).hide();  
  }
}

