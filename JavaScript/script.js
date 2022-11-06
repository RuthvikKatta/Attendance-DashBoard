"use strict";

// Loading AI - B Json File in Javasrcipt. 
import data from '../Classes/AIB.json' assert {type: 'json'};
for (let one of data) {
    let NewElement = document.createElement("div");
    NewElement.classList.add("tab");
    var leftId = one.Id.substring(8, 11) + 'L';
    var RightId = one.Id.substring(8, 11) + 'R';
    NewElement.innerHTML = `
    <p><span>Roll Number :</span> ${one.Id}</p>
    <p><span>Name :</span> ${one.Name}</p>
    <div class="attendance">
        <div id="${leftId}" class="left" is-present="none"><p>P<span>resent</span></p></div>
        <div id="${RightId}" class="right"><p>A<span>bsent</span></p></div>
    </div> 
    `;
    document.querySelector('.data').appendChild(NewElement);
}


var left = document.getElementsByClassName('left');
for(let l of left){
    l.addEventListener('click',function(){
        if(l.getAttribute("is-present") === 'none'|| l.getAttribute("is-present") === 'false'){
            l.setAttribute("is-present",true);
        }
        else{
            l.setAttribute("is-present",'none');
        }
        var leftID = l.id;
        var RightID  = leftID.substring(0,2) + 'R';
        document.getElementById(leftID).classList.toggle('Active');
        document.getElementById(RightID).classList.toggle('DeActive');
    })
}

var right = document.getElementsByClassName('right');
for(let r of right){
    r.addEventListener('click',function(){
        let l = r.previousElementSibling;
        if(l.getAttribute("is-present") === 'none'|| l.getAttribute("is-present") === 'true'){
            l.setAttribute("is-present",false);
        }
        else{
            l.setAttribute("is-present",'none');
        }
        var RightID = r.id;
        var leftID  = RightID.substring(0,2) + 'L';
        document.getElementById(RightID).classList.toggle('Active');
        document.getElementById(leftID).classList.toggle('DeActive');
    })
}

// Dowmload Excel Function

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

document.getElementById('Download').addEventListener('click',(event)=>{
    var j = 0;
    for(let l of left){
        if(l.getAttribute("is-present") === 'true'){
            data[j++]["Status"] = "Present";
        }
        else if(l.getAttribute("is-present") === 'none'){
            data[j++]["Status"] = "  -  ";
        }
        else{
            data[j++]["Status"] = "Absent";
        }
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook ={
        Sheets:{
            'data': worksheet
        },
        SheetNames: ['data']
    };
    const excelBuffer = XLSX.write(workbook,{bookType :'xlsx',type : 'array'});
    saveAsExcel(excelBuffer,'Attendance(AI-B)');
})

function saveAsExcel(buffer, filename){
    const data = new Blob([buffer], {type:EXCEL_TYPE});
    let currentDate = new Date().toJSON().slice(0,10);
    saveAs(data,filename+' on '+currentDate+EXCEL_EXTENSION);
}