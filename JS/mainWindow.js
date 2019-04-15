//adding electron library and seting ipcPenderer
const electron = require("electron");
const { ipcRenderer } = electron;
var fs = require("fs");

var item = 0;
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

  if (type_of_scheduler == "RR") {
    codeblock += ` 
      <hr>
      <div class="form-group">
        <label for="q-time">Quantum time</label>
        <input type="number" id="q-time" class="form-control" min="1" step="1">
      </div>
      <hr>
    `;
  }

  if (no_of_Processes != 0) {
    for (let i = 1; i <= no_of_Processes; i++) {
      codeblock +=
        `
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label for="arrival-` +
        i +
        `">Arrival Time P` +
        i +
        `</label>
                <input type="number" step="1" min="0" class="form-control" placeholder="Arrival of Process ` +
        i +
        `"
                  id="arrival-` +
        i +
        `">
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label for="burst-` +
        i +
        `">Burst Time</label>
                <input type="number" step="1" min="0" class="form-control" placeholder="Burst of Process ` +
        i +
        `"
                  id="burst-` +
        i +
        `">
              </div>
            </div>
        `;

      if (
        type_of_scheduler == "Priority-N" ||
        type_of_scheduler == "Priority-P"
      ) {
        codeblock +=
          `
            <div class="col">
              <div class="form-group">
                <label for="priority-` +
          i +
          `">priority</label>
                <input type="number" step="1" min="0" class="form-control" placeholder="Priority of Process ` +
          i +
          `"
                  id="priority-` +
          i +
          `">
              </div>
            </div>
        `;
      }

      codeblock += `
            </div>
        `;
    }
    document.getElementById("wrapper").innerHTML =
      codeblock +
      "<button type='submit' class='btn btn-primary'>Submit</button>";
  }
}

function submitform(e) {
  e.preventDefault();

  var no_of_Processes = document.getElementById("no of Processes").value;
  var type_of_scheduler = document.getElementById("type of scheduler").value;
  console.log(type_of_scheduler);
  var processes = [];
  for (let j = 1; j <= no_of_Processes; j++) {
    var burst = document.getElementById("burst-" + j).value;
    var arrival = document.getElementById("arrival-" + j).value;
    var priority = null;
    if (
      type_of_scheduler == "Priority-N" ||
      type_of_scheduler == "Priority-P"
    ) {
      priority = document.getElementById("priority-" + j).value;
    }
    processes[j - 1] = {
      p: "p" + j,
      a: Number(arrival),
      b: Number(burst),
      priority: priority != null ? Number(priority) : priority
    };
  }

  chart = [];

  if (type_of_scheduler == "FCFS") {
    chart = FCFS(processes);
  } else if (type_of_scheduler == "Priority-N") {
    chart = sort_nonpreemptive(processes, "PRIORITY");
  } else if (type_of_scheduler == "Priority-P") {
    chart = sort_preemptive(processes, "PRIORITY");
  } else if (type_of_scheduler == "SJF-N") {
    chart = sort_nonpreemptive(processes, "SJF");
  } else if (type_of_scheduler == "SJF-P") {
    chart = sort_preemptive(processes, "SJF");
  } else if (type_of_scheduler == "RR") {
    chart = RR(processes);
    console.log("RR(processes)");
  }

  item = JSON.stringify(chart);
  var filename = "item.txt";
  if (!fs.existsSync("./item")) {
    fs.mkdirSync("./item");
  }
  fs.writeFile("./item/" + filename, item, err => {
    if (err) throw err;
  });
  ipcRenderer.send("item:add", item);
}

function RR(process) {
  obj = process.slice();
  for (let j = 0; j < obj.length; j++) {
    for (let zo = 0; zo < obj.length - 1; zo++) {
      if (obj[zo]["a"] > obj[zo + 1]["a"]) {
        var temp = obj[zo + 1];
        obj[zo + 1] = obj[zo];
        obj[zo] = temp;
      }
    }
  }
  var time_line = 0;
  var out = [];
  var totaltime = 0;
  for (let j = 0; j < obj.length; j++) {
    totaltime += obj[j]["b"];
  }
  var quant = document.getElementById("q-time").value;
  // totaltime = totaltime / quant + 1;
  console.log(totaltime);
  var flg = 0;
  for (let i = 0; i < totaltime + 1; i++) {
    for (let j = 0; j < obj.length; j++) {
      if (flg == obj.length && obj[j]["b"] != 0) {
        time_line = obj[j]["a"];
        flg = 0;
        console.log("FFFV");
      }
      if (time_line >= obj[j]["a"] && obj[j]["b"] != 0) {
        // out[j] = time_line;
        out[out.length] =
          quant <= obj[j]["b"]
            ? {
                p: obj[j]["p"],
                a: Number(time_line),
                b: Number(time_line) + Number(quant)
              }
            : {
                p: obj[j]["p"],
                a: Number(time_line),
                b: Number(obj[j]["b"]) + Number(time_line)
              };
        // time_line = obj[j]["b"];
        obj[j]["b"] = quant <= obj[j]["b"] ? obj[j]["b"] - quant : 0;
        console.log(time_line);
        time_line = out[out.length - 1]["b"];
        flg = 0;
      } else {
        flg++;
        console.log("here");
      }
    }
  }
  return out.slice();
}

function FCFS(process) {
  obj = process.slice();
  var time_line = 0;

  for (let j = 0; j < obj.length; j++) {
    for (let zo = 0; zo < obj.length - 1; zo++) {
      if (obj[zo]["a"] > obj[zo + 1]["a"]) {
        var temp = obj[zo + 1];
        obj[zo + 1] = obj[zo];
        obj[zo] = temp;
      }
    }
  }
  var obj2 = obj;
  for (let j = 0; j < obj.length; j++) {
    if (time_line >= obj[j]["a"]) {
      obj[j]["a"] = time_line;
      obj[j]["b"] = obj[j]["a"] + obj[j]["b"];
      time_line = obj[j]["b"];
    } else {
      obj[j]["b"] = obj[j]["a"] + obj[j]["b"];
      time_line = obj[j]["b"];
    }
  }

  return obj.slice();
}

function sort_preemptive(process, type) {
  job_queue = process.slice();
  ready_queue = [];

  let total_burst_time = 0;
  job_queue.forEach(x => {
    total_burst_time += Number(x.b);
  });

  for (let j = 0; j < job_queue.length; j++) {
    for (let zo = 0; zo < job_queue.length - 1; zo++) {
      if (type == "SJF") {
        if (job_queue[zo]["b"] > job_queue[zo + 1]["b"]) {
          var temp = job_queue[zo + 1];
          job_queue[zo + 1] = job_queue[zo];
          job_queue[zo] = temp;
        }
      } else if ((type = "PRIORITY")) {
        if (job_queue[zo]["priority"] > job_queue[zo + 1]["priority"]) {
          var temp = job_queue[zo + 1];
          job_queue[zo + 1] = job_queue[zo];
          job_queue[zo] = temp;
        }
      } else {
        if (job_queue[zo]["a"] > job_queue[zo + 1]["a"]) {
          var temp = job_queue[zo + 1];
          job_queue[zo + 1] = job_queue[zo];
          job_queue[zo] = temp;
        }
      }
    }
  }

  var time_line = 0;
  while (total_burst_time > 0) {
    let arrived_elements = job_queue.filter(x => {
      return x["a"] <= time_line && x.b != 0;
    });

    if (arrived_elements.length > 0) {
      let index = job_queue.findIndex(x => x.p == arrived_elements[0]["p"]);
      job_queue[index]["b"]--;
      ready_queue.push({
        p: job_queue[index]["p"],
        a: Number(time_line),
        b: time_line + 1
      });
      total_burst_time--;
    } else {
      /** free time */
      ready_queue.push({ p: "Free", a: Number(time_line), b: time_line + 1 });
    }
    time_line++;
  }

  ready_queue = ready_queue.filter(x => {
    return x.p != "Free";
  });

  for (let i = 0; i < ready_queue.length; i++) {
    if (ready_queue[i + 1]) {
      if (ready_queue[i].p == ready_queue[i + 1].p) {
        ready_queue[i].b = ready_queue[i + 1].b;
        ready_queue.splice(ready_queue.indexOf(ready_queue[i + 1]), 1);
        i--;
      }
    }
  }

  return ready_queue.slice();
}

function sort_nonpreemptive(process, type) {
  job_queue = process.slice();
  ready_queue = [];
  let total_burst_time = 0;
  job_queue.forEach(x => {
    total_burst_time += Number(x.b);
  });
  for (let j = 0; j < job_queue.length; j++) {
    for (let zo = 0; zo < job_queue.length - 1; zo++) {
      if (type == "SJF") {
        if (job_queue[zo]["b"] > job_queue[zo + 1]["b"]) {
          var temp = job_queue[zo + 1];
          job_queue[zo + 1] = job_queue[zo];
          job_queue[zo] = temp;
        }
      } else if ((type = "PRIORITY")) {
        if (job_queue[zo]["priority"] > job_queue[zo + 1]["priority"]) {
          var temp = job_queue[zo + 1];
          job_queue[zo + 1] = job_queue[zo];
          job_queue[zo] = temp;
        }
      } else {
        if (job_queue[zo]["a"] > job_queue[zo + 1]["a"]) {
          var temp = job_queue[zo + 1];
          job_queue[zo + 1] = job_queue[zo];
          job_queue[zo] = temp;
        }
      }
    }
  }

  var time_line = 0;
  while (total_burst_time > 0) {
    let arrived_elements = job_queue.filter(x => {
      return x["a"] <= time_line && x.b != 0;
    });

    if (arrived_elements.length > 0) {
      let index = job_queue.findIndex(x => x.p == arrived_elements[0]["p"]);
      let burst = job_queue[index]["b"];
      job_queue[index]["b"] = 0;
      ready_queue.push({
        p: job_queue[index]["p"],
        a: Number(time_line),
        b: time_line + burst
      });
      total_burst_time -= burst;
      time_line += burst;
    } else {
      /** free time */
      let starttime = ready_queue[ready_queue.length - 1]
        ? ready_queue[ready_queue.length - 1]["b"]
        : 0;
      let nextarrival = job_queue.filter(x => {
        return x["a"] >= starttime && x["b"] != 0;
      });
      let minarrival = nextarrival[0];
      nextarrival.forEach(x => {
        if (minarrival.a > x.a) {
          minarrival = x;
        }
      });
      ready_queue.push({ p: "Free", a: starttime, b: Number(minarrival.a) });
      time_line = Number(minarrival.a);
    }
  }
  ready_queue = ready_queue.filter(x => {
    return x.p != "Free";
  });

  for (let i = 0; i < ready_queue.length; i++) {
    if (ready_queue[i + 1]) {
      if (ready_queue[i].p == ready_queue[i + 1].p) {
        ready_queue[i].b = ready_queue[i + 1].b;
        ready_queue.splice(ready_queue.indexOf(ready_queue[i + 1]), 1);
        i--;
      }
    }
  }

  return ready_queue.slice();
}
