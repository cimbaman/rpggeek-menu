chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({
        rpgg_menu_characters: [{name:"Luka", banner:"[ImageID=4945609]\\n[OOC]HP 40/40, AC 18[/OOC]", color:"#FFA500"}, {name:"Emet", banner:"[listitem=5874849]Emet[/listitem]\\n[OOC]HP 19+5/19, AC 13\\nSpell Slots: 1st 2/2[/OOC]", color:"#9400D3"}]
    }, 
    function() {
      console.log("Character set");
    });
  });