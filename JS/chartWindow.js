console.log("hello");

var fs = require("fs");
let ana;
fs.readFile("./item/item.txt", function(err, buf, ana) {
  console.log(buf.toString());
  ana = JSON.parse(buf);

  console.log(ana);
  var clr = {
    p1: "lightsteelblue",
    p2: "darkslategrey",
    p3: "slategrey",
    p4: "aquamarine",
    p5: "dimgrey",
    p6: "babyblue",
    p7: "beige",
    p8: "black",
    p9: "blue",
    p10: "blue-green",
    p11: "blue-violet",
    p12: "blush",
    p13: "bronze",
    p14: "brown",
    p15: "burgundy",
    p16: "byzantium",
    p17: "carmine",
    p18: "cerise",
    p19: "cerulean",
    p20: "champagne",
    p21: "chartreusegreen",
    p22: "chocolate",
    p23: "cobaltblue",
    p24: "coffee",
    p25: "copper",
    p26: "coral",
    p27: "crimson",
    p28: "cyan",
    p29: "desertsand",
    p30: "electricblue",
    p31: "emerald",
    p32: "erin",
    p33: "gold",
    p34: "gray",
    p35: "green",
    p36: "harlequin",
    p37: "indigo",
    p38: "jade",
    p39: "junglegreen",
    p40: "lavender",
    p41: "lemon",
    p42: "lime",
    p43: "magenta",
    p44: "magentarose",
    p45: "maroon",
    p46: "mauve",
    p47: "navyblue",
    p48: "ochre",
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
    p83: "springgreen",
    p84: "teal",
    p85: "mediumvioletred",
    p86: "lightgoldenrodyellow",
    p87: "palegoldenrod",
    p88: "darkkhaki",
    p89: "mediumorchid",
    p90: "midnightblue",
    p91: "darkolivegreen",
    p92: "maroon",
    p93: "navajowhite",
    p94: "sandybrown",
    p95: "brown",
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
