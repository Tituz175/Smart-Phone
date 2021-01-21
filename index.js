let phone = document.getElementById("phone");
let phoneStatus;
let homeStatus;
let dialStatus;
let buttonStatus;
let numIn;
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
    let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let month = ["Jan.","Feb.","Mar.","Apr.","May","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."];
    realDay = weekDays[dateDay];
    realMonth = month[dateMonth];
    let gYear = dateNow.getFullYear();
    let monthDay = realMonth + ' ' + gDate;
    let week = realDay;
    document.querySelector("#date span:nth-child(1)").innerHTML = monthDay;
    document.querySelector("#date span:nth-child(2)").innerHTML = week;
}
myDate();
// this function is in charge of the button
buttonShow = (i) => {
    if (buttonStatus == undefined || buttonStatus == false) {
        document.getElementById("phone-contact").innerHTML = "";
        numIn = document.createElement("input");
        numIn.style.width = "100%";
        numIn.style.textAlign = "center";
        numIn.style.fontSize = "28px"
        numIn.setAttribute("id", "numScreen");
        numIn.value += i;
        document.getElementById("phone-contact").append(numIn);
        document.getElementById("del-icon").setAttribute("class", "none");
        document.getElementById("del-word").innerHTML = ``;
        document.getElementById("del-icon").innerHTML = `&lArr;`;
        document.getElementById("del-icon").style.height = "14.55px";
        document.getElementById("del-word").innerHTML = `Delete`;
        buttonStatus = true;
    } else {
        numIn.value += i;
        document.getElementById("phone-contact").append(numIn);
        console.log("im here");
    }
}
del = () => {
    let go = document.getElementById("numScreen").value;
    let so = go.slice(0, -1);
    document.getElementById("numScreen").value = so;
    if (so.length == 0) {
        document.getElementById("phone-contact").innerHTML = "";
        let phone = document.createElement("div");
        let contact = document.createElement("div");
        let text = `<span>PHONE</span>`;
        let con = `<span>CONTACT</span>`;
        phone.setAttribute("id", "phonetab");
        contact.setAttribute("id", "contacttab");
        phone.innerHTML = text;
        contact.innerHTML = con;
        document.getElementById("phone-contact").append(phone);
        document.getElementById("phone-contact").append(contact);
        document.getElementById("del-icon").innerHTML = ``;
        document.getElementById("del-icon").setAttribute("class", "fas fa-ellipsis-h");
        document.getElementById("del-word").innerHTML = `More`;
        buttonStatus = false;
    }
}