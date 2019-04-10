function append_based_on_type_and_number() {
    var type_of_scheduler = document.getElementById("type of scheduler").value;
    var no_of_Processes = document.getElementById("no of Processes").value;
    var codeblock = "";

    if (type_of_scheduler === "RR") {
        codeblock += `
            <div>
                <label>Enter Q - Process time on cpu - </label>
                <input min="0" class="form-control numeric integer optional"
                    id="RR-Q-time" type="number" step="1"/>
            </div>
            <hr>
        `
    }

    if (no_of_Processes != 0) {
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

function RR_sort(process_arr, RR_Q_time) {
    /** Sort Array FCFS */
    for (let j = 0; j < process_arr.length; j++) {
        for (let zo = 0; zo < process_arr.length - 1; zo++) {
            if (process_arr[zo]["a"] > process_arr[zo + 1]["a"]) {
                var temp = process_arr[zo + 1];
                process_arr[zo + 1] = process_arr[zo];
                process_arr[zo] = temp;
            }
        }
    }

    let RR_arr = []
    /** Chart */
    while (process_arr.length != 0) {
        let el = process_arr.shift();
        if (el.b <= RR_Q_time) {
            RR_arr.push(el);
        } else {
            RR_arr.push({
                p: el.p,
                a: Number(el.a),
                b: Number(RR_Q_time)
            });

            el = {
                p: el.p,
                a: Number(el.a),
                b: Number((el.b - RR_Q_time))
            }
            process_arr.push(el);
        }
    }
    return RR_arr.slice();
}

function RR_get_chart(sorted_RR) {
    let arr = sorted_RR.slice();
    let chart = []
    let i = 0;
    while (arr.length != 0) {
        console.log(i);
        el = arr.shift();
        if (i == 0) {
            el = {
                p: el.p,
                a: 0,
                b: 0 + el.b
            }
        } else {
            el = {
                p: el.p,
                a: chart[i - 1]['b'],
                b: chart[i - 1]['b'] + el.b
            }
        }
        chart.push(el);
        i++;
    }

    return chart.slice();
}