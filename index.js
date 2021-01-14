let phone = document.getElementById("phone")
let phoneStatus;
let homeStatus;
// this function power the phone
phoneOn = () => {
    if (phoneStatus == !undefined || phoneStatus === "on") {
        phone.setAttribute("class", "offscreen");
        document.getElementById("lockscreendetails").style.display = "none";
        document.getElementById("butcontainer").style.top = "94.5%"
        phoneStatus = "of"
    } else {
        phone.setAttribute("class", "lockscreen");
        document.getElementById("lockscreendetails").style.display = "flex";
        document.getElementById("butcontainer").style.top = "85.6%"
        phoneStatus = "on"
    }
}
// this function displays the homescreen
homeActive = () => {
    if (phoneStatus == "on") {
        phone.setAttribute("class", "homescreen");
        document.getElementById("lockscreendetails").style.display = "none";
        document.getElementById("butcontainer").style.top = "94.5%"
        homeStatus = true;
    }
}
// this get the time on every one sec.
setInterval(() => {
    let timeNow = new Date();
    let timeHours = timeNow.getHours();
    let timeMins = timeNow.getMinutes();
    let currentTime = timeHours + ':' + timeMins;
    document.getElementById("time").innerHTML = currentTime;
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
    let monthDay =realMonth + ' ' + gDate;
    let week = realDay;
    document.querySelector("#date span:nth-child(1)").innerHTML = monthDay;
    document.querySelector("#date span:nth-child(2)").innerHTML = week;
    // document.getElementById('screen').innerHTML = monthDay;
}
myDate();