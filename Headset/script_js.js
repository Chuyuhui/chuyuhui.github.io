      
     $('#theme').submit(function(event) {
      event.preventDefault();
      setTimeout(function() {
        // Get data
        var data = {

          'entry.511407135': $('#ADJSCORE_1').val(),
          'entry.1152870785': $('#ADJSCORE_2').val(),
          'entry.1079921585': $('#ADJSCORE_3').val(),
          'entry.927862003': $('#ADJSCORE_4').val(),
          'entry.1883799580': $('#ADJSCORE_5').val(),
          'entry.1465052067': $('#ADJSCORE_6').val(),
          'entry.985700968': $('#ADJSCORE_7').val(),
          'entry.418613732': $('#ADJSCORE_8').val(),
          'entry.94031112': $('#ADJSCORE_9').val(),
          'entry.1120322361': $('#ADJSCORE_10').val(),
          'entry.156344772': $('#ADJSCORE_11').val(),
          'entry.1428082092': $('#ADJSCORE_12').val(),
          'entry.1292637192': $('#ADJSCORE_13').val(),
          'entry.423724387': $('#ADJSCORE_14').val(),
          'entry.1755300774': $('#ADJSCORE_15').val(),
          'entry.1164985306': $('#ADJSCORE_16').val(),
          'entry.1902800109': $('#ADJSCORE_17').val(),
          'entry.814714499': $('#ADJSCORE_18').val()
        };

        // Validate form
        var formSuccess = true;
        Object.keys(data).forEach(function(key, index) {
          if (!data[key]) {
            formSuccess = false;
          }
        });

        if (formSuccess) {
          // Send request
          $.ajax({
            url: document.theme.action,
            type: 'POST',
            crossDomain: true,
            dataType: "xml",
            data: data,
            success: function(jqXHR, textStatus, errorThrown) {
              console.log('Enter on success');
            },
            error: function(jqXHR, textStatus, errorThrown) {
              console.log('Enter on error');
            }
          });
        }
      }, 300);
    });


/*jquery UI Slider*/
$(document).ready( function() {
  
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
  
    for(var i=1; i<=18; i++){

    var tr = document.createElement('tr');
  
    tr.id = "tr_ADJ_" + i;
    $(tr).attr("style", "height:1.5rem");
    var td_Left = document.createElement('td');
    $(td_Left).attr("align", "right");
    var div_Left = document.createElement('div');
    div_Left.id = "div_ADJ_Left_" + i;
    div_Left.className = "ADJ_Word";
    $(div_Left).text(ADJ_Word[(i-1)*2]);
  
    var td_Right = document.createElement('td');
    $(td_Right).attr("align", "left");
    var div_Right = document.createElement('div');
    div_Right.id = "div_ADJ_Right_" + i;
    div_Right.className = "ADJ_Word";
    $(div_Right).text(ADJ_Word[(i-1)*2+1]);

      var td_Middle = document.createElement('td');
    $(td_Middle).attr("colspan", "5");
    $(td_Middle).attr("height", "100%");
    $(td_Middle).attr("style", "width:16rem");
    
    var div_container_slider = document.createElement('div');
    div_container_slider.className = "container_slider";
    var div_slider = document.createElement('div');
    div_slider.id = "slider_" + i;
    div_slider.className = "Range slider";
    $(div_slider).css({
        background: #ccc;
        border: 0px black solid;
        width: 36rem;
        top:0rem;
        height:0.25rem;
        line-height: 1.5rem;
        margin: 0 auto;
        cursor:pointer;
      });
    $(div_slider).attr("style", "width:14rem");
    var div_handle = document.createElement('div');
    div_handle.id = "custom-handle_" + i;
    div_handle.className = "ui-slider-handle custom-handle";
    $(div_handle).css({
        width: 1.5rem;
        height: 1.5rem;
        text-align: center;
        line-height: 1.5rem;
        top:-0.625rem;
        background-image: url("https://imgur.com/06zVfHc.png");
        background-size: cover;
        border: 0px black solid;
        outline:none;
        cursor:pointer;
      });
 
    div_slider.appendChild(div_handle);
    div_container_slider.appendChild(div_slider);
    td_Middle.appendChild(div_container_slider);
  
  $("#tbody_SDS").append(tr);
  tr.append(td_Left);
  tr.append(td_Middle);
  tr.append(td_Right);
  
  //append進去
  td_Left.appendChild(div_Left);
  td_Right.appendChild(div_Right);
  }
 
});


$(document).ready(function(){
   $(".container_slider").each(function(index,element) {
  var track = $("#slider_"+(index+1), this);
  var handle =  $("#custom-handle_"+(index+1), this);

  track.slider({
    range:false,
    step: 0.1,
    min:0,
    max:100,
    create: function() {
      handle.css("background-size", "cover");
      handle.css("background-color", "transparent");
      handle.css("border", "0px black solid");
      handle.hide();
    },
    slide: function( event, ui ) {
      ADJ_i = index + 1;
      alert(ADJ_i);
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
  });
	});


var ADJ_i = 1;
var ADJ_Total = 18;
var ADJ_Answered = 0;
var ADJ_Score = new Array();
var ADJ_Entry = ["QQ1", "QQ2"];
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

function recordScore(score){
  ADJ_Score[ADJ_i - 1] = score;
  //document.getElementById('not yet').style.display = 'none';
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
    $("#tr_ADJ_" + ADJ_i).attr("style", "color:lightgray");
    ADJ_Answered++;
  }
  setCrossPosition();
  if (ADJ_Answered == ADJ_Total) document.getElementById('submit_LV').disabled = false;
}

function setCrossPosition(){
    /*by jQuery UI*/
    $( "#slider_" + ADJ_i ).slider("value",ADJ_Score[ADJ_i-1]);
    $( "#custom-handle_" + ADJ_i ).show();  
    alert(ADJ_Score[ADJ_i-1]);
  
}