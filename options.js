let page = document.getElementById('charList');
let charPage = document.getElementById('btnsList');

chrome.storage.sync.get('rpgg_menu_characters', function(data) {

  fillData(data.rpgg_menu_characters);

});

chrome.storage.sync.get('rpgg_menu_btns', function(data) {

  btnsData(data.rpgg_menu_btns);

});

function fillData(characters){
  var table = document.createElement('table');
  table.id = "charTable";
  table.className = "table";
  page.appendChild(table);
  table.createTHead().insertRow(0).innerHTML = "<th>Name</th><th>Banner</th><th>Speach color</th><th>Delete</th>";
  for(let item of characters){
    addRowData(table, item);

  }
  var saveBtn = document.getElementById("save");
  saveBtn.onclick = function(){
    save();
  }

  var addBtn = document.getElementById("add");
  addBtn.onclick = function(){
    addRow();
  }
}

function btnsData(btns){
  var table = document.createElement('table');
  table.id = "btnsTable";
  table.className = "table";
  charPage.appendChild(table);
  table.createTHead().insertRow(0).innerHTML = "<th>Name</th><th>Function</th><th>Delete</th>";
  for(let item of btns){
    addRowDataBtns(table, item);

  }
  var saveBtn = document.getElementById("saveBtns");
  saveBtn.onclick = function(){
    saveBtns();
  }

  var addBtn = document.getElementById("addBtns");
  addBtn.onclick = function(){
    addRowBtns();
  }
}


function addRow(){
  var table = document.getElementById('charTable');
  addRowData(table, null);
}

function addRowBtns(){
  var table = document.getElementById('btnsTable');
  addRowDataBtns(table, null);
}


function addRowData(table, item){
  if(item==null) item = {name: "", banner: "", color: "#ffffff"};
  var newRow = table.insertRow();
    var nameCell = newRow.insertCell();
    var banCell = newRow.insertCell();
    var colorCell = newRow.insertCell();
    var deleteCell = newRow.insertCell();

    nameCell.innerHTML = "<div class=\"input-group col-xs-12\"><input type=\"text\" value=\""+item.name+"\" class=\"form-control \"></input></div>";
    banCell.innerHTML = "<div class=\"input-group col-xs-12\"><textarea class=\"form-control\">"+item.banner.replace(/\\n/gm,"\n")+"</textarea></div>";
    colorCell.innerHTML = "<div class=\"input-group col-xs-12\"><input type=\"color\" value=\""+item.color+"\" class=\"form-control\"></input></div>";
    deleteCell.innerHTML = "<div class=\"input-group col-xs-12\"><span class=\"glyphicon glyphicon-remove\"></span></div>";
    deleteCell.onclick = function()
    {
      var c = confirm("Do you want to delete this row?");
      if(c === true)
      {
          index = this.parentElement.rowIndex;
          table.deleteRow(index);
      }
    };
}


function addRowDataBtns(table, item){
  if(item==null) item = {name: "", function: ""};
  var newRow = table.insertRow();
    var nameCell = newRow.insertCell();
    var funCell = newRow.insertCell();
    var deleteCell = newRow.insertCell();

    nameCell.innerHTML = "<div class=\"input-group col-xs-12\"><input type=\"text\" value=\""+item.name+"\" class=\"form-control \"></input></div>";
    funCell.innerHTML = "<div class=\"input-group col-xs-12\"><textarea class=\"form-control\">"+item.function.replace(/\\n/gm,"\n")+"</textarea></div>";
    deleteCell.innerHTML = "<div class=\"input-group col-xs-12\"><span class=\"glyphicon glyphicon-remove\"></span></div>";
    deleteCell.onclick = function()
    {
      var c = confirm("Do you want to delete this row?");
      if(c === true)
      {
          index = this.parentElement.rowIndex;
          table.deleteRow(index);
      }
    };
}


function save(){
  var c = confirm("You are about to save characters.");
  if(c === true){
    var characters = [];
    var table = document.getElementById('charTable');
    for (let i = 1, row; row = table.rows[i]; i++){
      if(row.cells[0].getElementsByTagName('input')[0].value != "" && (row.cells[1].getElementsByTagName('textarea')[0].value != "" || row.cells[2].getElementsByTagName('input')[0].value != ""))
      characters.push({name: row.cells[0].getElementsByTagName('input')[0].value,
      banner: row.cells[1].getElementsByTagName('textarea')[0].value.replace(/(\n)/gm,"\\n"),
      color: row.cells[2].getElementsByTagName('input')[0].value
    }
    
    );
    }

    chrome.storage.sync.set({
      rpgg_menu_characters: characters
    }, 
    function() {
      console.log(characters);
      alert("Characters saved");
      console.log("Characters saved");
    });

  }
}

function saveBtns(){
  var c = confirm("You are about to save buttons.");
  if(c === true){
    var btns = [];
    var table = document.getElementById('btnsTable');
    for (let i = 1, row; row = table.rows[i]; i++){
      if(row.cells[0].getElementsByTagName('input')[0].value != "" && row.cells[1].getElementsByTagName('textarea')[0].value != "")
      btns.push({name: row.cells[0].getElementsByTagName('input')[0].value,
      function: row.cells[1].getElementsByTagName('textarea')[0].value.replace(/(\n)/gm,"\\n"),
    }
    
    );
    }

    chrome.storage.sync.set({
      rpgg_menu_btns: btns
    }, 
    function() {
      console.log(btns);
      alert("Buttoons saved");
      console.log("Buttons saved");
    });

  }
}
