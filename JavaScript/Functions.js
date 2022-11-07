// Attendance
var msg = '';
var time = '';

// Function Display()

function display() {
    var str1 = '';
    var str2 = '';
    var count1 = 0;
    var count2 = 0;
    msg = '';
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
    var currentDate = new Date().toLocaleDateString("en-US", options);
    msg += currentDate + '\n';
    if (count1 == 1)
        msg += "Presentees (" + count1 + "  Member)\n";
    else
        msg += "Presentees (" + count1 + "  Members)\n";
    msg += str1 + '\n';
    if (count2 == 1)
        msg += "Absentees (" + count2 + "  Member)\n";
    else
        msg += "Absentees (" + count2 + "  Members)\n";
    msg += str2 + '\n\n';
    var min = new Date().getMinutes();
    switch (new Date().getHours()) {
        case 9:
            time = "In First Hour.";
            break;
        case 10:
            time = "In Second Hour.";
            break;
        case 11:
            time = "In Third Hour.";
            break;
        case 12:
            time = "In Fourth Hour.";
            break;
        case (min >= 45 && 13):
            time = "In Fifth Hour.";
            break;
        case (min >= 45 && 14):
            time = "In Sixth Hour.";
            break;
    }

    //Display Border colour 

    if (count1 > count2)
        document.getElementById('display').style.borderColor = 'lightgreen';
    else if (count1 < count2)
        document.getElementById('display').style.borderColor = '#ff5c5c';
    else if (count1 == 0 && count2 == 0)
        document.getElementById('display').style.borderColor = 'rgb(165, 165, 165)';
    else
        document.getElementById('display').style.borderColor = '#f6f672';
    msg += time;
    document.getElementById('display').value = msg;
}

// Presentees Function

function GetPresentees() {
    var present = document.getElementsByClassName('left');
    msg = '';
    var count = 0;
    for (let one of present) {
        if (one.getAttribute("is-present") === 'true') {
            msg = msg + one.id.substring(0, 2) + ', ';
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
    if (msg === '') {
        document.getElementById('display').value = "No Presentees";
        return;
    }
    msg = msg.slice(0, -2);
    let select = document.getElementById("subject");
    subject = select.value;
    select.addEventListener('change', event => {
        subject = select.value;
    })

    let currentDate = new Date().toJSON().slice(0, 10);
    msg += " are Present on " + currentDate + " in " + subject + " Class."

    document.getElementById('display').value = msg;
}

// Absentees Function 

function GetAbsentees() {
    var present = document.getElementsByClassName('left');
    msg = '';
    var count = 0;
    for (let one of present) {
        if (one.getAttribute("is-present") === 'false') {
            msg = msg + one.id.substring(0, 2) + ', ';
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
    if (msg === '') {
        document.getElementById('display').value = "No Absentees";
        return;
    }
    msg = msg.slice(0, -2);

    let select = document.getElementById("subject");
    subject = select.value;
    select.addEventListener('change', event => {
        subject = select.value;
    })

    let currentDate = new Date().toJSON().slice(0, 10);
    msg += " are Absent on " + currentDate + " in " + subject + " Class."

    document.getElementById('display').value = msg;
}

// Whatsapp Message sender Function

document.querySelector(".Whatsapp").addEventListener('click', function () {
    window.open(`whatsapp://send?text=${msg}`);
})

// Copy Function

let copy = document.querySelector("#copy");
copy.addEventListener('click', function () {
    let input = document.querySelector("#display");
    input.select();
    input.setSelectionRange(0, 9999);
    navigator.clipboard.writeText(input.value);
    copy.classList.add("active");
    window.getSelection().removeAllRanges();
    setTimeout(function () {
        copy.classList.remove("active");
    }, 2500);
})

// Reset Function

document.getElementById("reset").addEventListener('click', function () {
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
