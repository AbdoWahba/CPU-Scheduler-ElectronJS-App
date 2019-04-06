//adding electron library and seting ipcPenderer
const electron = require("electron");
const { ipcRenderer } = electron;

//event when form is submitted
const form = document.querySelector("form");
form.addEventListener("submit", submitform);

//function which disable enter key from submitting form
function disable_enter_key(e) {
  var key;
  if (window.event) {
    key = window.event.keyCode;
  } else {
    key = e.which;
  }
  //key 13 = enter key
  if (key == 13) {
    document.getElementById("type of scheduler").blur();
    return false;
  } else {
    return true;
  }
}
function append_based_on_type_and_number() {
  var type_of_scheduler = document.getElementById("type of scheduler").value;
  var no_of_Processes = document.getElementById("no of Processes").value;
  var codeblock = "";
  if (type_of_scheduler === "FCFS" && no_of_Processes != 0) {
    for (let i = 1; i <= no_of_Processes; i++) {
      codeblock =
        codeblock +
        "<div>" +
        "<label>Process no" +
        i +
        "</label>" +
        '<div class="form-row">' +
        '<div class="col-6 mb-3">' +
        " <input" +
        '  min="0"' +
        ' class="form-control numeric integer optional"' +
        'placeholder="Enter burst time of Processes ' +
        i +
        '"' +
        'id="burst' +
        i +
        '"' +
        'type="number"' +
        'step="1"' +
        "/>" +
        "</div>" +
        '<div class="col-6 mb-3">' +
        " <input" +
        '  min="0"' +
        ' class="form-control numeric integer optional"' +
        'placeholder="Enter arrival time of Processes' +
        i +
        '"' +
        'id="arrival' +
        i +
        '"' +
        'type="number"' +
        'step="1"' +
        "/>" +
        "</div>" +
        "</div>";
    }
    document.getElementById("wrapper").innerHTML =
      codeblock +
      "<button type='submit' class='btn btn-primary'>Submit</button>";
  }
}
function submitform(e) {
  e.preventDefault();
  var no_of_Processes = document.getElementById("no of Processes").value;
  var obj = {};
  for (let j = 1; j <= no_of_Processes; j++) {
    var burst = document.getElementById("burst" + j).value;
    var arrival = document.getElementById("arrival" + j).value;
    obj["p" + j] = [burst, arrival];
  }
  var HIGHOFHIGH = Number(no_of_Processes) + 1;
  obj["p" + HIGHOFHIGH] = [1, 500000];

  var edited_obj = [];
  var first = "p1";
  var time_line = 0;

  for (let j = 1; j <= HIGHOFHIGH; j++) {
    console.log(obj);
    console.log(obj["p" + j]);
    console.log(obj["p1"][0]);
    for (let zo = 1; zo <= HIGHOFHIGH; zo++) {
      if (obj["p" + j][1] > obj["p" + zo][0]) {
        first = "p" + zo;
      } else {
        first = "p" + j;
      }
    }
    edited_obj += [time_line, time_line + obj[first][0], first];
    time_line += obj[first][0];
    //delete obj[first];
  }

  var item = "ba7bk ya 7mar";
  ipcRenderer.send("item:add", item);
}
