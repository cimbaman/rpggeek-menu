function quickRoll(box){
    if(box.name=="MESSAGEFORM"){
        var selectedText = getCustomSelect(box.body); 
    }
    else 
        var selectedText = getCustomSelect(box.comments);

        console.log(selectedText);
    var params = {}; 
    if(selectedText.indexOf("<")==0){
        params.comment = selectedText.substring(1, selectedText.indexOf(">"));
        params.roll_string = selectedText.substring(selectedText.indexOf(">")+1,selectedText.length);

    }
    else{
    params.roll_string = selectedText; 
}

    params.roll_string = params.roll_string.replace(/(\r\n|\n|\r)/gm,"");
    
    console.log(params);
    
    params.action = 'create';  params.objecttype = box.dataset.objecttype; params.objectid = box.dataset.objectid; params.parent_objecttype = box.dataset.parent_objecttype; params.parent_objectid = box.dataset.parent_objectid; 
    var textarea = box.body; 
    if(box.name=="MESSAGEFORM"){
        var textarea = box.body; 
    }
    else 
        var textarea = box.comments;
    new Request.GEEK({ url: '/geekrandomizer.php', data: params, method: 'post', onComplete: function(response) { data = JSON.decode(response); if (data.valid) { var wrapper = $('rolls_wrapper_' + params.objecttype + '_' + params.objectid); if (wrapper && wrapper.hasClass('dn')) { wrapper.removeClass('dn'); } var rollsblock = $('rollsblock_' + params.objecttype + '_' + params.objectid); if (rollsblock) { rollsblock.removeClass('dn'); rollsblock.set('html', 'Loading...<img src="//cf.geekdo-static.com/images/progress.gif">'); new Request.GEEK({ url: '/geekrandomizer.php', data: { 'objecttype': params.objecttype, 'objectid': params.objectid, 'action': 'getrolls' }, method: 'get', update: rollsblock }).send(); }  
    var selData = getInputSelection(textarea); var selStart = selData.start; var selEnd = selData.start; wrapSelection(textarea, '[geekroll=' + data.rollid + ']', '[/geekroll]', selStart, selEnd); }  else { alert("There was an error with your roll."); } } }).send();} 

function getCustomSelect(txtarea){ var oldTop=txtarea.scrollTop;var selLength=txtarea.textLength; var selData=getInputSelection(txtarea);var sStart=selData.start;var sEnd=selData.end; if(sEnd==1||sEnd==2)sEnd=selLength; var s1=(txtarea.value).substring(0,sStart); var s2=(txtarea.value).substring(sStart,sEnd); var s3=(txtarea.value).substring(sEnd,selLength); if(typeof txtarea.setSelectionRange=='undefined'){ var range=txtarea.createTextRange(); var lend=sNew.length.toInt(); range.collapse(true); range.moveStart('character',sStart); range.moveEnd('character',lend); range.select(); } else{txtarea.setSelectionRange(sStart,sEnd.toInt());} txtarea.focus();txtarea.scrollTop=oldTop; return s2; } 


//var newTableCell = document.getElementsByClassName('forum_table')[0].getElementsByTagName('tbody')[0].insertRow(0).insertCell(); var newTable = document.createElement("TABLE"); newTableCell.appendChild(newTable); var newRow = newTable.insertRow(); var oocCell = newRow.insertCell(); oocCell.innerHTML = "<input class=\"smallerfont\" type=\"button\" value=\"OOC\" onmouseover=\"overlib( 'OOC', WRAP )\" onmouseout=\"return nd();\" onclick=\"javascript:wrapSelection( document.MESSAGEFORM.body,'[ooc]','[/ooc]');\">"; var rollCell = newRow.insertCell(); rollCell.innerHTML = "<input type=\"button\" value=\"ROLL\" onclick=\"quickRoll();\">"; var dropDown = document.createElement("SELECT"); dropDown.id = "charSelect"; var dropDownCell = newRow.insertCell(); dropDownCell.appendChild(dropDown); for (var i = 0; i < characters.length; i++) { dropDown.innerHTML = dropDown.innerHTML + "<option value=\""+i+"\">"+characters[i]["name"]+"</option>"; } var buttonBan = newRow.insertCell(); buttonBan.innerHTML = "<input id=\"buttonBan\" class=\"smallerfont\" type=\"button\" value=\"BANNER "+characters[0]["name"]+"\" onmouseout=\"return nd();\" onclick=\"javascript:emoticon(document.MESSAGEFORM.body,\'"+characters[0]["banner"]+"\');\">"; var buttonTalk = newRow.insertCell(); buttonTalk.innerHTML = "<input id=\"buttonTalk\" class=\"smallerfont\" type=\"button\" value=\""+characters[0]["name"]+" speak\" onmouseout=\"return nd();\" onclick=\"javascript:wrapSelection( document.MESSAGEFORM.body,'[b][color="+characters[0]["color"]+"]','[/color][/b]');\">"; var buttonThink = newRow.insertCell(); buttonThink.innerHTML = "<input id=\"buttonThink\" class=\"smallerfont\" type=\"button\" value=\""+characters[0]["name"]+" think\" onmouseout=\"return nd();\" onclick=\"javascript:wrapSelection( document.MESSAGEFORM.body,'[i][color="+characters[0]["color"]+"]','[/color][/i]');\">"; dropDown.onchange= function() {chardropChange()}; function chardropChange() { var x = document.getElementById("charSelect").value; var btnBan = document.getElementById("buttonBan"); var btnSpk = document.getElementById("buttonTalk"); var btnTnk = document.getElementById("buttonThink"); btnBan.value = "BANNER "+characters[x]["name"]; btnBan.setAttribute( "onClick", "javascript:emoticon(document.MESSAGEFORM.body,\'"+characters[x]["banner"]+"\');" ); btnSpk.value = characters[x]["name"]+" speak"; btnSpk.setAttribute( "onClick", "javascript:wrapSelection( document.MESSAGEFORM.body,'[b][color="+characters[x]["color"]+"]','[/color][/b]');"); btnTnk.value = characters[x]["name"]+" think"; btnTnk.setAttribute( "onClick", "javascript:wrapSelection( document.MESSAGEFORM.body,'[i][color="+characters[x]["color"]+"]','[/color][/i]');"); } })()