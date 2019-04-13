function submitform(e) {
  //e.preventDefault();
  var no_of_Processes = document.getElementById("no of Processes").value;
  var type_of_scheduler = document.getElementById("type of scheduler").value;
  var obj = [];
  for (let j = 1; j <= no_of_Processes; j++) {
    var burst = document.getElementById("burst" + j).value;
    var arrival = document.getElementById("arrival" + j).value;
    obj[j - 1] = { p: "p" + j, a: Number(arrival), b: Number(burst) };
  }

  //console.log(obj);

  var time_line = 0;
  if (type_of_scheduler == "FCFS") {
    for (let j = 0; j < no_of_Processes; j++) {
      for (let zo = 0; zo < no_of_Processes - 1; zo++) {
        if (obj[zo]["a"] > obj[zo + 1]["a"]) {
          var temp = obj[zo + 1];
          obj[zo + 1] = obj[zo];
          obj[zo] = temp;
        }
      }
    }
    console.log(obj);

    for (let j = 0; j < no_of_Processes; j++) {
      if (time_line >= obj[j]["a"]) {
        obj[j]["a"] = time_line;
        obj[j]["b"] = obj[j]["a"] + obj[j]["b"];
        time_line = obj[j]["b"];
      } else {
        obj[j]["b"] = obj[j]["a"] + obj[j]["b"];
        time_line = obj[j]["b"];
      }
    }
    console.log(obj);
  }
  else if (type_of_scheduler == "SJF-N") {
    //
  }
  else if (type_of_scheduler == "SJF-P") {










  }
  var item = JSON.stringify(obj);
  ipcRenderer.send("item:add", item);
}



function sortSjf(process) {
  let arr = process.slice();
  for (let j = 0; j < arr.lenght ; j++) {
    for (let zo = 0; zo < arr.lenght - 1; zo++) {
      if (arr[zo]["a"] > arr[zo + 1]["a"]) {
        var temp = arr[zo + 1];
        arr[zo + 1] = arr[zo];
        arr[zo] = temp;
      }
    }
  }

  let sort = [];

  while(arr.lenght !=0){

    let ele = arr.shift();

    let intr_elems = arr.filter(el => el.a < ele.a + ele.b);


    if (intr_elems.lenght > 0) {

      let nele = intr_elems[0];

      for (let x = 1; x < intr_elems.length; x++) if (intr_elems[x].b < nele.b) nele = intr_elems[x]; //next element


      sort.push({

        p: ele.p,
        a: ele.a,
        b: (nele.a - ele.a)




      });

    }
    else {
      sort.push(ele);

    }


  }

}






















