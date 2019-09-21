javascript:(function(){ var characters = [{name:"Luka", banner:"[ImageID=4945609]\\n[OOC]HP 40/40, AC 18[/OOC]", color:"orange"}, {name:"Emet", banner:"[listitem=5874849]Emet[/listitem]\\n[OOC]HP 19+5/19, AC 13\\nSpell Slots: 1st 2/2[/OOC]", color:"Darkviolet"}]; 
    var newTableCell = document.getElementsByClassName('forum_table')[0].getElementsByTagName('tbody')[0].insertRow(0).insertCell(); var newTable = document.createElement("TABLE");  newTableCell.appendChild(newTable); var newRow = newTable.insertRow(); var oocCell  = newRow.insertCell(); oocCell.innerHTML = "<input class=\"smallerfont\" type=\"button\" value=\"OOC\" onmouseover=\"overlib( 'OOC', WRAP )\" onmouseout=\"return nd();\" onclick=\"javascript:wrapSelection( document.MESSAGEFORM.body,'[ooc]','[/ooc]');\">";
var dropDown = document.createElement("SELECT");
dropDown.id = "charSelect";
var dropDownCell = newRow.insertCell();
dropDownCell.appendChild(dropDown);
for (var i = 0; i < characters.length; i++) {
    dropDown.innerHTML = dropDown.innerHTML + "<option value=\""+i+"\">"+characters[i]["name"]+"</option>";
}
var buttonBan = newRow.insertCell(); buttonBan.innerHTML = "<input id=\"buttonBan\" class=\"smallerfont\" type=\"button\" value=\"BANNER "+characters[0]["name"]+"\" onmouseout=\"return nd();\" onclick=\"javascript:emoticon(document.MESSAGEFORM.body,\'"+characters[0]["banner"]+"\');\">";
var buttonTalk = newRow.insertCell(); buttonTalk.innerHTML = "<input id=\"buttonTalk\" class=\"smallerfont\" type=\"button\" value=\""+characters[0]["name"]+" speak\" onmouseout=\"return nd();\" onclick=\"javascript:wrapSelection( document.MESSAGEFORM.body,'[b][color="+characters[0]["color"]+"]','[/color][/b]');\">";
var buttonThink = newRow.insertCell(); buttonThink.innerHTML = "<input id=\"buttonThink\" class=\"smallerfont\" type=\"button\" value=\""+characters[0]["name"]+" think\"  onmouseout=\"return nd();\" onclick=\"javascript:wrapSelection( document.MESSAGEFORM.body,'[i][color="+characters[0]["color"]+"]','[/color][/i]');\">";
dropDown.onchange= function() {chardropChange()};
function chardropChange() {
  var x = document.getElementById("charSelect").value;
  var btnBan = document.getElementById("buttonBan");
  var btnSpk = document.getElementById("buttonTalk");
  var btnTnk = document.getElementById("buttonThink");
  btnBan.value = "BANNER "+characters[x]["name"];
  btnBan.setAttribute( "onClick", "javascript:emoticon(document.MESSAGEFORM.body,\'"+characters[x]["banner"]+"\');" );
  btnSpk.value = characters[x]["name"]+" speak";
  btnSpk.setAttribute( "onClick", "javascript:wrapSelection( document.MESSAGEFORM.body,'[b][color="+characters[x]["color"]+"]','[/color][/b]');");
  btnTnk.value = characters[x]["name"]+" think";
  btnTnk.setAttribute( "onClick", "javascript:wrapSelection( document.MESSAGEFORM.body,'[i][color="+characters[x]["color"]+"]','[/color][/i]');");
}
})()
