//url:logauto.js

var pragmaticTables = 1;
var pragmaticIDs = [204,227,230];
var reds = [32,19,21,25,27,34,36,30,23,5,16,1,14,9,18,7,12,3];
var tablesID = ['7x0b1tgh7agmf6hv', '48z5pjps3ntvqc1b', 'vctlz20yfnmp1ylr','lkcbrbdckjxajdol', 'wzg6kdkad1oe7m5k', 'LightningTable01', '01rb77cq1gtenhmo', '8clwnwrupuvf0osq', 'PorROU0000000001', 'n4jwxsz2x4tqitvx', 'zosmk25g2f768o52', 'r5aw9yumyaxgnd90'];
var tableNames = [];
var tableNumbers = {};
var tconfirmations = {};
var longtNumbers = {};
var lastNumbers = [];
var recommendTexts = {};

recommendTexts[0] = [
  'Lowest Distance & Confirmed Spins',
  'Highest Distance & Confirmed Spins',
  'Only Lowest Distance',
  'Only Highest Distance'
];

recommendTexts[1] = [
  'Only (-)',
  'Only (+)',
  'Only (- & -1)',
  'Only (- & +1)',
  'Only (+ & -1)',
  'Only (+ & +1)'
];
function loadScripts(url) {
  var scripts = document.createElement('script');
  scripts.src = url;
  document.getElementsByTagName('head')[0].appendChild(scripts);
  
}
var hitNumbers = [];
var whatToBet = {};
var rulesHit = 0;
var ndI = 0;
function checkHitRate(tid) {
  var hitrates = [];
  var hitratesText = [];
  if(recommendBets == 0) {
    for(var hit = 0; hit <= 3; hit++) {
      rulesHit = hit;
      wins = 0;
      total = 0;
      ndI = longtNumbers[tid].length-1;
      hitNumbers = [];
      whatToBet[0] = [];
      whatToBet[1] = [];
      whatToBet[2] = [];
      whatToBet[3] = [];
      whatToBet[4] = [];
      whatToBet[5] = [];
      hconfirmations = [1,1,1,1,1,1];
      hdistances = [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity];
      while(true) {
        if(ndI == 0) {
          break;
        }
        ndI--;
        hitNumbers.push(longtNumbers[tid][ndI]);
        calculateHitrate();
      }
      if(total > 0) {
        hitrates.push(Number(((wins/total)*100).toFixed(2)));
        hitratesText.push(`${wins}/${total}`);
      }
      else {
        hitrates.push(Number(0).toFixed(2));
        hitratesText.push('0/0');
      }
    }
  }
  if(recommendBets == 1) {
    for(var hit = 0; hit <= 5; hit++) {
      rulesHit = hit;
      wins = 0;
      total = 0;
      ndI = longtNumbers[tid].length-1;
      hitNumbers = [];
      whatToBet[0] = [];
      whatToBet[1] = [];
      whatToBet[2] = [];
      whatToBet[3] = [];
      whatToBet[4] = [];
      whatToBet[5] = [];
      hconfirmations = [1,1,1,1,1,1];
      hdistances = [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity];
      while(true) {
        if(ndI == 0) {
          break;
        }
        ndI--;
        hitNumbers.push(longtNumbers[tid][ndI]);
        calculateHitrate();
      }
      if(total > 0) {
        hitrates.push(Number(((wins/total)*100).toFixed(2)));
        hitratesText.push(`${wins}/${total}`);
      }
      else {
        hitrates.push(Number(0).toFixed(2));
        hitratesText.push(`0/0`);
      }
    }
  }
  return [hitrates,hitratesText];
}


var wins = 0;
var total = 0;
var hconfirmations = [1,1,1,1,1,1];
var hdistances = [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity];
function calculateHitrate() {
  var lnl = hitNumbers.length-2;
  if(lnl <= 0) {
    return;
  }
  var n2 = hitNumbers[lnl];
  var n1 = hitNumbers[lnl-1];
  var won = hitNumbers[lnl+1];
  var wonN = won;
  var found = false;
  var results = [n1, -n1];
  var PlayType =  ['+', '-', '-'];
  var havePrediction = false;
  var result = n2-n1;
  var playstr = '';
  var result = calculatePrediction(n1, -n2);
  hdistances = [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity];
  if(result >= 0) {
    if(resultFind(result, won)) {
      var prediction = calculatePrediction(n2, -won);
      if(prediction != -1) {
        hconfirmations[0]++;
        whatToBet[0] = prediction;
        havePrediction = true;
        hdistances[0] = findDistance(result, won);
      }
      else {
        hconfirmations[0]=0;
      }
    }
    else {
      hconfirmations[0]=0;
    }
    
  }
  var result = calculatePrediction(n1, n2);
  if(result <= 36 && result != -1) {
    if(resultFind(result, won)) {
      var prediction = calculatePrediction(n2, won);
      if(prediction != -1) {
        hconfirmations[1]++;
        whatToBet[1] = prediction;
        havePrediction = true;
        hdistances[1] = findDistance(result, won);
      }
      else {
        hconfirmations[1]=0;
      }
    }
    else {
      hconfirmations[1]=0;
    }
  }

  var result = calculatePrediction(n1, -n2, -1);
  if(result >= 0) {
    if(resultFind(result, won)) {
      var prediction = calculatePrediction(n2, -won, -1);
      if(prediction != -1) {
        hconfirmations[2]++;
        whatToBet[2] = prediction;
        havePrediction = true;
        hdistances[2] = findDistance(result, won);
      }
      else {
        hconfirmations[2]=0;
      }
    }
    else {
      hconfirmations[2]=0;
    }
  }
  var result = calculatePrediction(n1, -n2, 1);
  if(result >= 0) {
    if(resultFind(result, won)) {
      var prediction = calculatePrediction(n2, -won, 1);
      if(prediction != -1) {
        hconfirmations[3]++;
        whatToBet[3] = prediction;
        havePrediction = true;
        hdistances[3] = findDistance(result, won);
      }
      else {
        hconfirmations[3]=0;
      }
    }
    else {
      hconfirmations[3]=0;
    }
  }
  var result = calculatePrediction(n1, n2, -1);
  if(result <= 36 && result != -1) {
    if(resultFind(result, won)) {
      var prediction = calculatePrediction(n2, won, -1);
      if(prediction != -1) {
        hconfirmations[4]++;
        whatToBet[4] = prediction;
        havePrediction = true;
        hdistances[4] = findDistance(result, won);
      }
      else {
        hconfirmations[4]=0;
      }
    }
    else {
      hconfirmations[4]=0;
    }
  }
  var result = calculatePrediction(n1, n2, 1);
  if(result <= 36 && result != -1) {
    if(resultFind(result, won)) {
      var prediction = calculatePrediction(n2, won, 1);
      if(prediction != -1) {
        hconfirmations[5]++;
        whatToBet[5] = prediction;
        havePrediction = true;
        hdistances[5] = findDistance(result, won);
      }
      else {
        hconfirmations[5]=0;
      }
    }
    else {
      hconfirmations[5]=0;
    }
  }
  var betIndex = cRecommend(hconfirmations, hdistances, rulesHit);
  if(betIndex != -1) {
    var bid = betIndex;
    if(whatToBet[bid].length == 0) {
      return;
    }
    var prediction = whatToBet[bid];
    var mybet = place(prediction);
    var wnn = ndI-1;
    if(wnn!= -1) {
      var won = mybet.indexOf(longtNumbers[joinedID][wnn]) != -1;
      total++;
     // console.log(n1,n2,longtNumbers[joinedID][wnn],won);
      var options = 6-findVAArray(hconfirmations , 0);
      if(won) {
        wins++;
      }
    }
  }
}

loadScripts('https://code.jquery.com/jquery-3.6.0.js');
var lastNS = {};
for(var i = 0; i < tablesID.length+pragmaticTables; i++) {
  tableNumbers[i] = [];
  longtNumbers[i] = [];
  tconfirmations[i] = [0,0,0,0,0,0];
  lastNS[i] = [];
}

var socket = io('http://54.38.159.96');
socket.on('newConnections', function(data) {
  document.getElementById('onlineusers').innerHTML = data;
});
// Listen for messages
socket.on('pragmaticTablesUpdate', function(data) {
    //console.log(data);
    var tid = pragmaticIDs.indexOf(Number(data[1]));
    if(tid != -1) {
      tid = tablesID.length+tid;
      var results = data[0];
      var txt = '&nbsp;';
      tableNumbers[tid] = []
      longtNumbers[tid] = [];
        for(var i = 0; i < 12; i++) {
          var num = Number(data[0][i]);
          tableNumbers[tid].push(num);
          var isRed = reds.indexOf(num) != -1;
          var color = '2bff47'
          if(isRed) {
            color = 'ff3d3d';
          }
          else if(num != 0) {
            color = 'fff';
          }
          var extra = '';
          if(i == 0) {
            extra = 'background-color: #737373; padding:4px;';
          }
          txt += `<span style="color:#${color}; ${extra}">${num}</span>&nbsp;`;
        }
        for(var i = 0; i < 20; i++) {
          longtNumbers[tid].push(data[0][i]);
        }

        document.getElementById(`numbers_table_${tid}`).innerHTML = txt;
    if(tableJoined != null) {
     
      if(joinedID != -1) {
        checkForPredictions(joinedID);
        if(recommendBets != -1) {
          var hitrs = checkHitRate(joinedID);
          var originText = recommendTexts[recommendBets];
          for(var h = 0; h < recommendTexts[recommendBets].length; h++) {
            document.getElementById('rsettings').children[1].children[h].children[0].innerText = `${originText[h]} (${hitrs[0][h]}% [${hitrs[1][h]}])`;
          }
          var selectedRule = rset.getIndex();
          if(selectedRule == -1) {
            selectedRule = 0;
          }
          document.getElementById('selectrset').innerHTML = `${originText[selectedRule]} (${hitrs[0][selectedRule]}% [${hitrs[1][selectedRule]}])`; 
        }
      }
    }
      lastNS[tid] = [];
      tconfirmations[tid] = [0,0,0,0,0,0];
      var cspins = 0;
      for(var zz = tableNumbers[tid].length-1; zz > 0; zz--) {
          lastNS[tid].push(tableNumbers[tid][zz]);
          if(lastNS[tid].length >= 3) {
            cspins = getTableConfirmedSpins(tid);
          }
      }
      document.getElementById(`cts${tid}`).innerHTML = `Confirmed by ${cspins} spin(s)`;


  }
});
socket.on('tablesDataPragmatic', function(data) {
  for(var i = 0; i < data[3].length; i++) {
      var idd = data[3][i];
      if(pragmaticIDs.indexOf(idd) != -1) {
        var tname = data[0][idd];
        var tid = tablesID.length+pragmaticIDs.indexOf(idd);
          tableNumbers[tid] = [];
          longtNumbers[tid] = data[2][idd];

          var url =data[1][idd];
          
          var txt = '';
          for(var x = 0; x < 12; x++) {
            var num = Number(data[2][idd][x]);
            tableNumbers[tid].push(num);
            var isRed = reds.indexOf(num) != -1;
            var color = '2bff47'
            if(isRed) {
              color = 'ff3d3d';
            }
            else if(num != 0) {
              color = 'fff';
            }
            var extra = '';
            if(x == 0) {
              extra = 'background-color: #737373; padding:4px;';
            }
            txt += `<span style="color:#${color}; ${extra}">${num}</span>&nbsp;`;
          }
           lastNS[tid] = [];

          tconfirmations[tid] = [0,0,0,0,0,0];
          var cspins = 0;
          for(var zz = tableNumbers[tid].length-1; zz >= 0; zz--) {
              lastNS[tid].push(tableNumbers[tid][zz]);
              if(lastNS[tid].length >= 3) {
                cspins = getTableConfirmedSpins(tid);
              }
          }
          var extra = `<span id="cts${tid}">Confirmed by ${cspins} spin(s)</span>`;
          document.getElementById(`cts${tid}`).innerHTML = `Confirmed by ${cspins} spin(s)`;
          document.getElementById('tables').innerHTML += `<div class="wrap wrap--1" onclick="jointable(this, ${tid});"><div style="position:absolute;left: 15%;top: 60%;font-size: 25px;font-weight: bold;background-color: rgba(0,0,0,0.5);color: #fff;">&nbsp;${extra}&nbsp;</div><div style="position:absolute;left: 3%;top: 73%;font-size: 25px;font-weight: bold; background-color: rgba(0,0,0,0.5);"><p id="numbers_table_${tid}"><span style="color:#fff;">Loading...</span></p></div><div class="container container--1" style="background:url('${url}'); background-size: 100%; background-repeat: no-repeat; z-index: -1;" > <p>${tname}</p></div></div>`;
          document.getElementById(`numbers_table_${tid}`).innerHTML = txt;

      }
          
  }
  
});
socket.on('tablesData', function(data) {
if(data.type == 'lobby.configs') {
  for(var i = 0; i < tablesID.length; i++) {
    var tid = tablesID[i];
    if(typeof data.args.configs[tid] != "undefined") {
      tableNames.push(data.args.configs[tid].title);

    }
  }
}
if(data.type == 'lobby.thumbnails') {
  var tbls = Object.keys(data.args.thumbnails);
  for(var i = 0; i < tablesID.length; i++) {

       var tid = tbls.indexOf(tablesID[i]);
       if(tid != -1) {

          var photo = data.args.thumbnails[tbls[tid]]['16:9'].L;
          var url = data.args.thumbnails[tbls[tid]].template;
          url = url.substring(0, url.length-2);
          
          var txt = '';
          for(var x = 0; x < 12; x++) {
            var num = Number(tableNumbers[i][x]);
            var isRed = reds.indexOf(num) != -1;
            var color = '2bff47'
            if(isRed) {
              color = 'ff3d3d';
            }
            else if(num != 0) {
              color = 'fff';
            }
            var extra = '';
            if(x == 0) {
              extra = 'background-color: #737373; padding:4px;';
            }
            txt += `<span style="color:#${color}; ${extra}">${num}</span>&nbsp;`;
          }
           lastNS[i] = [];

          tconfirmations[i] = [0,0,0,0,0,0];
          var cspins = 0;
          for(var zz = tableNumbers[i].length-1; zz >= 0; zz--) {
              lastNS[i].push(tableNumbers[i][zz]);
              if(lastNS[i].length >= 3) {
                cspins = getTableConfirmedSpins(i);
              }
          }
          var extra = `<span id="cts${i}">Confirmed by ${cspins} spin(s)</span>`;
          document.getElementById(`cts${tid}`).innerHTML = `Confirmed by ${cspins} spin(s)`;
          document.getElementById('tables').innerHTML += `<div class="wrap wrap--1" onclick="jointable(this, ${i});"><div style="position:absolute;left: 15%;top: 60%;font-size: 25px;font-weight: bold;background-color: rgba(0,0,0,0.5);color: #fff;">&nbsp;${extra}&nbsp;</div><div style="position:absolute;left: 3%;top: 73%;font-size: 25px;font-weight: bold; background-color: rgba(0,0,0,0.5);"><p id="numbers_table_${i}"><span style="color:#fff;">Loading...</span></p></div><div class="container container--1" style="background:url('${url+photo}'); background-repeat: no-repeat; z-index: -1;" > <p>${tableNames[i]}</p></div></div>`;
          document.getElementById(`numbers_table_${i}`).innerHTML = txt;


        }

  }
}
if(data.type == 'lobby.histories') {
    for(var x = 0; x < tablesID.length; x++) {
      var tid = Object.keys(data.args.histories).indexOf(tablesID[x]);
      if(tid != -1) {
        var results = data.args.histories[tablesID[x]].results;
        tableNumbers[x] = [];
        longtNumbers[x] = [];
        for(var i = 0; i < 12; i++) {
          var num = Number(results[i][0].number);
          tableNumbers[x].push(num);  
        }
        for(var i  = 0; i < 20; i++) {
          var num = Number(results[i][0].number);
          longtNumbers[x].push(num);
        }                    
    }
  }  
}
if(data.type == 'lobby.historyUpdated') {
    var tid = tablesID.indexOf(Object.keys(data.args)[0]);
    if(tid != -1) {
      
      var results = data.args[tablesID[tid]].results;
      var txt = '&nbsp;';
      tableNumbers[tid] = [];
      longtNumbers[tid] = [];
        for(var i = 0; i < 12; i++) {
          var num = Number(results[i][0].number);
          tableNumbers[tid].push(num);
          var isRed = reds.indexOf(num) != -1;
          var color = '2bff47'
          if(isRed) {
            color = 'ff3d3d';
          }
          else if(num != 0) {
            color = 'fff';
          }
          var extra = '';
          if(i == 0) {
            extra = 'background-color: #737373; padding:4px;';
          }
          txt += `<span style="color:#${color}; ${extra}">${num}</span>&nbsp;`;
        }
        for(var i  = 0; i < 20; i++) {
          var num = Number(results[i][0].number);
          longtNumbers[tid].push(num);
        }
        document.getElementById(`numbers_table_${tid}`).innerHTML = txt;
            if(tableJoined != null) {
     
      if(joinedID != -1) {
        checkForPredictions(joinedID);
        if(recommendBets >= 0) {
          var hitrs = checkHitRate(joinedID);
          var originText = recommendTexts[recommendBets];
          for(var h = 0; h < recommendTexts[recommendBets].length; h++) {
            document.getElementById('rsettings').children[1].children[h].children[0].innerText = `${originText[h]} (${hitrs[0][h]}% [${hitrs[1][h]}])`;
          }
          var selectedRule = rset.getIndex();
          if(selectedRule == -1) {
            selectedRule = 0;
          }
          document.getElementById('selectrset').innerHTML = `${originText[selectedRule]} (${hitrs[0][selectedRule]}% [${hitrs[1][selectedRule]}])`; 
        }
      }
     
    }
      lastNS[tid] = [];
      tconfirmations[tid] = [0,0,0,0,0,0];
      var cspins = 0;
      for(var zz = tableNumbers[tid].length-1; zz >= 0; zz--) {
          lastNS[tid].push(tableNumbers[tid][zz]);
          if(lastNS[tid].length >= 3) {
            cspins = getTableConfirmedSpins(tid);
          }
      }
      document.getElementById(`cts${tid}`).innerHTML = `Confirmed by ${cspins} spin(s)`;

  }
  
}

 });

var rset = null;
var recommendBets = -1;
function settingsChanged() {
  if(recommendBets == -1) {
    return;
  }
  if(tableJoined != null) {
      if(joinedID != -1) {
        checkForPredictions(joinedID);
      }
    }
}
function changeSet() {
  recommendBets = Number(!recommendBets);
  var moredsp = 'none';
  if(recommendBets == 1) {
    moredsp = '';
  }
  document.getElementById('rsettings').children[1].children[4].style.display = moredsp;
  document.getElementById('rsettings').children[1].children[5].style.display = moredsp;
  if(tableJoined != null) {
      if(joinedID != -1) {
        checkForPredictions(joinedID);
        if(recommendBets >= 0) {
          var hitrs = checkHitRate(joinedID);
          var originText =recommendTexts[recommendBets];
          for(var h = 0; h < recommendTexts[recommendBets].length; h++) {
            document.getElementById('rsettings').children[1].children[h].children[0].innerText = `${originText[h]} (${hitrs[0][h]}% [${hitrs[1][h]}])`;
          }
          var selectedRule = rset.getIndex();
          if(selectedRule == -1) {
            selectedRule = 0;
          }
          document.getElementById('selectrset').innerHTML = `${originText[selectedRule]} (${hitrs[0][selectedRule]}% [${hitrs[1][selectedRule]}])`; 
        }
      }
    }
}
function useRecommended() {
  if(recommendBets == -1) {
    recommendBets = 1;
    document.getElementById('changebtn').style.display = '';
  }
  else {
    recommendBets = -1;
    document.getElementById('changebtn').style.display = 'none';
  }
  var moredsp = 'none';
  if(recommendBets == 1) {
    moredsp = '';
  }
  document.getElementById('rsettings').children[1].children[4].style.display = moredsp;
  document.getElementById('rsettings').children[1].children[5].style.display = moredsp;
  if(recommendBets >= 0) {
     if(!firstTime) {
      firstTime = true;
       rset = new DropDown($('#rsettings'));
        $(function () {
          $(document).click(function () {
              // close menu on document click
              $('.wrap-drop').removeClass('active');
          });
      });
    }
  }
  if(tableJoined != null) {
      if(joinedID != -1) {
        checkForPredictions(joinedID);
        if(recommendBets >= 0) {
          var hitrs = checkHitRate(joinedID);
          var originText =recommendTexts[recommendBets];
          for(var h = 0; h < recommendTexts[recommendBets].length; h++) {
            document.getElementById('rsettings').children[1].children[h].children[0].innerText = `${originText[h]} (${hitrs[0][h]}% [${hitrs[1][h]}])`;
          }
          var selectedRule = rset.getIndex();
          if(selectedRule == -1) {
            selectedRule = 0;
          }
          document.getElementById('selectrset').innerHTML = `${originText[selectedRule]} (${hitrs[0][selectedRule]}% [${hitrs[1][selectedRule]}])`; 
        }
      }
    }
}
var tableJoined = null;
var joinedID = -1;
var firstTime=false;
function jointable(elm, tid) {
  
  var elms = document.getElementById('tables').children;
  for(var i = 0; i < elms.length; i++) {
      elms[i].style.display = 'none';
  }
  elm.style = '';
  tableJoined = elm.children[1].innerText.toString();
  document.getElementById('tinfo').innerHTML = 'Loading...';
  document.getElementById('backbtn').style="width: 20%;";
  document.getElementById('tinfo').style = 'font-size:20px; color:#fff;';
  if(tableJoined != null) {
      document.getElementById('recommend').style = '';
      joinedID = tid;
      document.getElementById('tinfo').innerHTML = `${tid}, ${tableJoined}, ${tableNames.toString()}`;
      if(joinedID != -1) {
        checkForPredictions(joinedID);
        if(recommendBets >= 0) {
          var hitrs = checkHitRate(joinedID);
          var originText = recommendTexts[recommendBets];
          for(var h = 0; h < recommendTexts[recommendBets].length; h++) {
            document.getElementById('rsettings').children[1].children[h].children[0].innerText = `${originText[h]} (${hitrs[0][h]}% [${hitrs[1][h]}])`;
          }
          var selectedRule = rset.getIndex();
          if(selectedRule == -1) {
            selectedRule = 0;
          }
          document.getElementById('selectrset').innerHTML = `${originText[selectedRule]} (${hitrs[0][selectedRule]}% [${hitrs[1][selectedRule]}])`; 
        }
      }
    }

}

function exitTable() {
  if(tableJoined != null) {
      document.getElementById('recommend').style = 'display:none;';
      joinedID = -1;
      var elms = document.getElementById('tables').children;
      for(var i = 0; i < elms.length; i++) {
          elms[i].style = '';
      }
      tableJoined = null;
      document.getElementById('backbtn').style="width: 20%; display: none;";
      document.getElementById('tinfo').style = 'visibility:hidden;';
      document.getElementById('tinfo').innerHTML = '';
  }
}


var numbers = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
var numbers_terminals = {};
numbers_terminals[0] = [4,6];
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
function calculatePrediction(n1,n2, diff=0) {
  var r = n1+n2;
  if(r < 0) {
    r -= r*2;
  }
  if(r < 0) {
    r = -1;
  }
  if(r > 36) {
    r = -1;
  }
  if(r >= 0 && r <= 36) {
    r += diff;
    if(r < 0) {
      r -= r*2;
    }
    if(r > 36) {
      r = -1;
    }
  }
  return r;
}
var confirmations = [0,0,0,0,0,0];
function checkForPredictions(table) {
  lastNumbers = [];
  confirmations = [0,0,0,0,0,0];
  for(var i = tableNumbers[table].length-1; i >= 0; i--) {
     lastNumbers.push(tableNumbers[table][i]);
     if(lastNumbers.length >= 3) {
        lookForPrediction();
     }
  }
 
}


function findVAArray(array, value) {
  var am = 0;
  for(var i = 0; i < array.length; i++) {
    if(array[i] == value) {
      am++;
    }
  }
  return am;
}

Array.maxi = function( array ){
    return array.indexOf(Math.max.apply( Math, array ));
};
Array.mini = function( array ){
    return array.indexOf(Math.min.apply( Math, array ));
};
Array.max = function( array ){
    return Math.max.apply( Math, array );
};
Array.min = function( array ){
    return Math.min.apply( Math, array );
};

function retArrValue(array, value) {
  var indexes = [];
  for(var i = 0; i < array.length; i++) {
    if(array[i] == value) {
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
    initEvents: function () {
        var obj = this;
        obj.dd.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).toggleClass('active');
        });
        obj.opts.on('click', function () {
            var opt = $(this);
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);
            opt.siblings().removeClass('selected');
            opt.filter(':contains("' + obj.val + '")').addClass('selected');
            settingsChanged();
        }).change();
    },
    getValue: function () {
        return this.val;
    },
    getIndex: function () {
        return this.index;
    }
};



function doRecommend(confs, dists) {
  if(recommendBets == -1) {
    return -1;
  }
  var choosen = -1;
  var settings = rset.getIndex();
  var options = 6-findVAArray(confs , 0);
  if(recommendBets == 1) {
      /* 
      0 -
      1 +
      2 - & -1
      3 - & +1
      4 + & -1
      5 + & +1
      */

    if(settings == -1 || settings == 0) {
      choosen = 0;
    }
    else {
      choosen = settings;
    }
    if(confs[choosen] == 0) {
        choosen = -1;
      }
    return choosen;
  }
  if(settings == -1 || settings == 0) {
    var ci = Array.maxi(confs);
    var di = Array.mini(dists);
    var dis = Array.min(dists);
    var con = Array.max(confs);

    if(findVAArray(confs, con) == 1) {
      if(con > 1) {
        choosen = ci;
      }
    }
    else if(options > 1) {
      var arrin = retArrValue(confs, con);
      var lowd = [];
      for(var i = 0; i < arrin.length; i++) {
        lowd.push(dists[arrin[i]]);
      }
    
      if(findVAArray(lowd, Array.min(lowd)) == 1) {
        choosen = arrin[Array.mini(lowd)];
      }
    }
   
  }
  if(settings == 1) {
    for(var i = 0; i < dists.length; i++) {
      if(dists[i] == Infinity) {
        dists[i] = -1;
      }
    }
    var ci = Array.maxi(confs);
    var di = Array.maxi(dists);
    var dis = Array.max(dists);
    var con = Array.max(confs);

    if(findVAArray(confs, con) == 1) {
      if(con > 1) {
        choosen = ci;
      }
    }
    else if(options > 1) {
      var arrin = retArrValue(confs, con);
      var lowd = [];
      for(var i = 0; i < arrin.length; i++) {
        lowd.push(dists[arrin[i]]);
      }
    
      if(findVAArray(lowd, Array.max(lowd)) == 1) {
        choosen = arrin[Array.maxi(lowd)];
      }
    }
   
  }
  if(settings == 2 && options > 1) {
    var di = Array.mini(dists);
    var dis = Array.min(dists);

    var arrin = retArrValue(dists, dis);
    var lowd = [];
    for(var i = 0; i < arrin.length; i++) {
      lowd.push(dists[arrin[i]]);
    }
  
    if(findVAArray(lowd, Array.min(lowd)) == 1) {
      choosen = arrin[Array.mini(lowd)];
    }
   
  }
  if(settings == 3 && options > 1) {
    for(var i = 0; i < dists.length; i++) {
      if(dists[i] == Infinity) {
        dists[i] = -1;
      }
    }
    var di = Array.maxi(dists);
    var dis = Array.max(dists);

    var arrin = retArrValue(dists, dis);
    var lowd = [];
    for(var i = 0; i < arrin.length; i++) {
      lowd.push(dists[arrin[i]]);
    }
  
    if(findVAArray(lowd, Array.max(lowd)) == 1) {
      choosen = arrin[Array.maxi(lowd)];
    }
   
  }
  return choosen;
}

function cRecommend(confs, dists, set) {
  if(recommendBets == -1) {
    return -1;
  }
  var choosen = -1;
  var settings = set;
  var options = 6-findVAArray(confs , 0);
  if(recommendBets == 1) {
      /* 
      0 -
      1 +
      2 - & -1
      3 - & +1
      4 + & -1
      5 + & +1
      */
    if(settings == -1 || settings == 0) {
      choosen = 0;
    }
    else {
      choosen = settings;
    }
      
    if(confs[choosen] == 0) {
      choosen = -1;
    }
    //console.log(choosen, confs);
    return choosen;
  }
  if(settings == -1 || settings == 0) {
    var ci = Array.maxi(confs);
    var di = Array.mini(dists);
    var dis = Array.min(dists);
    var con = Array.max(confs);

    if(findVAArray(confs, con) == 1) {
      if(con > 1) {
        choosen = ci;
      }
    }
    else if(options > 1) {
      var arrin = retArrValue(confs, con);
      var lowd = [];
      for(var i = 0; i < arrin.length; i++) {
        lowd.push(dists[arrin[i]]);
      }
    
      if(findVAArray(lowd, Array.min(lowd)) == 1) {
        choosen = arrin[Array.mini(lowd)];
      }
    }
   
  }
  if(settings == 1) {
    for(var i = 0; i < dists.length; i++) {
      if(dists[i] == Infinity) {
        dists[i] = -1;
      }
    }
    var ci = Array.maxi(confs);
    var di = Array.maxi(dists);
    var dis = Array.max(dists);
    var con = Array.max(confs);

    if(findVAArray(confs, con) == 1) {
      if(con > 1) {
        choosen = ci;
      }
    }
    else if(options > 1) {
      var arrin = retArrValue(confs, con);
      var lowd = [];
      for(var i = 0; i < arrin.length; i++) {
        lowd.push(dists[arrin[i]]);
      }
    
      if(findVAArray(lowd, Array.max(lowd)) == 1) {
        choosen = arrin[Array.maxi(lowd)];
      }
    }
   
  }
  if(settings == 2 && options > 1) {
    var di = Array.mini(dists);
    var dis = Array.min(dists);

    var arrin = retArrValue(dists, dis);
    var lowd = [];
    for(var i = 0; i < arrin.length; i++) {
      lowd.push(dists[arrin[i]]);
    }
  
    if(findVAArray(lowd, Array.min(lowd)) == 1) {
      choosen = arrin[Array.mini(lowd)];
    }
   
  }
  if(settings == 3 && options > 1) {
    for(var i = 0; i < dists.length; i++) {
      if(dists[i] == Infinity) {
        dists[i] = -1;
      }
    }
    var di = Array.maxi(dists);
    var dis = Array.max(dists);

    var arrin = retArrValue(dists, dis);
    var lowd = [];
    for(var i = 0; i < arrin.length; i++) {
      lowd.push(dists[arrin[i]]);
    }
  
    if(findVAArray(lowd, Array.max(lowd)) == 1) {
      choosen = arrin[Array.maxi(lowd)];
    }
   
  }
  return choosen;
}
var distances = [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity];
function getTableConfirmedSpins(id) {
  var lnl = lastNS[id].length-2;
  if(lnl <= 0) {
    return;
  }
  var n2 = lastNS[id][lnl];
  var n1 = lastNS[id][lnl-1];
  var won = lastNS[id][lnl+1];
  var found = false;
  var results = [n1, -n1];
  var havePrediction = false;
  var result = n2-n1;
  var result = calculatePrediction(n1, -n2);
  if(result >= 0) {
    if(resultFind(result, won)) {
      var prediction = calculatePrediction(n2, -won);
      if(prediction != -1) {
        tconfirmations[id][0]+=1;
      }
      else {
        tconfirmations[id][0]=0;
      }
    }
    else {
      tconfirmations[id][0]=0;
    }
    
  }
  var result = calculatePrediction(n1, n2);
  if(result <= 36 && result != -1) {
    if(resultFind(result, won)) {
      var prediction = calculatePrediction(n2, won);
      if(prediction != -1) {
        tconfirmations[id][1]+=1;
      }
      else {
        tconfirmations[id][1]=0;
      }
    }
    else {
      tconfirmations[id][1]=0;
    }
  }
  var result = calculatePrediction(n1, -n2, -1);
  if(result >= 0) {
    if(resultFind(result, won)) {
      var prediction = calculatePrediction(n2, -won, -1);
      if(prediction != -1) {
        tconfirmations[id][2]+=1;
      }
      else {
        tconfirmations[id][2]=0;
      }
    }
    else {
      tconfirmations[id][2]=0;
    }
  }
  var result = calculatePrediction(n1, -n2, 1);
  if(result >= 0) {
    if(resultFind(result, won)) {
      var prediction = calculatePrediction(n2, -won, 1);
      if(prediction != -1) {
        tconfirmations[id][3]+=1;
      }
      else {
        tconfirmations[id][3]=0;
      }
    }
    else {
      tconfirmations[id][3]=0;
    }
  }
  var result = calculatePrediction(n1, n2, -1);
  if(result <= 36 && result != -1) {
    if(resultFind(result, won)) {
      var prediction = calculatePrediction(n2, won, -1);
      if(prediction != -1) {
        tconfirmations[id][4]+=1;
      }
      else {
        tconfirmations[id][4]=0;
      }
    }
    else {
      tconfirmations[id][4]=0;
    }
  }
  var result = calculatePrediction(n1, n2, 1);
  if(result <= 36 && result != -1) {
    if(resultFind(result, won)) {
      var prediction = calculatePrediction(n2, won, 1);
      if(prediction != -1) {
        tconfirmations[id][5]+=1;
      }
      else {
        tconfirmations[id][5]=0;
      }
    }
    else {
      tconfirmations[id][5]=0;
    }
  }
  return Array.max(tconfirmations[id]);
}
function buildPredictionString(p, pt) {
  var plN = getNPlacing(p);
  var pre = '';
  if(plN.length > 0) {
    pre += `${p}<sup>n${plN[0]}</sup>`;
    for(var i = 1; i < plN.length; i++) {
      pre += ` ${pt[i-1]}<sup>n${plN[i]}</sup>`;
    }
  }
  return pre;
  
}
function lookForPrediction() {
  var lnl = lastNumbers.length-2;
  if(lnl <= 0) {
    return;
  }
  var n2 = lastNumbers[lnl];
  var n1 = lastNumbers[lnl-1];
  var won = lastNumbers[lnl+1];
  var found = false;
  var results = [n1, -n1];
  var PlayType =  ['+', '-', '-'];
  var pelement = document.getElementById('prediction');
  var havePrediction = false;
  var result = n2-n1;
  var playstr = ['','','','','',''];
  var result = calculatePrediction(n1, -n2);
  distances = [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity];
  if(result >= 0) {
    if(resultFind(result, won)) {
      var prediction = calculatePrediction(n2, -won);
      if(prediction != -1) {
        playstr[0] = (`Playing (-) => Prediction: ${buildPredictionString(prediction,numbers_terminals[prediction])} <span style="background-color: #0f9e4d;">Confirmed by ${confirmations[0]+1} spin(s), Distance: ${findDistance(result, won)}</span>`);
        confirmations[0]++;
        distances[0] = findDistance(result, won);
      }
      else {
        confirmations[0]=0;
      }
    }
    else {
      confirmations[0]=0;
    }
    
  }
  var result = calculatePrediction(n1, n2);
  if(result <= 36 && result != -1) {
    if(resultFind(result, won)) {
      var prediction = calculatePrediction(n2, won);
      if(prediction != -1) {
        playstr[1] = (`Playing (+) => Prediction: ${buildPredictionString(prediction,numbers_terminals[prediction])} <span style="background-color: #0f9e4d;">Confirmed by ${confirmations[1]+1} spin(s), Distance: ${findDistance(result, won)}</span>`);
        confirmations[1]++;
        distances[1] = findDistance(result, won);
      }
      else {
        confirmations[1]=0;
      }
    }
    else {
      confirmations[1]=0;
    }
  }
  var result = calculatePrediction(n1, -n2, -1);
  if(result >= 0) {
    if(resultFind(result, won)) {
      var prediction = calculatePrediction(n2, -won, -1);
      if(prediction != -1) {
        playstr[2] = (`Playing (- and -1) => Prediction: ${buildPredictionString(prediction,numbers_terminals[prediction])} <span style="background-color: #0f9e4d;">Confirmed by ${confirmations[2]+1} spin(s), Distance: ${findDistance(result, won)}</span>`);
        confirmations[2]++;
        distances[2] = findDistance(result, won);
      }
      else {
        confirmations[2]=0;
      }
    }
    else {
      confirmations[2]=0;
    }
  }
  var result = calculatePrediction(n1, -n2, 1);
  if(result >= 0) {
    if(resultFind(result, won)) {
      var prediction = calculatePrediction(n2, -won, 1);
      if(prediction != -1) {
        playstr[3] = (`Playing (- and +1) => Prediction: ${buildPredictionString(prediction,numbers_terminals[prediction])} <span style="background-color: #0f9e4d;">Confirmed by ${confirmations[3]+1} spin(s), Distance: ${findDistance(result, won)}</span>`);
        confirmations[3]++;
        distances[3] = findDistance(result, won);
      }
      else {
        confirmations[3]=0;
      }
    }
    else {
      confirmations[3]=0;
    }
  }
  var result = calculatePrediction(n1, n2, -1);
  if(result <= 36 && result != -1) {
    if(resultFind(result, won)) {
      var prediction = calculatePrediction(n2, won, -1);
      if(prediction != -1) {
        playstr[4] = (`Playing (+ and -1) => Prediction: ${buildPredictionString(prediction,numbers_terminals[prediction])} <span style="background-color: #0f9e4d;">Confirmed by ${confirmations[4]+1} spin(s), Distance: ${findDistance(result, won)}</span>`);
        confirmations[4]++;
        distances[4] = findDistance(result, won);
      }
      else {
        confirmations[4]=0;
      }
    }
    else {
      confirmations[4]=0;
    }
  }
  var result = calculatePrediction(n1, n2, 1);
  if(result <= 36 && result != -1) {
    if(resultFind(result, won)) {
      var prediction = calculatePrediction(n2, won, 1);
      if(prediction != -1) {
        playstr[5] = (`Playing (+ and +1) => Prediction: ${buildPredictionString(prediction,numbers_terminals[prediction])} <span style="background-color: #0f9e4d;">Confirmed by ${confirmations[5]+1} spin(s), Distance: ${findDistance(result, won)}</span>`);
        confirmations[5]++;
        distances[5] = findDistance(result, won);
      }
      else {
        confirmations[5]=0;
      }
    }
    else {
      confirmations[5]=0;
    }
  }
  var reco = doRecommend(confirmations, distances);

  if(playstr.indexOf('No prediction') != -1) {
    document.getElementById('tinfo').innerHTML = 'No predictions';
  }
  else {
    document.getElementById('tinfo').innerHTML = '';
    for(var op = 0; op < playstr.length; op++) {
      if(playstr[op] == '') {
        continue;
      }
      if(reco == op) {
          document.getElementById('tinfo').innerHTML += '<br/>' + playstr[op].toString() + ' (RECOMMENDED)';
      }
      else {
        document.getElementById('tinfo').innerHTML += '<br/>'+playstr[op].toString();
      }
    }

  }
  if(document.getElementById('tinfo').innerHTML.length == 0) {
   document.getElementById('tinfo').innerHTML = 'No predictions';
  } 
}
function addToArray(array, what) {
  for(var i = 0; i < what.length; i++) {
    if(array.indexOf(what[i]) != -1) {
      continue;
    }
    array.push(what[i]);
  }
  return array;
}
function place(num) {
  var mybet = [];
  var bet = [];
  if(num < 0 || num > 36){
    return mybet;
  }
  var terminals = numbers_terminals[num].length;
  if(terminals == 1) {
    mybet = addToArray(mybet, doPlace(num, 3));
    mybet = addToArray(mybet, doPlace(numbers_terminals[num][0], 3));
    
  }
  if(terminals == 2) {
    mybet = addToArray(mybet, doPlace(num, 1));
    mybet = addToArray(mybet, doPlace(numbers_terminals[num][0], 3));
    mybet = addToArray(mybet, doPlace(numbers_terminals[num][1], 3));
  }
  if(terminals == 4) {
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
  if(terminals == 1) {
    return [3,3];
  }
  if(terminals == 2) {
    return [1,3,3];
  }
  if(terminals == 4) {
    return [1,1,1,1,1];
  }
}
function doPlace(num, neighbours) {
  var pn = [num];
  var ni = numbers.indexOf(num);
  for(var i = 0; i < neighbours; i++) {
    ni++;
    if(ni > 36) {
      ni = 0;
    }
    pn.push(numbers[ni]);
  }
  var ni = numbers.indexOf(num);
  for(var i = 0; i < neighbours; i++) {
    ni--;
    if(ni < 0) {
      ni = 36;
    }
    pn.push(numbers[ni]);
  }
  return pn;
}
function resultFind(res, won) {
  var usedBet = place(res);
  if(usedBet.indexOf(won) != -1) {
    return true;
  }
  return false;
}

function findDistance(number, target) {

  var terminals = numbers_terminals[number];
  var terms = [];
  if(terminals.length > 0) {
    terms.push(number);
    terms.push(numbers_terminals[number][0]);

  }
  if(terminals.length > 1) {
    terms.push(numbers_terminals[number][1]);
  }
  if(terminals.length > 3) {
    terms.push(numbers_terminals[number][2]);
    terms.push(numbers_terminals[number][3]);
  }
  var Distance = 9999;
  for(var i = 0; i < terms.length; i++) {
    var startFrom = numbers.indexOf(terms[i]);
    for(var x = 0; x <= 3; x++) {
      if(numbers[startFrom]==target) {
        var dist = x;
        if(Distance > dist) {
          Distance = dist;
        }
      }
      startFrom++;
      if(startFrom > 36) {
        startFrom = 0;
      }
    }  
    var startFrom = numbers.indexOf(terms[i]);
    for(var x = 0; x <= 3; x++) {

      if(numbers[startFrom]==target) {
        var dist = x;
        if(Distance > dist) {
          Distance = dist;
        }
      }
      startFrom--;
      if(startFrom < 0) {
        startFrom = 36;
      }
    }
  }
  return Distance;
}