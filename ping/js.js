const batchSize = 5;
let onId = 0;
let every = 1000;
let last = 0;

let chart
let config
let data = []
let inprogress = []

let showLast = 15 * 1000;

function getPingData(n) {
    n = Math.floor(n)
    let last = data[data.length - 1]
    let min = last;
    let max = last;
    let total = last;
    let nums = 1;

    for (let i = 1; i <= n; i++) {
        const element = data[onId - 1 - i]
        if (element) {
            if (element > max) {
                max = element;
            }
            if (element < min) {
                min = element
            }
            total += element;
            nums++;
        }
    }

    return {
        last: last,
        average: Math.floor(total / nums),
        min: min,
        max: max,
    };
}

function updateData() {
    let pingData = getPingData(showLast / every)

    document.getElementById('lastPing').innerText = 
    `Last Ping: ${pingData.last}ms\n` +
    `Average Ping: ${pingData.average}ms\n` +
    `Min Ping: ${pingData.min}ms\n` +
    `Max Ping: ${pingData.max}ms\n`
        
    if (!config) {
        return
    }

    let labels = []
    config.data.labels = labels
    let values = []
    config.data.datasets[0].data = values

    for (let i = 0; i <= Math.floor(showLast / every); i++) {
        const element = data[onId - 1 - i]
        let text = (i !==0) ? "-" + ((i * every) / 1000) + "s" : "Now"
        labels.splice(0, 0, text)
        if (element) {
            values.splice(0, 0, element)
        } else {
            values.splice(0, 0, 0)
        }
    }

    chart.update()
}

function registerPing(id, ms) {
    if (!inprogress[id]) {
        inprogress[id] = []
    }
    inprogress[id].push(ms)

    if (inprogress[id].length === batchSize) {
        let result = inprogress[id].sort()[Math.floor(batchSize / 2)]
        data[id] = result
        inprogress[id] = null;
        updateData()
    }
}

function batchPing() {
    for (let i = 0; i < batchSize; i++) {
        let currentId = onId;

        let img = new Image()
        let sent = Date.now()
        img.onload = function() {
            registerPing(currentId, Date.now() - sent)
        }
        img.onerror = function() {
            registerFail(currentId)
        }
        img.src = "https://thattimothy.com/ping/request.jpg" + "?breakCacheFactor=" + Math.random()
    }
    onId++;
}

let prev
function setRate(n, elem) {
    data = []
    if (prev) {
        prev.style.border = "none"
        prev.style.padding = "20px"
    }
    elem.style.padding = "15px"
    elem.style.border = "solid 5px #000"
    prev = elem;

    every = n;
    updateData()
}

let otherPrev
function setTimeframe(n, elem) {
    if (otherPrev) {
        otherPrev.style.padding = "10px"
        otherPrev.style.border = "none"
    }

    elem.style.padding = "7px"
    elem.style.border = "solid 3px #000"
    otherPrev = elem;

    showLast = n;
    updateData()
}

function startPinging() {
    setRate(2500, document.getElementById('rateButton1'))
    setTimeframe(15000, document.getElementById('timeButton1'))
    let ctx = document.getElementById('liveChart').getContext('2d')
    config = {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: [],
            datasets: [{
                label: 'Ping (ms)',
                backgroundColor: 'rgba(255, 255, 0, 0.75)',
                borderColor: '#000000',
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                lineTension: 0,
                pointHitRadius: 0,
                data: []
            }],
        },
    
        // Configuration options go here
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 0,
            },
            legend: {
                display: false,
                labels: {
                    fontColor: "#fff",
                    fontSize: 18
                }
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        fontColor: "#fff",
                        fontSize: 22,
                        labelString: "Ping (ms)",
                    },
                    ticks: {
                        fontColor: "#fff",
                        fontSize: 18,
                        beginAtZero: true,
                        suggestedMax: 100,
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        fontColor: "#fff",
                        fontSize: 18,
                        labelString: "Time (seconds ago)",
                    },
                    ticks: {
                        fontColor: "#fff",
                        fontSize: 14,
                        maxRotation: 0
                    }
                }],
            },
            title: {
                display: true,
                text: "Ping (ms)",
                fontColor: "#fff",
                fontSize: 18,
            }
        },
    }
    chart = new Chart(ctx, config);

    checkPingCycle()
}

function checkPingCycle() {
    if (Date.now() - last >= every) {
        last = Date.now()
        batchPing()
    }
    window.requestAnimationFrame(checkPingCycle)
}