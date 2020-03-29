var times = []
var events = []
var pairs = []
var currTime;
var currEvent;



function update(){
    document.getElementById('insertContent').innerHTML = "";   //clear
    tempEvent = []
    pairs.sort(sortTime);
    console.log(pairs);
    chrome.storage.local.set({Pairs: pairs}, function(){
        console.log(pairs)
    })
    chrome.storage.local.get(['Pairs'],function(result){
        tempEvent.push(result.Pairs);
        for (var i = 0;i < pairs.length;i++){
            var index = i.toString()
            addLine();   
            addLine(); 
            currEvent = tempEvent[0][i];
            var t = currEvent[0].split("T");
            var s = "";
            var time = s.concat(t[0], " ", t[1])
            addEvent([time, currEvent[1]], index);
        }
    });
}

document.getElementById("button").onclick = function () {
    document.getElementById('insertContent').innerHTML = "";   //clear
    tempEvent = []
    var time = document.getElementById("meeting-time").value;
    pairs.push([time, document.getElementById("description").value]);
    update();
} 


function addEvent(pair, id) {
    var empTab = document.getElementById('insertContent');
    var rowCnt = empTab.rows.length; 
    var tr = empTab.insertRow(rowCnt);    // TABLE ROW.
    tr = empTab.insertRow(rowCnt); 
    for (var c = 0; c < 3; c++) { 
    var td = document.createElement('td');   
    td = tr.insertCell(c);
    if(c==0){
        var ele = document.createElement('input');
        ele.setAttribute('value', pair[0]);
        td.appendChild(ele);
    }
    else if(c==1){
        var ele = document.createElement('input');
        ele.setAttribute('value', pair[1]);
        td.appendChild(ele);
    }
    else{
        var button = document.createElement('input');
        button.setAttribute('type', 'button');
        button.setAttribute('value', 'Remove');
        rid = "event"+id;
        button.setAttribute('id',rid)
        td.appendChild(button);
        document.getElementById(rid).onclick = function () {
            removeRow(document.getElementById(rid));
        }
        
        
    }
    }
}

console.log(document.getElementById("event0"));


function addLine(){
    var line = document.createElement('br');
    document.getElementById('insertContent').appendChild(line);    
}

function removeRow(oButton) {
    id = oButton.id;
    rowNum = id.split('t')[1];
    console.log("rownum: "+rowNum);
    var empTab = document.getElementById('insertContent');
    empTab.deleteRow(rowNum);       // BUTTON -> TD -> TR.
    chrome.storage.local.clear(function(){
        var error = chrome.runtime.lastError;
        if (error) {
        console.error(error);
    }
    });
    pairs.splice(rowNum,1)
    // console.log("after remove: "+pairs);
    update();
}

function sortTime(a,b){
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}