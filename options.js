let page = document.getElementById('charList');

chrome.storage.sync.get('rpgg_menu_characters', function(data) {

  fillData(data.rpgg_menu_characters);

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


function addRow(){
  var table = document.getElementById('charTable');
  addRowData(table, null);
}


function addRowData(table, item){
  if(item==null) item = {name: "", banner: "", color: ""};
  var newRow = table.insertRow();
    var nameCell = newRow.insertCell();
    var banCell = newRow.insertCell();
    var colorCell = newRow.insertCell();
    var deleteCell = newRow.insertCell();

    nameCell.innerHTML = "<div class=\"input-group col-xs-12\"><input type=\"text\" value=\""+item.name+"\" class=\"form-control \"></input></div>";
    banCell.innerHTML = "<div class=\"input-group col-xs-12\"><input type=\"text\" value=\""+item.banner+"\" class=\"form-control\"></input></div>";
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


function save(){
  var c = confirm("You are about to save characters.");
  if(c === true){
    var characters = [];
    var table = document.getElementById('charTable');
    for (let i = 1, row; row = table.rows[i]; i++){
      if(row.cells[0].getElementsByTagName('input')[0].value != "" && (row.cells[1].getElementsByTagName('input')[0].value != "" || row.cells[2].getElementsByTagName('input')[0].value != ""))
      characters.push({name: row.cells[0].getElementsByTagName('input')[0].value,
      banner: row.cells[1].getElementsByTagName('input')[0].value,
      color: row.cells[2].getElementsByTagName('input')[0].value
      });
    }

    chrome.storage.sync.set({
      rpgg_menu_characters: characters
    }, 
    function() {
      alert("Characters saved");
      console.log("Characters saved");
    });

  }
}
