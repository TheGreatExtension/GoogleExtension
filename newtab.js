var times = []
var events = []
var pairs = []
var currTime;
var currEvent;

document.getElementById("button").onclick = function () {
    document.getElementById('insertContent').innerHTML = "";   //clear
    tempEvent = []
    var time = document.getElementById("meeting-time").value;
    pairs.push([time, document.getElementById("description").value]);
    pairs.sort(sortTime);
    console.log(pairs);
    chrome.storage.local.set({Pairs: pairs}, function(){
        console.log(pairs)
    })
    chrome.storage.local.get(['Pairs'],function(result){
        tempEvent.push(result.Pairs);
        for (var i = 0;i < pairs.length;i++){   
            currEvent = tempEvent[0][i];
            addLine();
            addEvent(currEvent[0].split("T"));
            addEvent(currEvent[1])}
        }); 
}

function addEvent(entry) {
    var curr = document.createElement('input');
    curr.type = "p";
    curr.value = entry;
    document.getElementById('insertContent').appendChild(curr);    
}

function addLine(){
    var line = document.createElement('br');
    document.getElementById('insertContent').appendChild(line);    
}

function sortTime(a,b){
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}