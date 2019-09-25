javascript:(function(){ 

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
    var articleBox = (top.id == "articleform")? top : top.getElementById("articleform");
    if(articleBox) var replyBox = articleBox.getElementsByClassName('forum_table');
    if(articleBox && replyBox.length != 0 && replyBox[0].getElementsByTagName("textarea").length !=0){

      var newTableRow = replyBox[0].getElementsByTagName('tbody')[0].insertRow(0); newTableRow.id = "charMenu"; 
var newTableCell = newTableRow.insertCell(); var newTable = document.createElement("TABLE"); 
    newTableCell.appendChild(newTable); var newRow = newTable.insertRow(); 
    var oocCell  = newRow.insertCell(); oocCell.innerHTML = "<input class=\"smallerfont\" type=\"button\" value=\"OOC\" onmouseover=\"overlib( 'OOC', WRAP )\" onmouseout=\"return nd();\" onclick=\"javascript:wrapSelection( document.MESSAGEFORM.body,'[ooc]','[/ooc]');\">";
    var rollCell = newRow.insertCell(); rollCell.innerHTML = "<input class=\"smallerfont\" type=\"button\" value=\"Quick roll\" id=\"quickRoll\">";
    rollCell.onclick = function(){quickRoll();}

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

  function quickRoll(){ var box = document.getElementById("MESSAGEFORM"); var selectedText = getCustomSelect(box.body); var params = {}; params.action = 'create'; params.roll_string = selectedText; params.comment = 'Tst'; params.objecttype = box.dataset.objecttype; params.objectid = box.dataset.objectid; params.parent_objecttype = box.dataset.parent_objecttype; params.parent_objectid = box.dataset.parent_objectid; var textarea = box.body; new Request.GEEK({ url: '/geekrandomizer.php', data: params, method: 'post', onComplete: function(response) { data = JSON.decode(response); if (data.valid) { var wrapper = $('rolls_wrapper_' + params.objecttype + '_' + params.objectid); if (wrapper && wrapper.hasClass('dn')) { wrapper.removeClass('dn'); } var rollsblock = $('rollsblock_' + params.objecttype + '_' + params.objectid); if (rollsblock) { rollsblock.removeClass('dn'); rollsblock.set('html', 'Loading...<img src="//cf.geekdo-static.com/images/progress.gif">'); new Request.GEEK({ url: '/geekrandomizer.php', data: { 'objecttype': params.objecttype, 'objectid': params.objectid, 'action': 'getrolls' }, method: 'get', update: rollsblock }).send(); } else { var selData = getInputSelection(textarea); var selStart = selData.start; var selEnd = selData.end; wrapSelection(textarea, '[geekroll=' + data.rollid + ']', '[/geekroll]', selStart, selEnd); } } else { alert("There was an error with your roll."); } } }).send();} 

  function getCustomSelect(txtarea){ var oldTop=txtarea.scrollTop;var selLength=txtarea.textLength; var selData=getInputSelection(txtarea);var sStart=selData.start;var sEnd=selData.end; if(sEnd==1||sEnd==2)sEnd=selLength; var s1=(txtarea.value).substring(0,sStart); var s2=(txtarea.value).substring(sStart,sEnd); var s3=(txtarea.value).substring(sEnd,selLength); if(typeof txtarea.setSelectionRange=='undefined'){ var range=txtarea.createTextRange(); var lend=sNew.length.toInt(); range.collapse(true); range.moveStart('character',sStart); range.moveEnd('character',lend); range.select(); } else{txtarea.setSelectionRange(sStart,sEnd.toInt());} txtarea.focus();txtarea.scrollTop=oldTop; return s2; } 
})()