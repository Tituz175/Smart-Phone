let phone = document.getElementById("phone")
let phoneStatus;
let homeStatus;
let dialStatus;
// this function power the phone
phoneOn = () => {
    if (phoneStatus == !undefined || phoneStatus === "on") {
        phone.setAttribute("class", "offscreen");
        document.getElementById("lockscreendetails").style.display = "none";
        document.getElementById("notification-bar").style.display = "none";
        document.getElementById("dialpad").style.display = "none"
        document.getElementById("icon").style.display = "none";
        document.getElementById("butcontainer").style.top = "95.2%"
        phoneStatus = "off"
        dialStatus = false;
    } else {
        phone.setAttribute("class", "lockscreen");
        document.getElementById("lockscreendetails").style.display = "flex";
        document.getElementById("notification-bar").style.display = "flex";
        document.getElementById("notification-bar").style.background = "none";
        document.getElementById("dialpad").style.display = "none"
        document.getElementById("icon").style.display = "none";
        document.getElementById("butcontainer").style.top = "82.4%"
        phoneStatus = "on"
        dialStatus = false;
    }
}
// this function displays the homescreen
homeActive = () => {
    if (phoneStatus == "on" && (dialStatus == undefined || dialStatus == false)) {
        phone.setAttribute("class", "homescreen");
        document.getElementById("lockscreendetails").style.display = "none";
        document.getElementById("notification-bar").style.background = "none";
        document.getElementById("icon").style.display = "flex";
        document.getElementById("dialpad").style.display = "none"
        document.getElementById("butcontainer").style.top = "80%"
        homeStatus = true;
        dialStatus = false;
    }
}
// this function is in charge of the dial pad
dialPad = () => {
    if (phoneStatus == "on") {
        phone.setAttribute("class", "callpad");
        document.getElementById("notification-bar").style.background = "#d4d4d4";
        document.getElementById("icon").style.display = "none"
        document.getElementById("dialpad").style.display = "block"
        document.getElementById("butcontainer").style.top = "03.6%"
        dialStatus = true;
    }
}
// this function works for back
back = () => {
    if (dialStatus == true) {
        phone.setAttribute("class", "homescreen");
        document.getElementById("notification-bar").style.background = "none";
        document.getElementById("dialpad").style.display = "none"
        document.getElementById("icon").style.display = "flex";
        document.getElementById("butcontainer").style.top = "80%"
        dialStatus = false;
    }
}
home = () => {
    if (phoneStatus == "on" && homeStatus == true) {
        phone.setAttribute("class", "homescreen");
        document.getElementById("notification-bar").style.background = "none";
        document.getElementById("dialpad").style.display = "none"
        document.getElementById("icon").style.display = "flex";
        document.getElementById("butcontainer").style.top = "80%"
        dialStatus = false;
    }
}
// this get the time on every one sec.
setInterval(() => {
    let timeNow = new Date();
    let timeHours = timeNow.getHours();
    let timeMins = timeNow.getMinutes();
    let minLen = timeMins.toString().length;
    let currentTime;
    if (minLen == "1") {
        currentTime = timeHours + ':0' + timeMins;
    } else {
        currentTime = timeHours + ':' + timeMins;
    }
    document.getElementById("time").innerHTML = currentTime;
    document.querySelector("#notification-time").innerHTML = currentTime;
}, 1000)
// this function gets the date
myDate = () => {
    let realDay;
    let realMonth;
    let dateNow = new Date()
    let dateDay = dateNow.getDay();
    let dateMonth = dateNow.getMonth();
    let gDate = dateNow.getDate();
    let gYear = dateNow.getFullYear();
    // formatting day
    switch (dateDay) {
        case 0:
            realDay = "Sunday";
            break;
        case 1:
            realDay = "Monday";
            break;
        case 2:
            realDay = "Tuesday";
            break;
        case 3:
            realDay = "Wednesday";
            break;
        case 4:
            realDay = "Thursday";
            break;
        case 5:
            realDay = "Friday";
            break;
        case 6:
            realDay = "Saturday";
    }
    // formatting Month
    switch (dateMonth) {
        case 0:
            realMonth = "Jan.";
            break;
        case 1:
            realMonth = "Feb.";
            break;
        case 2:
            realMonth = "Mar.";
            break;
        case 3:
            realMonth = "Apr.";
            break;
        case 4:
            realMonth = "May";
            break;
        case 5:
            realMonth = "Jun.";
            break;
        case 6:
            realMonth = "Jul.";
            break;
        case 7:
            realMonth = "Aug.";
            break;
        case 8:
            realMonth = "Sept.";
            break;
        case 9:
            realMonth = "Oct.";
            break;
        case 10:
            realMonth = "Nov.";
            break;
        case 11:
            realMonth = "Dec.";
    }
    let monthDay = realMonth + ' ' + gDate;
    let week = realDay;
    document.querySelector("#date span:nth-child(1)").innerHTML = monthDay;
    document.querySelector("#date span:nth-child(2)").innerHTML = week;
}
myDate();