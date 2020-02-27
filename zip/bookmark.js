javascript:(function(){ 

  var s = document.createElement('script');
  
  s.src = chrome.runtime.getURL('roll.js');
  s.onload = function() {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);

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



  



  chrome.storage.sync.get('rpgg_menu_characters', function(data) {
    
    var characters = data.rpgg_menu_characters;

    if(document.getElementById('charMenu')) document.getElementById('charMenu').remove();
    var box = document.getElementsByName("MESSAGEFORM")[0];
    var extBox = "body";
    if(!box) {
      var box = document.getElementsByName("ITEMFORM")[0];
      var extBox = "comments";
    }


console.log(box);

  if(box) {
    if(box.name=="MESSAGEFORM"){
      var articleBox = (top.id == "articleform")? top : top.getElementById("articleform");
    }
    else {var articleBox = articleBox?articleBox:top;}
    if(articleBox) var replyBox = articleBox.getElementsByClassName('forum_table');
    if(articleBox && replyBox.length != 0 && replyBox[0].getElementsByTagName("textarea").length !=0){

      //var newTableRow = replyBox[0].getElementsByTagName('tbody')[0].insertRow(0); 
      var newTableRow = document.createElement("TR");
      var tbr = $(top).find("textarea").closest("tr");
      console.log(tbr);
      console.log(tbr.prev());

      tbr.prev().after(newTableRow);
      newTableRow.id = "charMenu"; 
      if(box.name=="ITEMFORM") {var nameCell = newTableRow.insertCell(); nameCell.align="right"; var logoImg = document.createElement("IMG"); logoImg.setAttribute("src", chrome.runtime.getURL("img/icon32.png")); nameCell.appendChild(logoImg);}
var newTableCell = newTableRow.insertCell(); var newTable = document.createElement("TABLE"); 
    newTableCell.appendChild(newTable); var newRow = newTable.insertRow(); 
    if(box.name=="MESSAGEFORM") {var nameCell = newRow.insertCell(); nameCell.align="right"; var logoImg = document.createElement("IMG"); logoImg.setAttribute("src", chrome.runtime.getURL("img/icon32.png")); nameCell.appendChild(logoImg);}
    var oocCell  = newRow.insertCell(); oocCell.innerHTML = "<input class=\"smallerfont\" type=\"button\" value=\"OOC\" onmouseout=\"return nd();\" onclick=\"javascript:wrapSelection( document."+box.name+"." + extBox + ",'[ooc]','[/ooc]');\">";
    var rollCell = newRow.insertCell(); rollCell.innerHTML = "<input class=\"smallerfont\" type=\"button\" value=\"Quick roll\" onclick=\"quickRoll(document."+box.name+");\">";
    var wipCell = newRow.insertCell(); wipCell.innerHTML = "<input class=\"smallerfont\" type=\"button\" value=\"Post in progress\" onclick=\"javascript:emoticon(document."+box.name+"." + extBox + ",\'[COLOR=#FF0000]Post in progress[/COLOR]\');\">";


    //rollCell.onclick = function(){quickRoll();}

var dropDown = document.createElement("SELECT");
dropDown.id = "charSelect";
var dropDownCell = newRow.insertCell();
dropDownCell.appendChild(dropDown);
for (var i = 0; i < characters.length; i++) {
    dropDown.innerHTML = dropDown.innerHTML + "<option value=\""+i+"\">"+characters[i]["name"]+"</option>";
}
var buttonBan = newRow.insertCell(); buttonBan.id = "buttonBan"; buttonBan.innerHTML = "<input class=\"smallerfont\" type=\"button\" value=\"BANNER "+characters[0]["name"]+"\" onmouseout=\"return nd();\" onclick=\"javascript:emoticon(document."+box.name+"." + extBox + ",\'"+characters[0]["banner"]+"\');\">";
var buttonTalk = newRow.insertCell(); buttonTalk.id = "buttonTalk"; buttonTalk.innerHTML = "<input class=\"smallerfont\" type=\"button\" value=\""+characters[0]["name"]+" speak\" onmouseout=\"return nd();\" onclick=\"javascript:wrapSelection( document."+box.name+"." + extBox + ",'[b][color="+characters[0]["color"]+"]','[/color][/b]');\">";
var buttonThink = newRow.insertCell(); buttonThink.id= "buttonThink"; buttonThink.innerHTML = "<input class=\"smallerfont\" type=\"button\" value=\""+characters[0]["name"]+" think\"  onmouseout=\"return nd();\" onclick=\"javascript:wrapSelection( document."+box.name+"." + extBox + ",'[i][color="+characters[0]["color"]+"]','[/color][/i]');\">";
dropDown.onchange= function() {chardropChange()};


function chardropChange() {
  var x = document.getElementById("charSelect").value;
  var btnBan = document.getElementById("buttonBan");
  var btnSpk = document.getElementById("buttonTalk");
  var btnTnk = document.getElementById("buttonThink");

  btnBan.remove(); btnSpk.remove(); btnTnk.remove();


  var buttonBan = newRow.insertCell(); buttonBan.id = "buttonBan"; buttonBan.innerHTML = "<input class=\"smallerfont\" type=\"button\" value=\"BANNER "+characters[x]["name"]+"\" onmouseout=\"return nd();\" onclick=\"emoticon(document."+box.name+"." + extBox + ",\'"+characters[x]["banner"]+"\');\">";
  var buttonTalk = newRow.insertCell(); buttonTalk.id = "buttonTalk"; buttonTalk.innerHTML = "<input class=\"smallerfont\" type=\"button\" value=\""+characters[x]["name"]+" speak\" onmouseout=\"return nd();\" onclick=\"wrapSelection( document."+box.name+"." + extBox + ",'[b][color="+characters[x]["color"]+"]','[/color][/b]');\">";
  var buttonThink = newRow.insertCell(); buttonThink.id= "buttonThink"; buttonThink.innerHTML = "<input class=\"smallerfont\" type=\"button\" value=\""+characters[x]["name"]+" think\"  onmouseout=\"return nd();\" onclick=\"wrapSelection( document."+box.name+"." + extBox + ",'[i][color="+characters[x]["color"]+"]','[/color][/i]');\">";
}
}
  }
});

  }


})()