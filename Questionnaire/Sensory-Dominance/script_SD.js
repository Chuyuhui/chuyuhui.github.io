
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

  if(!participant || !stage){
    document.getElementById('no text_SD').style.display = '';
  }
  else{
    document.getElementById('no text_SD').style.display = 'none'; 
    document.getElementById('part_Name_Stage').style.display = 'none';
    document.getElementById('part_Choose').style.display = '';
  }
  document.getElementById('explanation_SD').style.display = '';
  document.getElementById('container_progressSD').style.display = 'none';

  changeSDButtonWordImage();
}

function closeNoText_SD(){
  document.getElementById('no text_SD').style.display = 'none'; 
}

function startAnswer_SD() {
  document.getElementById('explanation_SD').style.display = 'none';
  document.getElementById('container_progressSD').style.display = '';
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
  $('html,body').animate({scrollTop:$(document).height()}, 250);
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

/*進度條_SD*/
var g_progress1_SD = null;
var g_$startButton_SD = null;
var g_intervalID_SD = null; // the handle of the interval set when the example is running
var g_curVal_SD = 0;
var g_maxVal_SD = 3;
var g_id_SD = "SD";

$(document).ready(function() {

  // progress1 is a progress bar
  g_progress1_SD = new progressbar(g_id_SD, g_maxVal_SD, true);

}); // end document ready

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

