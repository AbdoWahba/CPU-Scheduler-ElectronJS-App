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
  for (let j = 1; j <= no_of_Processes; j++) {
    var burst = document.getElementById("burst" + j).value;
    var arrival = document.getElementById("arrival" + j).value;
    obj[j - 1] = { p: "p" + j, a: Number(arrival), b: Number(burst)};
  }
  
  sort(obj);
}


function sort(process){
  job_queue = process.slice();
  ready_queue = [];

  let total_burst_time = 0;
  job_queue.forEach((x)=>{
    total_burst_time += Number(x.b);
  });

  for (let j = 0; j < job_queue.length; j++) {
    for (let zo = 0; zo < job_queue.length - 1; zo++) {
      if (job_queue[zo]["b"] > job_queue[zo + 1]["b"]) {
        var temp = job_queue[zo + 1];
        job_queue[zo + 1] = job_queue[zo];
        job_queue[zo] = temp;
      }
    }
  }

  var time_line = 0;
  while(total_burst_time > 0){
    console.log(time_line);
    let interupted_elements = job_queue.filter(x => {
      return ((x["a"] <= time_line) && (x.b != 0));
    });

    if(interupted_elements.length > 0){
      let index = job_queue.findIndex(x => x.p == interupted_elements[0]["p"]);
      job_queue[index]['b']--;
      ready_queue.push({ p: job_queue[index]["p"], a: Number(time_line), b: time_line + 1 });
      total_burst_time--;
    }else{  
      /** free time */
      ready_queue.push({ p: 'Free', a: Number(time_line), b: time_line + 1 });
    }
    time_line++;
  }
  console.log(ready_queue);
}