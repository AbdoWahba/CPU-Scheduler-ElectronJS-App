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
  var obj = [];
  var total_burst_time = 0;
  for (let j = 1; j <= no_of_Processes; j++) {
      var burst = document.getElementById("burst" + j).value;
      var arrival = document.getElementById("arrival" + j).value;
      // var priority = document.getElementById("priority" + j).value;
      obj[j - 1] = { p: "p" + j, a: Number(arrival), b: Number(burst)};
      total_burst_time += Number(burst);
  }

  console.log(obj.length);
  console.log(total_burst_time);

  var time_line = 0;

  for (let j = 0; j < no_of_Processes; j++) {
      for (let zo = 0; zo < no_of_Processes - 1; zo++) {
          if (obj[zo]["b"] > obj[zo + 1]["b"]) {
              var temp = obj[zo + 1];
              obj[zo + 1] = obj[zo];
              obj[zo] = temp;
          }
      }
  }
  // console.log(obj);
  var obj2 = [];
  while(total_burst_time > 0){
    console.log(obj);
    var arr = [];

    k = obj.slice();
    arr = k.find(x => {
      console.log(x)
      return (x["a"] <= time_line && a.b != 0);
    });
    // console.log(arr)
    // if (arr.length > 0) {
    //   let index = obj.findIndex(x => x.p == arr[0]["p"]);
    //   obj[index].b--;
    //   obj2.push({ p: obj[index]["p"], a: Number(time_line), b: 1 });
    //   total_burst_time--;
    // }
    time_line++;
  }
  console.log(obj2);

  // var current = 0;
  // var counter = 0;
  // var j = document.getElementById("no of Processes").value;
  // var obj2 = [];
  // while(j>=0){
  //     if(obj[counter]['a']==time_line){
  //         j--;
  //         counter++;
  //     }
  //     if(obj[current]['b']>obj[counter]['b']){
  //         current = counter;
  //     }
  //     obj[current]--;
  //     obj2.push({ p: "p" + current, a: Number(time_line), b: Number(1)});
  // }
  // console,log(obj2);
  // for (let j = 0; j < no_of_Processes; j++) {
  //     if (time_line >= obj[j]["a"]) {
  //         obj[j]["a"] = time_line;
  //         obj[j]["b"] = obj[j]["a"] + obj[j]["b"];
  //         time_line = obj[j]["b"];
  //     } else {
  //         obj[j]["b"] = obj[j]["a"] + obj[j]["b"];
  //         time_line = obj[j]["b"];
  //     }
  // }
  // console.log(obj);

//   var item = JSON.stringify(obj);
//   ipcRenderer.send("item:add", item);
}
