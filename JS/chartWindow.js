console.log("hello");

var fs = require("fs");
let ana;
fs.readFile("./item/item.txt", function(err, buf, ana) {
  console.log(buf.toString());
  ana = JSON.parse(buf);

  console.log(ana);
  clr = { p1: "red", p2: "green" };
  var dataset = [];
  for (let i = 0; i < ana.length; i++) {
    dataset[i] = {
      showLine: true,
      label: ana[i]["p"],
      steppedLine: true,
      data: [
        {
          x: ana[i]["a"],
          y: 1
        },
        {
          x: ana[i]["b"],
          y: 1
        }
      ],

      borderColor: [clr[ana[i]["p"]]],
      backgroundColor: ["rgba(255, 99, 132, 0)"],
      borderWidth: 5
    };
  }
  var ctx = document.getElementById("myChart"); //.getContext("2d");
  var myChart = new Chart(ctx, {
    type: "scatter",
    steppedLine: true,
    aspectRatio: 50,
    data: {
      steppedLine: true,
      datasets: dataset
    },

    options: {
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "probability"
            },
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 1,
              stepSize: 1
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: 0,
              stepSize: 1
            }
          }
        ]
      }
    }
  });
});
