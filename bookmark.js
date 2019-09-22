javascript:(function(){ 
  console.log("start..");

  menuAdd(document);

  var observer = new MutationObserver(function(mutations, observer){

    for(var i=0; i<mutations.length; ++i) {
      for(var j=0; j<mutations[i].addedNodes.length; ++j) {
          if(mutations[i].addedNodes[j].id == "articleform") {
            menuAdd(mutations[i].addedNodes[j]);
          }
      }
  }
  });
  observer.observe(document.getElementById("maincontent"), {subtree: true, childList: true});

  function menuAdd(top){

  chrome.storage.sync.get('characters', function(data) {
    var characters = data.characters;
    console.log("chars..");

    if(document.getElementById('charMenu')) document.getElementById('charMenu').remove();
    var articleBox = (top.id == "articleform")? top : top.getElementById("articleform");
    if(articleBox) var replyBox = articleBox.getElementsByClassName('forum_table');
    if(articleBox && replyBox.length != 0 && replyBox[0].getElementsByTagName("textarea").length !=0){

  console.log("menujf..");
      var newTableRow = replyBox[0].getElementsByTagName('tbody')[0].insertRow(0); newTableRow.id = "charMenu"; 
var newTableCell = newTableRow.insertCell(); var newTable = document.createElement("TABLE"); 
    newTableCell.appendChild(newTable); var newRow = newTable.insertRow(); 
    var oocCell  = newRow.insertCell(); oocCell.innerHTML = "<input class=\"smallerfont\" type=\"button\" value=\"OOC\" onmouseover=\"overlib( 'OOC', WRAP )\" onmouseout=\"return nd();\" onclick=\"javascript:wrapSelection( document.MESSAGEFORM.body,'[ooc]','[/ooc]');\">";
var dropDown = document.createElement("SELECT");
dropDown.id = "charSelect";
var dropDownCell = newRow.insertCell();
dropDownCell.appendChild(dropDown);
for (var i = 0; i < characters.length; i++) {
    dropDown.innerHTML = dropDown.innerHTML + "<option value=\""+i+"\">"+characters[i]["name"]+"</option>";
}
var buttonBan = newRow.insertCell(); buttonBan.id = "buttonBan"; buttonBan.innerHTML = "<input class=\"smallerfont\" type=\"button\" value=\"BANNER "+characters[0]["name"]+"\" onmouseout=\"return nd();\" onclick=\"javascript:emoticon(document.MESSAGEFORM.body,\'"+characters[0]["banner"]+"\');\">";
var buttonTalk = newRow.insertCell(); buttonTalk.id = "buttonTalk"; buttonTalk.innerHTML = "<input class=\"smallerfont\" type=\"button\" value=\""+characters[0]["name"]+" speak\" onmouseout=\"return nd();\" onclick=\"javascript:wrapSelection( document.MESSAGEFORM.body,'[b][color="+characters[0]["color"]+"]','[/color][/b]');\">";
var buttonThink = newRow.insertCell(); buttonThink.id= "buttonThink"; buttonThink.innerHTML = "<input class=\"smallerfont\" type=\"button\" value=\""+characters[0]["name"]+" think\"  onmouseout=\"return nd();\" onclick=\"javascript:wrapSelection( document.MESSAGEFORM.body,'[i][color="+characters[0]["color"]+"]','[/color][/i]');\">";
dropDown.onchange= function() {chardropChange()};


function chardropChange() {
  var x = document.getElementById("charSelect").value;
  var btnBan = document.getElementById("buttonBan");
  var btnSpk = document.getElementById("buttonTalk");
  var btnTnk = document.getElementById("buttonThink");

  btnBan.remove(); btnSpk.remove(); btnTnk.remove();


  var buttonBan = newRow.insertCell(); buttonBan.id = "buttonBan"; buttonBan.innerHTML = "<input class=\"smallerfont\" type=\"button\" value=\"BANNER "+characters[x]["name"]+"\" onmouseout=\"return nd();\" onclick=\"emoticon(document.MESSAGEFORM.body,\'"+characters[x]["banner"]+"\');\">";
  var buttonTalk = newRow.insertCell(); buttonTalk.id = "buttonTalk"; buttonTalk.innerHTML = "<input class=\"smallerfont\" type=\"button\" value=\""+characters[x]["name"]+" speak\" onmouseout=\"return nd();\" onclick=\"wrapSelection( document.MESSAGEFORM.body,'[b][color="+characters[x]["color"]+"]','[/color][/b]');\">";
  var buttonThink = newRow.insertCell(); buttonThink.id= "buttonThink"; buttonThink.innerHTML = "<input class=\"smallerfont\" type=\"button\" value=\""+characters[x]["name"]+" think\"  onmouseout=\"return nd();\" onclick=\"wrapSelection( document.MESSAGEFORM.body,'[i][color="+characters[x]["color"]+"]','[/color][/i]');\">";
}
}
});

}
})()