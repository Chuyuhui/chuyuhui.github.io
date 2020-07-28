var participant;
var stage;
var mouse_order;
//sample
var scaleType = ""; //設定本單形式： Range / RadioButton；不指定時可用radio選擇

var ADJ_i = 1;
var ADJ_Score = new Array();

/* 沒有html換行字元的版本，寬度各需8字元，min-width設15+8*2=31rem */
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
var q_first = [
  ['L','L','L','V','V','V'],      // #01
  ['L','L','V','L','V','V'],      // #02
  ['L','L','V','V','L','V'],      // #03
  ['L','L','V','V','V','L'],      // #04
  ['L','V','L','L','V','V'],      // #05
  ['L','V','L','V','L','V'],      // #06
  ['L','V','L','V','V','L'],      // #07
  ['L','V','V','L','L','V'],      // #08
  ['L','V','V','L','V','L'],      // #09
  ['L','V','V','V','L','L'],      // #10
  ['V','V','V','L','L','L'],      // #11
  ['V','V','L','V','L','L'],      // #12
  ['V','V','L','L','V','L'],      // #13
  ['V','V','L','L','L','V'],      // #14
  ['V','L','V','V','L','L'],      // #15
  ['V','L','V','L','V','L'],      // #16
  ['V','L','V','L','L','V'],      // #17
  ['V','L','L','V','V','L'],      // #18
  ['V','L','L','V','L','V'],      // #19
  ['V','L','L','L','V','V'],      // #20
  ['L','L','L','V','V','V'],      // #21
  ['L','L','V','L','V','V'],      // #22
  ['L','L','V','V','L','V'],      // #23
  ['L','L','V','V','V','L'],      // #24
  ['L','V','L','L','V','V'],      // #25
  ['V','V','V','L','L','L'],      // #26
  ['V','V','L','V','L','L'],      // #27
  ['V','V','L','L','V','L'],      // #28
  ['V','V','L','L','L','V'],      // #29
  ['V','L','V','V','L','L']       // #30
];

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
    stage = document.getElementById('stage').value;
    mouse_order = document.getElementById('order').value;
  if(!participant || !stage || !mouse_order){
    document.getElementById('no text').style.display = '';
  }
  else{
    changeQuestionnaire();
  }
}

//淨空填畢問卷，並自動填入問卷資料
function changeQuestionnaire(){ //participant, stage, order, sample, scale
  //alert(participant +" "+ stage +" "+ mouse_order +" "+ mouse_sample[participant-1][mouse_order-1] +" "+ q_order);
  document.getElementById("part_ADJ").style.display = 'none';
  if(scaleType){
    var scaleType_elements = document.getElementsByClassName(scaleType);
    for(var i = 0; i < scaleType_elements.length; i++) scaleType_elements[i].style.display = 'none';
  }
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
  if(scaleType=="Range") setCrossPosition();
  if(stage==2 && mouse_order==1 && q_order==1) startExp = new Date().getTime();
}


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

  if(q_order==1) {
    document.getElementById("fill_Q2").style.display='';
    q_order++;
  }
  else{
    if(q_order==2){
      if(mouse_order<4)  document.getElementById("next_mouse").style.display='';
    }
    q_order=1;
  }
  
   //重置ADJ分數，不可放在submitForm()，否則會報錯
   for(var k=0;k<ADJ_Score.length;k++){
    ADJ_Score[k] = null;
    if(ADJ_i!=1) buttonBackADJ();
   }

  $('#theme').submit();
  
}

function changeMouse(){
  if(mouse_order<4){
    mouse_order++;
    changeQuestionnaire();
    if(mouse_order==4){
      document.getElementById("next_mouse").disabled = true;
    }
  }
}

/*共用，注意Range 跟 RadioButton不同的地方用scaleType判斷。*/

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

  // progress1 is a progress bar
  g_progress1 = new progressbar(g_id, g_maxVal, true);

}); // end document ready
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



//順序：isFilled, participant, stage
//isFilled是要不要填，true代表我先輸好
//scale有Range和RadioButton

//fillInData_SD(true,1,3);

