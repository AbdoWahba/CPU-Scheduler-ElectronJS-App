console.log("hello");

var fs = require("fs");
let ana;
fs.readFile("./item/item.txt", function(err, buf, ana) {
  console.log(buf.toString());
  ana = JSON.parse(buf);

  console.log(ana);
  var clr = {
    p1: "lightsteelblue",
    p2: "Darkslategrey",
    p3: "slategrey",
    p4: "aquamarine",
    p5: "brown",
    p6: "sandybrown",
    p7: "DarkSlateBlue",
    p8: "black",
    p9: "BlueViolet",
    p10: "midnightblue",
    p11: "CadetBlue",
    p12: "navajowhite",
    p13: "maroon",
    p14: "darkolivegreen",
    p15: "mediumorchid",
    p16: "darkkhaki",
    p17: "palegoldenrod",
    p18: "DarkSlateGray",
    p19: "mediumvioletred",
    p20: "teal",
    p21: "springgreen",
    p22: "chocolate",
    p23: "Aqua",
    p24: "Aquamarine",
    p25: "BurlyWood",
    p26: "coral",
    p27: "crimson",
    p28: "cyan",
    p29: "Chartreuse",
    p30: "CornflowerBlue",
    p31: "DarkBlue",
    p32: "DarkCyan",
    p33: "gold",
    p34: "gray",
    p35: "green",
    p36: "DarkGoldenRod",
    p37: "indigo",
    p38: "DarkGreen",
    p39: "DarkMagenta",
    p40: "lavender",
    p41: "DarkOrange",
    p42: "lime",
    p43: "magenta",
    p44: "DarkOrchid",
    p45: "maroon",
    p46: "DarkRed",
    p47: "DarkSalmon",
    p48: "DarkSeaGreen",
    p49: "olive",
    p50: "orange",
    p51: "orange-red",
    p52: "orchid",
    p53: "peach",
    p54: "pear",
    p55: "periwinkle",
    p56: "plum",
    p57: "pink",
    p58: "persianblue",
    p59: "prussianblue",
    p60: "puce",
    p61: "salmon",
    p62: "ruby",
    p63: "rose",
    p64: "red-violet",
    p65: "red",
    p66: "raspberry",
    p67: "purple",
    p68: "springbud",
    p69: "slategray",
    p70: "silver",
    p71: "scarlet",
    p72: "sapphire",
    p73: "sangria",
    p74: "teal",
    p75: "turquoise",
    p76: "ultramarine",
    p77: "violet",
    p78: "viridian",
    p79: "yellow",
    p80: "mediumslateblue",
    p81: "taupe",
    p82: "tan",
    p83: "",
    p84: "",
    p85: "",
    p86: "",
    p87: "",
    p88: "",
    p89: "",
    p90: "",
    p91: "",
    p92: "",
    p93: "",
    p94: "",
    p95: "",
    p96: "",
    p97: "",
    p98: "",
    p99: "",
    p100: ""
  };
  var dataset = [];
  for (let i = 0; i < ana.length; i++) {
    dataset[i] = {
      showLine: true,
      label: ana[i]["p"],
      steppedLine: true,

      text: "p1",

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
    aspectRatio: 2,
    data: {
      steppedLine: true,
      datasets: dataset
    },

    options: {
      title: {
        display: true,
        text: "OS CPU Scheduler Project"
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Processes"
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
            scaleLabel: {
              display: true,
              labelString: "time"
            },
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
