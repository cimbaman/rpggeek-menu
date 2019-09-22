let page = document.getElementById('charList');

chrome.storage.sync.get('characters', function(data) {

  fillData(data.characters);

});

function fillData(characters){
  var table = document.createElement('table');
  table.id = "charTable"
  page.appendChild(table);
  for(let item of characters){
    var newRow = table.insertRow();
    var nameCell = newRow.insertCell();
    var banCell = newRow.insertCell();
    var colorCell = newRow.insertCell();
    var deleteCell = newRow.insertCell();

    nameCell.innerHTML = "<input type=\"text\" value=\""+item.name+"\"></input>";
    banCell.innerHTML = "<input type=\"text\" value=\""+item.banner+"\"></input>";
    colorCell.innerHTML = "<input type=\"text\" value=\""+item.color+"\"></input>";
    deleteCell.innerHTML = "<button style=\"background-color: rgb(232, 69, 60);\" ></button>";
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
  var newRow = table.insertRow();

  var nameCell = newRow.insertCell();
    var banCell = newRow.insertCell();
    var colorCell = newRow.insertCell();
    var deleteCell = newRow.insertCell();

    nameCell.innerHTML = "<input type=\"text\" ></input>";
    banCell.innerHTML = "<input type=\"text\" ></input>";
    colorCell.innerHTML = "<input type=\"text\" ></input>";
    deleteCell.innerHTML = "<button style=\"background-color: rgb(232, 69, 60);\" ></button>";
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
  var characters = [];
  var table = document.getElementById('charTable');
  for (let i = 0, row; row = table.rows[i]; i++){
    if(row.cells[0].getElementsByTagName('input')[0].value != "" && (row.cells[1].getElementsByTagName('input')[0].value != "" || row.cells[2].getElementsByTagName('input')[0].value != ""))
    characters.push({name: row.cells[0].getElementsByTagName('input')[0].value,
    banner: row.cells[1].getElementsByTagName('input')[0].value,
    color: row.cells[2].getElementsByTagName('input')[0].value
    });
  }

  chrome.storage.sync.set({
      characters: characters
  }, 
  function() {
    console.log("Character set");
  });


}
