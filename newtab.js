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
            var time = s.concat(t[0], " ", t[1]);
            var type = tempEvent[0][i][2];
            var seq = i.toString();
            addEvent([time, currEvent[1], type, seq]);
        }
    });
}

document.getElementById("button").onclick = function () {
    if(pairs.length <= 9){
        document.getElementById('insertContent').innerHTML = "";   //clear
        tempEvent = []
        var time = document.getElementById("meeting-time").value;
        var seq = pairs.length.toString();
        if(document.getElementById('exam').checked){
            pairs.push([time, document.getElementById("description").value,"EXAM",seq]);
        }
        else if(document.getElementById('ddl').checked){
            pairs.push([time, document.getElementById("description").value,"DEADLINE",seq]);
        }
        else if(document.getElementById('et').checked){
            pairs.push([time, document.getElementById("description").value,"EVENT",seq]);
        }
        else if(document.getElementById('ot').checked){
            pairs.push([time, document.getElementById("description").value,"OTHER",seq]);
        }
        update();
    }
    if(pairs.length == 10){
        if(document.getElementById("closeAlert")==null){
            let div = document.createElement('div');
            div.className = "alert";
            div.innerHTML = "<strong>Hi there!</strong> Prioritize 10 Tasks!";
            let span = document.createElement('span');
            span.className = "closebtn";
            span.id = "closeAlert"
            span.innerHTML = "&times";
            document.getElementById("demo").append(div);
            div.appendChild(span);
            document.getElementById("closeAlert").onclick=function(){
                document.getElementById("closeAlert").parentElement.style.display='none';
            } 
        }
    }
} 


function addEvent(pair) {
    var empTab = document.getElementById('insertContent');
    var rowCnt = empTab.rows.length; 
    var tr = empTab.insertRow(rowCnt);    // TABLE ROW.
    tr = empTab.insertRow(rowCnt); 
    for (var c = 0; c < 4; c++) { 
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
        else if(c==2){
            var tag = document.createElement('input');
            console.log(pair[2])
            tag.setAttribute('value', pair[2]);
            td.appendChild(tag);
        }
        else{
            var span = document.createElement('span');
            span.className = "closebtn";
            span.setAttribute("id", "event"+pair[3])
            span.innerHTML = "&times";
            td.appendChild(span);
            id = "event"+pair[3];
            span.onclick=function(){
                removeRow(this);
            }
        }
    }
}


function addLine(){
    var line = document.createElement('br');
    document.getElementById('insertContent').appendChild(line);    
}

function removeRow(oButton) {
    id = oButton.id;
    rowNum = id.split('t')[1];
    var empTab = document.getElementById('insertContent');
    empTab.deleteRow(rowNum);       // BUTTON -> TD -> TR.
    chrome.storage.local.clear(function(){
        var error = chrome.runtime.lastError;
        if (error) {
        console.error(error);
    }
    });
    pairs.splice(rowNum,1)
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

//background image change
var images = [
    "b7.jpg","b8.jpg","b6.jpg",'b1.jpg','b2.jpg','b3.jpg',
    'b4.jpg','b5.jpg','b9.jpg','b10.jpg','b11.jpg','b12.jpg'
]

var imageHead = document.getElementById("image-head");
var i = 0;

setInterval(function() {
      imageHead.style.backgroundImage = "url(" + images[i] + ")";
      i = i + 1;
      if (i == images.length) {
      	i =  0;
      }
}, 30000);
