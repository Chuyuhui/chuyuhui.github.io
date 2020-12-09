 $(document).ready(function(){
    var ADJ_Word_SD =
        ["有負擔的－沒有負擔的",
         "不符合人體工學的－符合人體工學的",
         "不親膚的－親膚的",
         "沒有包圍感的－有包圍感的",
         "悶熱的－不悶熱的",
         "有異物感的－沒有異物感的",
         "刺刺癢癢的－不刺刺癢癢的",
         "不寬鬆的－寬鬆的",
         "不透氣的－透氣的",
         "不自然的－自然的",
         "不輕巧的－輕巧的",
         "不服貼的－服貼的",
         "不穩定的－穩定的",
         "不柔軟的－柔軟的",
         "沒有彈性的－有彈性的",
         "壓耳的－不壓耳的",
         "不舒適的－舒適的",
         "不想要購買的－想要購買的"];
    for(var i=1; i<=18; i++){
      var newspan = document.createElement('span');
      newspan.id = "span_KJ_ADJ_" + i;
      newspan.className = "item";
      newspan.innerHTML = "ZZZ";
      $("#UnKJ").append(newspan);
      $(newspan).text(ADJ_Word_SD[i-1]);
      $(newspan).draggable();
      $(newspan)object.addEventListener("dragstart",function(event){Drag(event);});
    }
  });
function AllowDrop(event){
    event.preventDefault();
}
function Drag(event){
    event.dataTransfer.setData("text",event.currentTarget.id);
}
function Drop(event){
    event.preventDefault();
    var data=event.dataTransfer.getData("text");
    event.currentTarget.appendChild(document.getElementById(data));
}