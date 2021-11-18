var xhr = new XMLHttpRequest();
xhr.open("GET", "./data.json");
document.getElementById("populate").addEventListener("click", function () {
  xhr.send();
});
xhr.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var resultArray = JSON.parse(this.responseText);
    var html_content = "";

    html_content +=
      "<table id ='items' class='table table-hover table-bordered table-dark table-striped text-center'>";
    html_content +=
      "<thead ><th class='bg-danger bg-gradient text-white'>SerialNo:</th>";
    html_content +=
      "<th class='bg-danger bg-gradient text-white'>Item Name</th>";
    html_content +=
      "<th class='bg-danger bg-gradient text-white'>Quantity</th>";
    html_content += "<th class='bg-danger bg-gradient text-white'>Unit</th>";

    html_content +=
      "<th class='bg-danger bg-gradient text-white'>Department</th>";
    html_content += "<th class='bg-danger bg-gradient text-white'>Notes</th>";
    html_content += "<th class='bg-danger bg-gradient text-white'>Status</th>";
    html_content += "</thead>";
    html_content += "<tbody id='tableBody'> ";

    for (let i = 0; i < resultArray.length; i++) {
      var current_record = resultArray[i];
      let counts = i;
      let id_count = "id_" + counts;
      let check_count = "check_" + counts;
      // alert(b);
      html_content =
        html_content +
        "<tr  id= " +
        id_count +
        "><td>" +
        resultArray[i].Serial_Number +
        "</td><td>" +
        current_record.Name +
        "</td> <td>" +
        current_record.Quantity +
        "</td><td>" +
        current_record.Unit +
        "</td><td>" +
        current_record.Department +
        "</td><td>" +
        current_record.Notes +
        "</td><td ><input type='checkbox' id=" +
        check_count +
        " onclick='checkItem(" +
        i +
        ")'></td></tr>";
    }

    html_content += "</tbody></table>";

    populate.classList.add("hide-me");
    document.querySelector("#container").innerHTML = html_content;
    document.querySelector("#populate").setAttribute("disabled", "true");

    document.getElementById(
      "add"
    ).innerHTML = `<div id="btn_div"  class="text-center">

    
    
<button type="button" class="btn btn-danger action" data-toggle="modal" data-target="#itemModal">
  Add More
</button>


<div class="modal fade" id="itemModal"  role="dialog"  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header bg-danger">
        <h5 class="modal-title" id="modalLabel">ADD ITEM</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body bg-dark">
      <input type="hidden" id="Number" placeholder="Serial Number"><br><br>
      <input type="text" id="Name" placeholder="Item Name"><br><br>
      <input type="number" min="1" id="Quantity" placeholder="Quantity"><br><br>
      <input type="text" id="Unit" placeholder="Unit"><br><br>
     
      <input type="text" id="Department" placeholder="Department"><br><br>
      <input type="text" id="Notes" placeholder="Notes"><br>
              
      </div>
      <div class="modal-footer bg-dark text-center">
        <button type="button" class="btn btn-danger text-center" data-dismiss="modal">Close</button>
        <input type="button" onclick="newElement()" class="addBtn btn btn-danger " value="Save">
       
      </div>
    </div>
  </div>
</div>
    </div>`;
    document.getElementById(
      "del"
    ).innerHTML = `<div id="btn_del"  class="text-center"><button type="button" onclick="removeElement()"   class="btn btn-danger remBtn action" >
    Delete
  </button> 

    </div>`;
  }
};
function checkItem(obj) {
  var idd = "id_" + obj;
  var check_id = "check_" + obj;
  if (document.getElementById(check_id).checked) {
    document.getElementById(idd).style.textDecoration = "line-through";
    document.getElementById(idd).style.color = "yellow";
  } else {
    document.getElementById(idd).style.textDecoration = "none";
  }
}

function newElement() {
  var tr = document.createElement("tr");
  var val = document.getElementById("items").rows.length;

  var id_value = "id_" + val;
  var check_value = "check_" + val;

  tr.setAttribute("id", id_value);
  var num = document.getElementById("Number").value;

  var Name = document.getElementById("Name").value;
  var qty = document.getElementById("Quantity").value;
  var unit = document.getElementById("Unit").value;
  var dept = document.getElementById("Department").value;
  var notes = document.getElementById("Notes").value;
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");
  var td5 = document.createElement("td");
  var td6 = document.createElement("td");
  var td7 = document.createElement("td");

  var t_num = document.createTextNode(val);
  var t_name = document.createTextNode(Name);
  var t_qty = document.createTextNode(qty);
  var t_unit = document.createTextNode(unit);
  var t_dept = document.createTextNode(dept);
  var t_notes = document.createTextNode(notes);

  tr.append(td1, td2, td3, td4, td5, td6, td7);
  td1.appendChild(t_num);
  td2.appendChild(t_name);
  td3.appendChild(t_qty);
  td4.appendChild(t_unit);
  td5.appendChild(t_dept);
  td6.appendChild(t_notes);
  td7.innerHTML = `<input type="checkbox" onclick='checkItem(" +
  id_value +
  ")' id="+check_value+" >`;

  document.getElementById("tableBody").appendChild(tr);

  document.getElementById("Number").value = "";
  document.getElementById("Name").value = "";
  document.getElementById("Quantity").value = "";
  document.getElementById("Unit").value = "";
  document.getElementById("Department").value = "";
  document.getElementById("Notes").value = "";
  document.getElementById("Remove").style.display = "block";

  return (val += 1);
}

function removeElement() {
  var val = document.getElementById("items").rows.length;
  var value = val - 1;

  document.getElementById("items").deleteRow(value);
}
