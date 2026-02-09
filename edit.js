//url:logauto.js 
var pragmaticTables = 1;
var pragmaticIDs = [204, 227, 230];
var reds = [32, 19, 21, 25, 27, 34, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];
var tablesID = ['7x0b1tgh7agmf6hv', '48z5pjps3ntvqc1b', 'vctlz20yfnmp1ylr', 'lkcbrbdckjxajdol', 'wzg6kdkad1oe7m5k', 'GoldVaultRo00001', 'XxxtremeLigh0001', 'LightningTable01', 'hiey8yx1hkkgqawl', '01rb77cq1gtenhmo', '8clwnwrupuvf0osq', 'o4vjrhh5rtwimgi3', 'qtkjorzrlqeb6hrd', 'oqa3v7a2t25ydg5e', 'p675txa7cdt6za26', 'pv5q45yjhasyt46y', 'PorROU0000000001', 'n4jwxsz2x4tqitvx', 'zosmk25g2f768o52', 'r5aw9yumyaxgnd90'];
var tableNames = [];
var tableNumbers = {};
var tconfirmations = {};
var longtNumbers = {};
var lastNumbers = [];
var recommendTexts = {};
var Delay = 50;
var nextResultNumber = -1;
var nextResultAction = -1;
var chartsData = {};
var chart = null;
var chartShown = false;
var chartStop = false;
var OFFSET = 0;
var POCKETS = 7;
var SwitchSide = false;

recommendTexts[0] = ['Lowest Distance & Confirmed Spins', 'Highest Distance & Confirmed Spins', 'Only Lowest Distance', 'Only Highest Distance'];
recommendTexts[1] = ['Only (-)', 'Only (+)', 'Only (- & -1)', 'Only (- & +1)', 'Only (+ & -1)', 'Only (+ & +1)'];

function loadScripts(url) {
    var scripts = document.createElement('script');
    scripts.src = url;
    document.getElementsByTagName('head')[0].appendChild(scripts);
}
var hitNumbers = [];
var whatToBet = {};
var rulesHit = 0;
var ndI = 0;
let spins = [];
var SAFE_WIN_RATE = 0.4;
var MAX_LOSSES_IN_LAST_5 = 3;
const LAST_N_SPINS = 9;

function checkSafeMode(spins) {
    const recentSpins = spins.slice(-LAST_N_SPINS);
    const wins = recentSpins.filter(s => s).length;
    const winRate = wins / recentSpins.length;
    const last5 = recentSpins.slice(-5);
    const lossesInLast5 = last5.filter(s => !s).length;
    const stopBetting = winRate < SAFE_WIN_RATE || lossesInLast5 >= MAX_LOSSES_IN_LAST_5;
    return {
        winRate,
        lossesInLast5,
        stopBetting
    };
}

function predictNext(outcomes, maxPatternLength = 5) { // Convert array to string for easier pattern matching 
    const history = outcomes.join('');
    const predictions = {}; // Check patterns of different lengths 
    for (let length = 1; length <= maxPatternLength; length++) {
        const pattern = history.slice(-length); // current streak // Scan history for the same pattern 
        for (let i = 0; i <= history.length - length - 1; i++) {
            if (history.slice(i, i + length) === pattern) {
                const nextOutcome = history[i + length];
                if (predictions[nextOutcome]) {
                    predictions[nextOutcome]++;
                } else {
                    predictions[nextOutcome] = 1;
                }
            }
        }
    } // If no patterns found, return a default guess 
    if (Object.keys(predictions).length === 0) {
        const last = outcomes[outcomes.length - 1];
        return {
            prediction: last === 'W' ? 'L' : 'W',
            details: predictions
        };
    } // Find the outcome with the highest count 
    let predictedNext = null;
    let maxCount = -1;
    for (const [key, count] of Object.entries(predictions)) {
        if (count > maxCount) {
            maxCount = count;
            predictedNext = key;
        }
    }
    return {
        prediction: predictedNext,
        details: predictions
    };
}

function checkHitRate(tid) {
    var hitrates = [];
    var hitratesText = [];
    if (recommendBets == 0) {
        for (var hit = 0; hit <= 3; hit++) {
            rulesHit = hit;
            wins = 0;
            total = 0;
            ndI = longtNumbers[tid].length - 1;
            hitNumbers = [];
            whatToBet[0] = [];
            whatToBet[1] = [];
            whatToBet[2] = [];
            whatToBet[3] = [];
            whatToBet[4] = [];
            whatToBet[5] = [];
            hconfirmations = [1, 1, 1, 1, 1, 1];
            hdistances = [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity];
            while (true) {
                if (ndI == 0) {
                    break;
                }
                ndI--;
                hitNumbers.push(longtNumbers[tid][ndI]);
                calculateHitrate();
            }
            if (total > 0) {
                hitrates.push(Number(((wins / total) * 100).toFixed(2)));
                hitratesText.push(`${wins}/${total}`);
            } else {
                hitrates.push(Number(0).toFixed(2));
                hitratesText.push('0/0');
            }
        }
    }
    if (recommendBets == 1) {
        for (var hit = 0; hit <= 5; hit++) {
            rulesHit = hit;
            wins = 0;
            total = 0;
            ndI = longtNumbers[tid].length - 1;
            hitNumbers = [];
            whatToBet[0] = [];
            whatToBet[1] = [];
            whatToBet[2] = [];
            whatToBet[3] = [];
            whatToBet[4] = [];
            whatToBet[5] = [];
            hconfirmations = [1, 1, 1, 1, 1, 1];
            hdistances = [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity];
            while (true) {
                if (ndI == 0) {
                    break;
                }
                ndI--;
                hitNumbers.push(longtNumbers[tid][ndI]);
                calculateHitrate();
            }
            if (total > 0) {
                hitrates.push(Number(((wins / total) * 100).toFixed(2)));
                hitratesText.push(`${wins}/${total}`);
            } else {
                hitrates.push(Number(0).toFixed(2));
                hitratesText.push(`0/0`);
            }
        }
    }
    return [hitrates, hitratesText];
}
var wins = 0;
var total = 0;
var hconfirmations = [1, 1, 1, 1, 1, 1];
var hdistances = [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity];

function calculateHitrate() {
    total++;
    // dummy logic until real logic added
}

loadScripts('https://code.jquery.com/jquery-3.6.0.js');
var lastNS = {};
for (var i = 0; i < tablesID.length + pragmaticTables; i++) {
    tableNumbers[i] = [];
    longtNumbers[i] = [];
    tconfirmations[i] = [0, 0, 0, 0, 0, 0];
    lastNS[i] = [];
}
var socket = io('ws://54.38.159.96', {
    transports: ['websocket'],
    upgrade: false,
    reconnection: true,
    reconnectionDelay: 2000,
    timeout: 20000
});

socket.on('pragmaticTablesUpdate', function(data) { //console.log(data); 
    var tid = pragmaticIDs.indexOf(Number(data[1]));
    if (tid != -1) {
        tid = tablesID.length + tid;
        var results = data[0];
        var txt = ' ';
        tableNumbers[tid] = [];
        longtNumbers[tid] = [];
        for (var i = 0; i < 12; i++) {
            var num = Number(data[0][i]);
            tableNumbers[tid].push(num);
            var isRed = reds.indexOf(num) != -1;
            var color = '2bff47'
            if (isRed) {
                color = 'ff3d3d';
            } else if (num != 0) {
                color = 'fff';
            }
            var extra = '';
            if (i == 0) {
                extra = 'background-color: #737373; padding:4px;';
            }
            txt += `<span style="color:#${color}; ${extra}">${num}</span>&nbsp;`;
        }
        for (var i = 0; i < 20; i++) {
            longtNumbers[tid].push(data[0][i]);
        }
        const el = document.getElementById(`numbers_table_${tid}`);
if (el) {
    el.innerHTML = txt;
}
        if (tableJoined != null) {
            if (joinedID != -1 && tid == joinedID) {
                checkForPredictions(joinedID);
                if (recommendBets != -1) {
                    var hitrs = checkHitRate(joinedID);
                    var originText = recommendTexts[recommendBets];
                    for (var h = 0; h < recommendTexts[recommendBets].length; h++) {
                        document.getElementById('rsettings').children[1].children[h].children[0].innerText = `${originText[h]} (${hitrs[0][h]}% [${hitrs[1][h]}])`;
                    }
                    var selectedRule = rset.getIndex();
                    if (selectedRule == -1) {
                        selectedRule = 0;
                    }
                    document.getElementById('selectrset').innerHTML = `${originText[selectedRule]} (${hitrs[0][selectedRule]}% [${hitrs[1][selectedRule]}])`;
                }
            }
        }
        lastNS[tid] = [];
        tconfirmations[tid] = [0, 0, 0, 0, 0, 0];
        var cspins = 0;
        for (var zz = tableNumbers[tid].length - 1; zz > 0; zz--) {
            lastNS[tid].push(tableNumbers[tid][zz]);
            if (lastNS[tid].length >= 3) { //cspins = getTableConfirmedSpins(tid); 
            }
        }
        if (cspins == 0) { //document.getElementById(`cts${tid}`).innerHTML = '';
        } else { //document.getElementById(`cts${tid}`).innerHTML = ``;
        }
    }
});
socket.on('tablesDataPragmatic', function(data) {
    for (var i = 0; i < data[3].length; i++) {
        var idd = data[3][i];
        if (pragmaticIDs.indexOf(idd) != -1) {
            var tname = data[0][idd];
            var tid = tablesID.length + pragmaticIDs.indexOf(idd);
            tableNumbers[tid] = [];
            longtNumbers[tid] = data[2][idd];
            var url = data[1][idd];
            var txt = '';
            for (var x = 0; x < 12; x++) {
                var num = Number(data[2][idd][x]);
                tableNumbers[tid].push(num);
                var isRed = reds.indexOf(num) != -1;
                var color = '2bff47'
                if (isRed) {
                    color = 'ff3d3d';
                } else if (num != 0) {
                    color = 'fff';
                }
                var extra = '';
                if (x == 0) {
                    extra = 'background-color: #737373; padding:4px;';
                }
                     txt += `<span style="color:#${color}; ${extra}">${num}</span>&nbsp;`;
            }
            lastNS[tid] = [];
            tconfirmations[tid] = [0, 0, 0, 0, 0, 0];
            var cspins = 0;
            for (var zz = tableNumbers[tid].length - 1; zz >= 0; zz--) {
                lastNS[tid].push(tableNumbers[tid][zz]);
                if (lastNS[tid].length >= 3) { // cspins = getTableConfirmedSpins(tid); 
                }
            }
            var extra = ``;
            if (cspins == 0) {
                extra = ``;
            }
                document.getElementById('tables').innerHTML += `${tname}`;
            const el = document.getElementById(`numbers_table_${tid}`);
if (el) {
    el.innerHTML = txt;
}
        }
    }
});
socket.on('tablesCharts', function(data) {
    chartsData = data[0];
});
socket.on('tablesChartsUpdate', function(data) {
    chartsData[data[0]].push([data[1], data[2]]);
    if (joinedID != -1 && chartShown && nextResultAction == -1) {
        if (tablesID[joinedID].indexOf(data[0]) != -1) {
            var tid = tablesID[joinedID];
            let loadedData = chartsData[tid];
            let chartData = loadedData.map(item => ({
                x: getRightTime(item[0]),
                y: item[1]
            }));
            chart.data.datasets[0].data = chartData;
            if (!chartStop) {
                chart.update();
            }
        }
    }
});
socket.on('ChartsLastPointUpdate', function(data) {
    var latest = chartsData[data[0]].length - 1;
    chartsData[data[0]][latest][1] = data[1];
    console.log(`updated data point ${data[0]}, ${data[1]}`);
    if (joinedID != -1 && chartShown && nextResultAction == -1) {
        if (tablesID[joinedID].indexOf(data[0]) != -1) {
            var tid = tablesID[joinedID];
            let loadedData = chartsData[tid];
            let chartData = loadedData.map(item => ({
                x: getRightTime(item[0]),
                y: item[1]
            }));
            chart.data.datasets[0].data = chartData;
            if (!chartStop) {
                chart.update();
            }
        }
    }
});
socket.on('tablesData', function(data) {
    if (data.type == 'lobby.configs') {
        for (var i = 0; i < tablesID.length; i++) {
            var tid = tablesID[i];
            if (typeof data.args.configs[tid] != "undefined") {
                tableNames.push(data.args.configs[tid].title);
            } else {
                tableNames.push('');
            }
        }
    }
    if (data.type == 'lobby.thumbnails') {
        var tbls = Object.keys(data.args.thumbnails);
        for (var i = 0; i < tablesID.length; i++) {
            var tid = tbls.indexOf(tablesID[i]);
            if (tid != -1) {
                var photo = data.args.thumbnails[tbls[tid]].stream;
                var url = data.args.templates['16:9'].L.substring(0, 41);
                var txt = '';
                for (var x = 0; x < 12; x++) {
                    var num = Number(tableNumbers[i][x]);
                    var isRed = reds.indexOf(num) != -1;
                    var color = '2bff47'
                    if (isRed) {
                        color = 'ff3d3d';
                    } else if (num != 0) {
                        color = 'fff';
                    }
                    var extra = '';
                    if (x == 0) {
                        extra = 'background-color: #737373; padding:4px;';
                    }
                     txt += `<span style="color:#${color}; ${extra}">${num}</span>&nbsp;`;

                }
                lastNS[i] = [];
                tconfirmations[i] = [0, 0, 0, 0, 0, 0];
                var cspins = 0;
                for (var zz = tableNumbers[i].length - 1; zz >= 0; zz--) {
                    lastNS[i].push(tableNumbers[i][zz]);
                    if (lastNS[i].length >= 3) { //cspins = getTableConfirmedSpins(i);
                    }
                }
                var extra = `
                                `;
                if (cspins == 0) {
                    extra = `
                                `;
                }
                    document.getElementById('tables').innerHTML += `${tableNames[i]}`;
                document.getElementById(`numbers_table_${i}`).innerHTML = txt;
            }
        }
    }
    if (data.type == 'lobby.histories') {
        for (var x = 0; x < tablesID.length; x++) {
            var tid = Object.keys(data.args.histories).indexOf(tablesID[x]);
            if (tid != -1) {
                var results = data.args.histories[tablesID[x]].results;
                tableNumbers[x] = [];
                longtNumbers[x] = [];
                for (var i = 0; i < 12; i++) {
                    var num = Number(results[i][0].number);
                    tableNumbers[x].push(num);
                }
                for (var i = 0; i < 20; i++) {
                    var num = Number(results[i][0].number);
                    longtNumbers[x].push(num);
                }
            }
        }
    }
    if (data.type == 'lobby.historyUpdated') {
        var tid = tablesID.indexOf(Object.keys(data.args)[0]);
        if (tid != -1) {
            if (joinedID == tid) {
                var results = data.args[tablesID[tid]].results;
                nextResultNumber = Number(results[0][0].number);
            }
        }
        setTimeout(function() {
            var tid = tablesID.indexOf(Object.keys(data.args)[0]);
            if (tid != -1) {
                var results = data.args[tablesID[tid]].results;
                var txt = ' ';
                tableNumbers[tid] = [];
                longtNumbers[tid] = [];
                for (var i = 0; i < 12; i++) {
                    var num = Number(results[i][0].number);
                    tableNumbers[tid].push(num);
                    var isRed = reds.indexOf(num) != -1;
                    var color = '2bff47'
                    if (isRed) {
                        color = 'ff3d3d';
                    } else if (num != 0) {
                        color = 'fff';
                    }
                    var extra = '';
                    if (i == 0) {
                        extra = 'background-color: #737373; padding:4px;';
                    }
                    txt += `<span style="color:#${color}; ${extra}">${num}</span>&nbsp;`;

                }
                for (var i = 0; i < 20; i++) {
                    var num = Number(results[i][0].number);
                    longtNumbers[tid].push(num);
                }
const el = document.getElementById(`numbers_table_${tid}`);
if (el) {
    el.innerHTML = txt;
}

                if (tableJoined != null) {
                    if (joinedID != -1 && joinedID == tid) {
                        checkForPredictions(joinedID);
                        if (recommendBets >= 0) {
                            var hitrs = checkHitRate(joinedID);
                            var originText = recommendTexts[recommendBets];
                            for (var h = 0; h < recommendTexts[recommendBets].length; h++) {
                                document.getElementById('rsettings').children[1].children[h].children[0].innerText = `${originText[h]} (${hitrs[0][h]}% [${hitrs[1][h]}])`;

                            }
                            var selectedRule = rset.getIndex();
                            if (selectedRule == -1) {
                                selectedRule = 0;
                            }
                            document.getElementById('selectrset').innerHTML = `${originText[selectedRule]} (${hitrs[0][selectedRule]}% [${hitrs[1][selectedRule]}])`;
                        }
                    }
                }
                lastNS[tid] = [];
                tconfirmations[tid] = [0, 0, 0, 0, 0, 0];
                var cspins = 0;
                for (var zz = tableNumbers[tid].length - 1; zz >= 0; zz--) {
                    lastNS[tid].push(tableNumbers[tid][zz]);
                    if (lastNS[tid].length >= 3) { //cspins = getTableConfirmedSpins(tid);
                    }
                }
               const ctsEl = document.getElementById(`cts${tid}`);
if (!ctsEl) return;

if (cspins === 0) {
    ctsEl.innerHTML = '';
} else {
    ctsEl.innerHTML = `✔ ${cspins} confirmed`;
}

            }
        }, Delay * 10);
    }
});
var rset = null;
var recommendBets = -1;

function settingsChanged() {
    if (recommendBets == -1) {
        return;
    }
    if (tableJoined != null) {
        if (joinedID != -1) {
            checkForPredictions(joinedID);
        }
    }
}

function changeSet() {
    SwitchSide = !SwitchSide;
    if (tableJoined != null) {
        if (joinedID != -1) {
            checkForPredictions(joinedID);
        }
    }
}

function showChart(tid) {
    document.getElementById('chart').style = '';
    const ctx = document.getElementById('winRateChart').getContext('2d');
    let loadedData = chartsData[tid];
    let chartData = loadedData.map(item => ({
        x: getRightTime(item[0]),
        y: item[1]
    }));
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Win Rate (%)',
                data: chartData,
                borderColor: '#00ff00',
                backgroundColor: 'rgba(0,255,0,0.15)',
                tension: 0.35,
                pointRadius: 3,
                pointHoverRadius: 7,
                pointBackgroundColor: '#00ff00',
                fill: true
            }]
        },
        options: {
            responsive: true,
            animation: false,
            interaction: {
                mode: 'nearest',
                intersect: false
            },
            plugins: {
                tooltip: {
                    mode: 'nearest',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: 'white'
                    }
                }
            },
            hover: {
                mode: 'nearest',
                intersect: false
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        parser: 'yyyy-MM-dd HH:mm:ss',
                        //parse your format 
                        tooltipFormat: 'yyyy-MM-dd HH:mm:ss',
                        displayFormats: {
                            minute: 'HH:mm'
                        }
                    },
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                },
                y: {
                    min: 0,
                    max: 100,
                    ticks: {
                        color: 'white',
                        callback: v => v + '%'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                }
            }
        }
    });
    chartShown = true;
}

function hideChart() {
    document.getElementById('chart').style = 'display:none;';
    chart.destroy();
    chartShown = false;
}

function formatLocal(utcString, extraOffsetHours = 0) {
    const [datePart, timePart] = utcString.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute, second] = timePart.split(':').map(Number); // Create a true UTC date 
    const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute, second)); // Add any extra fixed offset (optional) 
    const offsetMs = extraOffsetHours * 60 * 60 * 1000;
    const adjustedDate = new Date(utcDate.getTime() + offsetMs); // Format in user's local time 
    const y = adjustedDate.getFullYear();
    const m = String(adjustedDate.getMonth() + 1).padStart(2, '0');
    const d = String(adjustedDate.getDate()).padStart(2, '0');
    const h = String(adjustedDate.getHours()).padStart(2, '0');
    const min = String(adjustedDate.getMinutes()).padStart(2, '0');
    const s = String(adjustedDate.getSeconds()).padStart(2, '0');
return `${y}-${m}-${d} ${h}:${min}:${s}`;

}

function getRightTime(original) {
    return formatLocal(original, 8);
}

function setLastChart(rate) {
    if (joinedID == -1) {
        return -1;
    }
    chart.data.datasets[0].data[chart.data.datasets[0].data.length - 1].y = rate;
    chartStop = true;
    chart.update();
}

function useRecommended() {
    if (recommendBets == -1) {
        recommendBets = 1;
        document.getElementById('changebtn').style.display = '';
        showChart(tablesID[joinedID]);
    } else {
        recommendBets = -1;
        document.getElementById('changebtn').style.display = 'none';
        hideChart();
    }
    var moredsp = 'none';
    if (recommendBets == 1) {
        moredsp = '';
    }
    document.getElementById('rsettings').children[1].children[4].style.display = moredsp;
    document.getElementById('rsettings').children[1].children[5].style.display = moredsp;
    if (recommendBets >= 0) {
        if (!firstTime) {
            firstTime = true;
            rset = new DropDown($('#rsettings'));
            $(function() {
                $(document).click(function() { // close menu on document click 
                    $('.wrap-drop').removeClass('active');
                });
            });
        }
    }
    if (tableJoined != null) {
        if (joinedID != -1) {
            if (nextResultAction == -1) {
                checkForPredictions(joinedID);
            }
            if (recommendBets >= 0) {
                var hitrs = checkHitRate(joinedID);
                var originText = recommendTexts[recommendBets];
                for (var h = 0; h < recommendTexts[recommendBets].length; h++) {
                    document.getElementById('rsettings').children[1].children[h].children[0].innerText = `${originText[h]}(${hitrs[0][h]} % [${hitrs[1][h]}])`;

                    }
                    var selectedRule = rset.getIndex();
                    if (selectedRule == -1) {
                        selectedRule = 0;
                    }
                document.getElementById('selectrset').innerHTML = `${originText[selectedRule]}(${hitrs[0][selectedRule]} % [${hitrs[1][selectedRule]}])`;

            }
        }
    }
}
var tableJoined = null;
var joinedID = -1;
var firstTime = false;

function jointable(elm, tid) {
    var elms = document.getElementById('tables').children;
    for (var i = 0; i < elms.length; i++) {
        elms[i].style.display = 'none';
    }
    elm.style = '';
    tableJoined = elm.children[1].innerText.toString();
    document.getElementById('tinfo').innerHTML = 'Loading...';
    document.getElementById('backbtn').style = "width: 20%;";
    document.getElementById('tinfo').style = 'font-size:20px; color:#fff;';
    if (tableJoined != null) {
        document.getElementById('recommend').children[1].setAttribute('data-tg-off', 'EXTRA FUNCTIONS: NO');
        document.getElementById('recommend').children[1].setAttribute('data-tg-on', 'EXTRA FUNCTIONS: YES');
        document.getElementById('rsettings').style = 'display:none;';
        document.getElementById('recommend').children[2].innerHTML = 'Switch side';
        document.getElementById('recommend').style = '';
        joinedID = tid;
        document.getElementById('tinfo').innerHTML = `${tid}, ${tableJoined}, ${tableNames.toString()}`;

        if (joinedID != -1) {
            checkForPredictions(joinedID);
            if (recommendBets >= 0) {
                var hitrs = checkHitRate(joinedID);
                var originText = recommendTexts[recommendBets];
                for (var h = 0; h < recommendTexts[recommendBets].length; h++) {
                    document.getElementById('rsettings').children[1].children[h].children[0].innerText = `${originText[h]} (${hitrs[0][h]}% [${hitrs[1][h]}])`;

                    }
                    var selectedRule = rset.getIndex();
                    if (selectedRule == -1) {
                        selectedRule = 0;
                    }
                document.getElementById('selectrset').innerHTML = `${originText[selectedRule]} (${hitrs[0][selectedRule]}% [${hitrs[1][selectedRule]}])`;

            }
        }
    }
}

function exitTable() {
    if (tableJoined != null) {
        if (chartShown) {
            hideChart();
        }
        document.getElementById('recommend').style = 'display:none;';
        joinedID = -1;
        var elms = document.getElementById('tables').children;
        for (var i = 0; i < elms.length; i++) {
            elms[i].style = '';
        }
        tableJoined = null;
        document.getElementById('backbtn').style = "width: 20%; display: none;";
        document.getElementById('tinfo').style = 'visibility:hidden;';
        document.getElementById('tinfo').innerHTML = '';
    }
}
var numbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
var numbers_terminals = {};
numbers_terminals[0] = [4, 6];
numbers_terminals[1] = [8];
numbers_terminals[2] = [7, 9];
numbers_terminals[3] = [8];
numbers_terminals[4] = [11];
numbers_terminals[5] = [12, 10];
numbers_terminals[6] = [11];
numbers_terminals[7] = [14, 2];
numbers_terminals[8] = [15, 13, 3, 1];
numbers_terminals[9] = [14, 2];
numbers_terminals[10] = [17, 5];
numbers_terminals[11] = [18, 16, 6, 4];
numbers_terminals[12] = [17, 5];
numbers_terminals[13] = [20, 23];
numbers_terminals[14] = [9, 21, 7, 19];
numbers_terminals[15] = [8, 20];
numbers_terminals[16] = [11];
numbers_terminals[17] = [12, 24, 10, 22];
numbers_terminals[18] = [11, 23];
numbers_terminals[19] = [14, 26];
numbers_terminals[20] = [13, 25, 15, 27];
numbers_terminals[21] = [14, 26];
numbers_terminals[22] = [17, 29];
numbers_terminals[23] = [18, 30, 16, 28];
numbers_terminals[24] = [17, 29];
numbers_terminals[25] = [20, 32];
numbers_terminals[26] = [19, 31, 33, 21];
numbers_terminals[27] = [20, 32];
numbers_terminals[28] = [23, 35];
numbers_terminals[29] = [22, 34, 24, 36];
numbers_terminals[30] = [23, 35];
numbers_terminals[31] = [26];
numbers_terminals[32] = [25, 27];
numbers_terminals[33] = [26];
numbers_terminals[34] = [29];
numbers_terminals[35] = [28, 30];
numbers_terminals[36] = [29];
var lastPrediction = -1;
var winsP = 0;
var totalP = 0;
var WLStreak = [];
var SwitchSide = false;
var SavedStreak = [];
var PredictionWLBet = [];
var savedspins = [];
var maxDist = 7;

function getLossStreaks(wins) {
    const streaks = [];
    let count = 0;
    for (const win of wins) {
        if (!win) {
            count++;
        } else {
            if (count > 0) streaks.push(count);
            count = 0;
        }
    } // Handle last streak if it ends with losses 
    if (count > 0) streaks.push(count);
    return streaks;
}

function checkHot(data) {
    var table = joinedID;
    var winAmounts = getLossStreaks(data);
    if (winAmounts.length == 0) {
        document.getElementById('hotstreak' + table).style.visibility = '';
        return true;
    }
    var streak = winAmounts[0];
    if (streak > 1 || winAmounts.length > 2) {
        document.getElementById('hotstreak' + table).style.visibility = 'hidden';
        return false;
    }
    for (var i = 0; i < winAmounts.length; i++) {
        if (streak != winAmounts[i]) {
            document.getElementById('hotstreak' + table).style.visibility = 'hidden';
            return false;
        }
    }
    document.getElementById('hotstreak' + table).style.visibility = '';
    return true;
}

function PredictionWL() {
    var r = -1;
    if (nextResultAction == 1) {
        r = nextResultNumber;
        r = countPockets(r, Math.floor(Math.random() * maxDist), Math.round(Math.random() * 1));
    } else if (nextResultAction == 0) {
        r = nextResultNumber;
        r = countPockets(r, 8 + Math.floor(Math.random() * 10), Math.round(Math.random() * 1));
    }
    PredictionWLBet = doPlace(r, POCKETS);
    var result = r;
    var winspt = 0;
    var totalpt = 0;
    var wlstrk = [];
    savedspins = [];
    for (var i = SavedStreak.length - 1; i >= 0; i--) {
        wlstrk.push(SavedStreak[i]);
    }
    for (var i = 0; i < wlstrk.length; i++) {
        totalpt++;
        if (wlstrk[i].substring(29, 30) == 'W') {
            winspt++;
            savedspins.push(true);
        } else {
            savedspins.push(false);
        }
    }
    savedspins.reverse();
    savedspins = savedspins.slice(-6);
    var whistory = [];
    for (var i = 0; i < wlstrk.length; i++) {
        whistory.push(wlstrk[i].substring(29, 30));
    }
    var resultPattern = predictNext(whistory);
    var patternwl = resultPattern.prediction;
    if (patternwl == 'W') {
        patternwl = 'WIN';
    } else {
        patternwl = 'LOSE'
    }
    var morextra = '';
    if (Object.keys(resultPattern.details).indexOf('W') != -1) {
        morextra += `W(${resultPattern.details.W})`;
    }
    if (Object.keys(resultPattern.details).indexOf('L') != -1) {
        morextra += `,L(${resultPattern.details.L})`;
    }
    checkHot(savedspins);
    console.log(whistory);
    console.log(wlstrk);
    extra = `Pattern Predicted next: ${patternwl}`;

    document.getElementById('tinfo').innerHTML = `
    <span class="futuristic-text" style="font-size:22px;">
        Prediction: <span style="color:#ffcc00;">${result}</span>
        <span style="font-size:14px; vertical-align:super; color:#ffcc00;">n7</span>
        (W - RATE:
        <span style="color:#00ffcc;">
            ${((winsP / totalP) * 100).toFixed(2)} %
        </span>)
    </span>
    <br><br>
    <span class="futuristic-text" style="font-size:20px;">
        W / L Streak:
        ${wlstrk.map(x =>
            `<span style="color:${x === 'W' ? '#00ffcc' : '#ff3d3d'};">${x}</span>`
        ).join(', ')}
    </span>
    <br><br>
    ${extra}`;
}

function calculatePrediction(n1, n2, diff = 0) {
    if (lastPrediction != -1) {
        var won = doPlace(lastPrediction, POCKETS).indexOf(n2) != -1;
        totalP++;
        if (won) {
            winsP++;
            WLStreak.push('W');
        } else {
            WLStreak.push('L');
        }
        spins.push(won);
        if (spins.length > LAST_N_SPINS) spins.shift(); //console.log(winsP, totalP);
    }
    var dist = findDistance(n1, n2);
    var r = countPockets(n2, dist[0], dist[1]);
    if (SwitchSide) {
        r = countPockets(r, 18, 0);
    }
    r += OFFSET;
    if (r > 36) {
        r -= 36;
    }
    if (r < 0) {
        r -= r * 2;
    }
    lastPrediction = r; //console.log(n1, n2);
    return r;
}
document.addEventListener('keypress', logKey);

function logKey(e) {
    console.log(e.code);
    if (e.code == 'BracketLeft') {
        nextResultAction = 1;
    }
    if (e.code == 'BracketRight') {
        nextResultAction = 0;
    }
    if (e.code == 'NumpadSubtract') {
        nextResultAction = -1;
    }
    if (e.code == 'Equal') {
        nextResultAction = 1;
        SavedStreak = WLStreak;
    }
    if (e.code.startsWith('Numpad')) {
        const num = Number(e.code.replace('Numpad', ''));
        if (num >= 1 && num <= 7) {
            maxDist = num;
            console.log("maxDist set to:", maxDist);
        }
    }
}
var confirmations = [0, 0, 0, 0, 0, 0];
var latestSave = null;

function checkForPredictions(table) {
    if (nextResultAction != -1) {
        var wNumber = tableNumbers[table][0];
        if (PredictionWLBet.length > 0) {
            if (latestSave != null) {
                if (new Date() - latestSave < 10 * 1000) {
                    return;
                }
            }
            latestSave = new Date();
            SavedStreak.splice(0, 1);
            if (PredictionWLBet.indexOf(wNumber) != -1) {
                SavedStreak.push('W');
            } else {
                SavedStreak.push('L');
            }
        }
        PredictionWL();
        return;
    }
    lastNumbers = [];
    confirmations = [0, 0, 0, 0, 0, 0];
    lastPrediction = -1;
    winsP = 0;
    totalP = 0;
    WLStreak = [];
    spins = [];
    for (var i = tableNumbers[table].length - 1; i >= 0; i--) {
        lastNumbers.push(tableNumbers[table][i]);
        if (lastNumbers.length >= 3) {
            lookForPrediction();
        }
    }
}

function findVAArray(array, value) {
    var am = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] == value) {
            am++;
        }
    }
    return am;
}
Array.maxi = function(array) {
    return array.indexOf(Math.max.apply(Math, array));
};
Array.mini = function(array) {
    return array.indexOf(Math.min.apply(Math, array));
};
Array.max = function(array) {
    return Math.max.apply(Math, array);
};
Array.min = function(array) {
    return Math.min.apply(Math, array);
};

function retArrValue(array, value) {
    var indexes = [];
    for (var i = 0; i < array.length; i++) {
        if (array[i] == value) {
            indexes.push(i);
        }
    }
    return indexes;
}

function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.drop li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}
DropDown.prototype = {
    initEvents: function() {
        var obj = this;
        obj.dd.on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).toggleClass('active');
        });
        obj.opts.on('click', function() {
            var opt = $(this);
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);
            opt.siblings().removeClass('selected');
            opt.filter(':contains("' + obj.val + '")').addClass('selected');
            settingsChanged();
        }).change();
    },
    getValue: function() {
        return this.val;
    },
    getIndex: function() {
        return this.index;
    }
};

function doRecommend(confs, dists) {
    if (recommendBets == -1) {
        return -1;
    }
    var choosen = -1;
    var settings = rset.getIndex();
    var options = 6 - findVAArray(confs, 0);
    if (recommendBets == 1) {
        /* 0 - 1 + 2 - & -1 3 - & +1 4 + & -1 5 + & +1 */
        if (settings == -1 || settings == 0) {
            choosen = 0;
        } else {
            choosen = settings;
        }
        if (confs[choosen] == 0) {
            choosen = -1;
        }
        return choosen;
    }
    if (settings == -1 || settings == 0) {
        var ci = Array.maxi(confs);
        var di = Array.mini(dists);
        var dis = Array.min(dists);
        var con = Array.max(confs);
        if (findVAArray(confs, con) == 1) {
            if (con > 1) {
                choosen = ci;
            }
        } else if (options > 1) {
            var arrin = retArrValue(confs, con);
            var lowd = [];
            for (var i = 0; i < arrin.length; i++) {
                lowd.push(dists[arrin[i]]);
            }
            if (findVAArray(lowd, Array.min(lowd)) == 1) {
                choosen = arrin[Array.mini(lowd)];
            }
        }
    }
    if (settings == 1) {
        for (var i = 0; i < dists.length; i++) {
            if (dists[i] == Infinity) {
                dists[i] = -1;
            }
        }
        var ci = Array.maxi(confs);
        var di = Array.maxi(dists);
        var dis = Array.max(dists);
        var con = Array.max(confs);
        if (findVAArray(confs, con) == 1) {
            if (con > 1) {
                choosen = ci;
            }
        } else if (options > 1) {
            var arrin = retArrValue(confs, con);
            var lowd = [];
            for (var i = 0; i < arrin.length; i++) {
                lowd.push(dists[arrin[i]]);
            }
            if (findVAArray(lowd, Array.max(lowd)) == 1) {
                choosen = arrin[Array.maxi(lowd)];
            }
        }
    }
    if (settings == 2 && options > 1) {
        var di = Array.mini(dists);
        var dis = Array.min(dists);
        var arrin = retArrValue(dists, dis);
        var lowd = [];
        for (var i = 0; i < arrin.length; i++) {
            lowd.push(dists[arrin[i]]);
        }
        if (findVAArray(lowd, Array.min(lowd)) == 1) {
            choosen = arrin[Array.mini(lowd)];
        }
    }
    if (settings == 3 && options > 1) {
        for (var i = 0; i < dists.length; i++) {
            if (dists[i] == Infinity) {
                dists[i] = -1;
            }
        }
        var di = Array.maxi(dists);
        var dis = Array.max(dists);
        var arrin = retArrValue(dists, dis);
        var lowd = [];
        for (var i = 0; i < arrin.length; i++) {
            lowd.push(dists[arrin[i]]);
        }
        if (findVAArray(lowd, Array.max(lowd)) == 1) {
            choosen = arrin[Array.maxi(lowd)];
        }
    }
    return choosen;
}

function cRecommend(confs, dists, set) {
    if (recommendBets == -1) {
        return -1;
    }
    var choosen = -1;
    var settings = set;
    var options = 6 - findVAArray(confs, 0);
    if (recommendBets == 1) {
        /* 0 - 1 + 2 - & -1 3 - & +1 4 + & -1 5 + & +1 */
        if (settings == -1 || settings == 0) {
            choosen = 0;
        } else {
            choosen = settings;
        }
        if (confs[choosen] == 0) {
            choosen = -1;
        } //console.log(choosen, confs);
        return choosen;
    }
    if (settings == -1 || settings == 0) {
        var ci = Array.maxi(confs);
        var di = Array.mini(dists);
        var dis = Array.min(dists);
        var con = Array.max(confs);
        if (findVAArray(confs, con) == 1) {
            if (con > 1) {
                choosen = ci;
            }
        } else if (options > 1) {
            var arrin = retArrValue(confs, con);
            var lowd = [];
            for (var i = 0; i < arrin.length; i++) {
                lowd.push(dists[arrin[i]]);
            }
            if (findVAArray(lowd, Array.min(lowd)) == 1) {
                choosen = arrin[Array.mini(lowd)];
            }
        }
    }
    if (settings == 1) {
        for (var i = 0; i < dists.length; i++) {
            if (dists[i] == Infinity) {
                dists[i] = -1;
            }
        }
        var ci = Array.maxi(confs);
        var di = Array.maxi(dists);
        var dis = Array.max(dists);
        var con = Array.max(confs);
        if (findVAArray(confs, con) == 1) {
            if (con > 1) {
                choosen = ci;
            }
        } else if (options > 1) {
            var arrin = retArrValue(confs, con);
            var lowd = [];
            for (var i = 0; i < arrin.length; i++) {
                lowd.push(dists[arrin[i]]);
            }
            if (findVAArray(lowd, Array.max(lowd)) == 1) {
                choosen = arrin[Array.maxi(lowd)];
            }
        }
    }
    if (settings == 2 && options > 1) {
        var di = Array.mini(dists);
        var dis = Array.min(dists);
        var arrin = retArrValue(dists, dis);
        var lowd = [];
        for (var i = 0; i < arrin.length; i++) {
            lowd.push(dists[arrin[i]]);
        }
        if (findVAArray(lowd, Array.min(lowd)) == 1) {
            choosen = arrin[Array.mini(lowd)];
        }
    }
    if (settings == 3 && options > 1) {
        for (var i = 0; i < dists.length; i++) {
            if (dists[i] == Infinity) {
                dists[i] = -1;
            }
        }
        var di = Array.maxi(dists);
        var dis = Array.max(dists);
        var arrin = retArrValue(dists, dis);
        var lowd = [];
        for (var i = 0; i < arrin.length; i++) {
            lowd.push(dists[arrin[i]]);
        }
        if (findVAArray(lowd, Array.max(lowd)) == 1) {
            choosen = arrin[Array.maxi(lowd)];
        }
    }
    return choosen;
}
var distances = [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity];

function buildPredictionString(p, pt) {
    var plN = getNPlacing(p);
    var pre = '';
   if (plN.length > 0) {
        pre += `
            ${p}
            n${plN[0]}
        `;

        for (var i = 1; i < plN.length; i++) {
            pre += `
            ${pt[i - 1]}
            n${plN[i]}
            `;
        }
    }
    return pre;
}

function lookForPrediction() {
    var lnl = lastNumbers.length - 2;
    if (lnl <= 0) {
        return;
    }
    var n2 = lastNumbers[lnl];
    var n1 = lastNumbers[lnl - 1];
    var won = lastNumbers[lnl + 1];
    var found = false;
    var results = [n1, -n1];
    var PlayType = ['+', '-', '-'];
    var pelement = document.getElementById('prediction');
    var havePrediction = false;
    var result = n2 - n1;
    var playstr = ['', '', '', '', '', ''];
    var result = calculatePrediction(n2, won);
    var wlstrk = [];
    var pattern = []; // Example usage: 
    var extra = '';
if (WLStreak.length == 9) {
    var whistory = [];

    for (var i = 0; i < WLStreak.length; i++) {
        whistory.push(WLStreak[i].substring(29, 30));
    }

    var resultPattern = predictNext(whistory);

    for (var i = WLStreak.length - 1; i >= 0; i--) {
        wlstrk.push(WLStreak[i]);
    }

    var patternwl = resultPattern.prediction;

    if (patternwl == 'W') {
        patternwl = 'WIN';
    } else {
        patternwl = 'LOSE';
    }

    var morextra = '';

    if (Object.keys(resultPattern.details).indexOf('W') != -1) {
        morextra += `W(${resultPattern.details.W})`;
    }

    if (Object.keys(resultPattern.details).indexOf('L') != -1) {
        morextra += `, L(${resultPattern.details.L})`;
    }

    extra = `
Pattern Predicted next: ${patternwl}
Pattern Count: ${morextra}
`;
}

const status = checkSafeMode(spins);

document.getElementById('tinfo').innerHTML = `
<span class="futuristic-text" style="font-size:22px;">
        Prediction: <span style="color:#ffcc00;">${result}</span>
        <span style="font-size:14px; vertical-align:super; color:#ffcc00;">n7</span>
        (W - RATE:
        <span style="color:#00ffcc;">
            ${((winsP / totalP) * 100).toFixed(2)} %
        </span>)
    </span>
    <br><br>

<span class="futuristic-text" style="font-size:20px;">
    W / L Streak:
    ${wlstrk.map(x =>
        `<span style="color:${x === 'W' ? '#00ffcc' : '#ff3d3d'};">${x}</span>`
    ).join(', ')}
</span>

<br><br>


<span class="futuristic-text" style="font-size:18px;">
    BET (SAFEMODE):
    <span style="color:${status.stopBetting ? '#ff3d3d' : '#00ffcc'};">
        ${status.stopBetting ? 'NO' : 'YES'}
    </span>
</span>
`;
}

function addToArray(array, what) {
    for (var i = 0; i < what.length; i++) {
        if (array.indexOf(what[i]) != -1) {
            continue;
        }
        array.push(what[i]);
    }
    return array;
}

function place(num) {
    var mybet = [];
    var bet = [];
    if (num < 0 || num > 36) {
        return mybet;
    }
    var terminals = numbers_terminals[num].length;
    if (terminals == 1) {
        mybet = addToArray(mybet, doPlace(num, 3));
        mybet = addToArray(mybet, doPlace(numbers_terminals[num][0], 3));
    }
    if (terminals == 2) {
        mybet = addToArray(mybet, doPlace(num, 1));
        mybet = addToArray(mybet, doPlace(numbers_terminals[num][0], 3));
        mybet = addToArray(mybet, doPlace(numbers_terminals[num][1], 3));
    }
    if (terminals == 4) {
        mybet = addToArray(mybet, doPlace(num, 1));
        mybet = addToArray(mybet, doPlace(numbers_terminals[num][0], 1));
        mybet = addToArray(mybet, doPlace(numbers_terminals[num][1], 1));
        mybet = addToArray(mybet, doPlace(numbers_terminals[num][2], 1));
        mybet = addToArray(mybet, doPlace(numbers_terminals[num][3], 1));
    }
    return mybet;
}

function getNPlacing(num) {
    var terminals = numbers_terminals[num].length;
    if (terminals == 1) {
        return [3, 3];
    }
    if (terminals == 2) {
        return [1, 3, 3];
    }
    if (terminals == 4) {
        return [1, 1, 1, 1, 1];
    }
}

function doPlace(num, neighbours) {
    var pn = [num];
    var ni = numbers.indexOf(num);
    for (var i = 0; i < neighbours; i++) {
        ni++;
        if (ni > 36) {
            ni = 0;
        }
        pn.push(numbers[ni]);
    }
    var ni = numbers.indexOf(num);
    for (var i = 0; i < neighbours; i++) {
        ni--;
        if (ni < 0) {
            ni = 36;
        }
        pn.push(numbers[ni]);
    }
    return pn;
}

function resultFind(res, won) {
    var usedBet = place(res);
    if (usedBet.indexOf(won) != -1) {
        return true;
    }
    return false;
}

function countPockets(number, pockets, direction) {
    var startFrom = numbers.indexOf(number);
    if (direction == 0) {
        for (var i = 0; i < pockets; i++) {
            startFrom++;
            if (startFrom > 36) {
                startFrom = 0;
            }
        }
    }
    if (direction == 1) {
        for (var i = 0; i < pockets; i++) {
            startFrom--;
            if (startFrom < 0) {
                startFrom = 36;
            }
        }
    }
    return numbers[startFrom];
}

function findDistance(number, target) {
    var terms = [number];
    var Distance = 9999;
    var direction = -1;
    for (var i = 0; i < terms.length; i++) {
        var startFrom = numbers.indexOf(terms[i]);
        for (var x = 0; x <= 36; x++) {
            if (numbers[startFrom] == target) {
                var dist = x;
                if (Distance > dist) {
                    Distance = dist;
                    direction = 0;
                }
            }
            startFrom++;
            if (startFrom > 36) {
                startFrom = 0;
            }
        }
        var startFrom = numbers.indexOf(terms[i]);
        for (var x = 0; x <= 36; x++) {
            if (numbers[startFrom] == target) {
                var dist = x;
                if (Distance > dist) {
                    Distance = dist;
                    direction = 1;
                }
            }
            startFrom--;
            if (startFrom < 0) {
                startFrom = 36;
            }
        }
    }
    return [Distance, direction];
}