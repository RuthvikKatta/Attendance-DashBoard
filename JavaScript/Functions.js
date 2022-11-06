// Attendance
var str = '';
var day = '';

// Function Display()

function display() {
    var str1 = '';
    var str2 = '';
    var count1 = 0;
    var count2 = 0;
    var present = document.getElementsByClassName('left');
    for (let one of present) {
        if (one.getAttribute("is-present") === 'true') {
            str1 = str1 + one.id.substring(0, 2) + ', ';
            count1 += 1;
        }
        else if (one.getAttribute("is-present") === 'false') {
            str2 = str2 + one.id.substring(0, 2) + ', ';
            count2 += 1;
        }
    }
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let currentDate = new Date().toLocaleDateString("en-US", options);
    var str = currentDate + '\n';
    if (count1 == 1)
        str += "Presentees (" + count1 + "  Member)\n";
    else
        str += "Presentees (" + count1 + "  Members)\n";
    str += str1 + '\n';
    if (count2 == 1)
        str += "Absentees (" + count2 + "  Member)\n";
    else
        str += "Absentees (" + count2 + "  Members)\n";
    str += str2 + '\n';
    switch (new Date().getHours()) {
        case 9:
            day = "In First Hour.";
            break;
        case 10:
            day = "In Second Hour.";
            break;
        case 11:
            day = "In Third Hour.";
            break;
        case 12:
            day = "In Fourth Hour.";
            break;
        case 14:
            day = "In Fifth Hour.";
            break;
        case 15:
            day = "In Sixth Hour.";
            break;
    }
    str += day;
    document.getElementById('display').value = str;

    //Display Border colour 
    if (count1 > count2)
        document.getElementById('display').style.borderColor = 'lightgreen';
    else if (count1 < count2)
        document.getElementById('display').style.borderColor = '#ff5c5c';
    else
        document.getElementById('display').style.borderColor = '#f6f672';

}

// Presentees Function

function GetPresentees() {
    var present = document.getElementsByClassName('left');
    str = '';
    var count = 0;
    for (let one of present) {
        if (one.getAttribute("is-present") === 'true') {
            str = str + one.id.substring(0, 2) + ', ';
            count += 1;
        }
        else {
            var leftID = one.id;
            var RightID = leftID.substring(0, 2) + 'R';
            one.setAttribute("is-present", false);
            document.getElementById(leftID).classList.remove('Active');
            document.getElementById(RightID).classList.remove('DeActive');
            document.getElementById(leftID).classList.add('DeActive');
            document.getElementById(RightID).classList.add('Active');
        }
    }
    if (count == 1)
        document.getElementById('Details').textContent = "Presentees : " + count + ' Member';
    else
        document.getElementById('Details').textContent = "Presentees : " + count + ' Members';
    if (str === '') {
        document.getElementById('display').value = "No Presentees";
        return;
    }
    str = str.slice(0, -2);
    let select = document.getElementById("subject");
    subject = select.value;
    select.addEventListener('change', event => {
        subject = select.value;
    })

    let currentDate = new Date().toJSON().slice(0, 10);
    str += " Were Present on " + currentDate + " in " + subject + " Class."

    document.getElementById('display').value = str;
}

// Absentees Function 

function GetAbsentees() {
    var present = document.getElementsByClassName('left');
    str = '';
    var count = 0;
    for (let one of present) {
        if (one.getAttribute("is-present") === 'false') {
            str = str + one.id.substring(0, 2) + ', ';
            count += 1;
        }
        else {
            var leftID = one.id;
            var RightID = leftID.substring(0, 2) + 'R';
            one.setAttribute("is-present", true);
            document.getElementById(leftID).classList.remove('DeActive');
            document.getElementById(RightID).classList.remove('Active');
            document.getElementById(leftID).classList.add('Active');
            document.getElementById(RightID).classList.add('DeActive');
        }
    }
    if (count == 1)
        document.getElementById('Details').textContent = "Absentees : " + count + ' Member';
    else
        document.getElementById('Details').textContent = "Absentees : " + count + ' Members';
    if (str === '') {
        document.getElementById('display').value = "No Absentees";
        return;
    }
    str = str.slice(0, -2);

    let select = document.getElementById("subject");
    subject = select.value;
    select.addEventListener('change', event => {
        subject = select.value;
    })

    let currentDate = new Date().toJSON().slice(0, 10);
    str += " Were Absent on " + currentDate + " in " + subject + " Class."

    document.getElementById('display').value = str;
}

// Whatsapp Message sender Function

document.querySelector(".Whatsapp").addEventListener('click', function () {
    window.open(`whatsapp://send?text=${str}`);
})

// Copy Function

let copy = document.querySelector("#copy");
copy.addEventListener('click', function () {
    let input = document.querySelector("#display").select();
    document.execCommand("copy");
    copy.classList.add("active");
    window.getSelection().removeAllRanges();
    setTimeout(function () {
        copy.classList.remove("active");
    }, 2500);
})

// Reset Function

document.getElementById("reset").addEventListener('click',function(){
    var present = document.getElementsByClassName('left');
    for (let one of present) {
        var leftID = one.id;
        var RightID = leftID.substring(0, 2) + 'R';
        one.setAttribute("is-present", 'none');
        document.getElementById(leftID).classList = "left";
        document.getElementById(RightID).classList = "right";
    }
    document.getElementById('display').value = '';
    document.getElementById('display').style.borderColor = 'rgb(165, 165, 165)';
    document.getElementById('Details').textContent = 'Details : ';
    document.getElementById('subject').value = '';
});