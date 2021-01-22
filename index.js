$(document).ready(function () {
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
        let month = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
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
            numIn.style.background = "#efefef";
            numIn.style.outline = "#efefef";
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
        }
    }
    // this function restores the phone and contact tab on the dial pad
    phoneContactrestore = () => {
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
    }
    // this function restore the more icon on the right bottom corner of the dial pad
    moreIconreshow = () => {
        $("#del-icon").html("");
        $("#del-icon").attr("class", "fas fa-ellipsis-h");
        $("#del-word").html("More");
    }
    // this function is responsible for delecting numbers
    del = () => {
        let go = document.getElementById("numScreen").value;
        let so = go.slice(0, -1);
        document.getElementById("numScreen").value = so;
        if (so.length == 0) {
            phoneContactrestore();
            moreIconreshow();
            buttonStatus = false;
        }
    }
    let errorMessage;
    let successMessage;
    let dialButtonstatus;
    let balanceCheckstatus;
    let airtimeBalance = {
        sim1: 100,
        sim2: 100
    }
    let serviceProvider;
    // this is the function that checks the balance of the user and returns the value of the balance
    balanceCheck = (i) => {
        serviceProvider = i
        dialButtonstatus = true
        let inVal = $("#numScreen").val();
        $("#numScreen").val("");
        if (serviceProvider == "MTN - NG") {
            if (balanceCheckstatus == true) {
                $("#balance-message").html("USSD code running...");
                $("#loader").attr("class", "spinner-grow text-primary");
            }
            if (inVal == "*556#") {
                balanceCheckstatus = false;
                phoneContactrestore();
                $("#balance").show();
                successMessage = setInterval(() => {
                    $("#loader").attr("class", "none");
                    $("#balance-message").html(`<p>BizPlus Main account:N${airtimeBalance.sim1}.00; Data Balance: 300GB. Details via SMS.</p><p>OK</p>`);
                    $("#balance-message").children().first().css({ "text-align": "left", "margin": "0px 0px 0px 15px" });
                    $("#balance-message").children().last().attr("onclick", "balanceOut()");
                    $("#balance").show();
                }, 1000)
                balanceCheckstatus = true;
            } else {
                balanceCheckstatus = false;
                $("#balance").show();
                errorMessage = setInterval(() => {
                    phoneContactrestore();
                    $("#loader").attr("class", "none");
                    $("#balance-message").html("<p>Invalid USSD code</p><p>OK</p>");
                    $("#balance-message").children().last().attr("onclick", "balanceOut()");
                    $("#balance").show();
                }, 1000)
                balanceCheckstatus = true;
            }
            moreIconreshow();
        } else {
            if (balanceCheckstatus == true) {
                $("#balance-message").html("USSD code running...");
                $("#loader").attr("class", "spinner-grow text-primary");
            }
            if (inVal == "*232#") {
                balanceCheckstatus = false;
                phoneContactrestore();
                $("#balance").show();
                successMessage = setInterval(() => {
                    $("#loader").attr("class", "none");
                    $("#balance-message").html(`<p>Main bal: N${airtimeBalance.sim2}.00; Dial *996# or click https://nin.9mobile.com.ng to update your NIN.</p><p>OK</p>`);
                    $("#balance-message").children().first().css({ "word-wrap": "break-word", "text-align": "left", "margin": "0px 0px 0px 10px" });
                    $("#balance-message").children().last().attr("onclick", "balanceOut()");
                    $("#balance").show();
                }, 1000)
                balanceCheckstatus = true;
            } else {
                balanceCheckstatus = false;
                $("#balance").show();
                errorMessage = setInterval(() => {
                    phoneContactrestore();
                    $("#loader").attr("class", "none");
                    $("#balance-message").html("<p>Invalid USSD code</p><p>OK</p>");
                    $("#balance-message").children().last().attr("onclick", "balanceOut()");
                    $("#balance").show();
                }, 1000)
                balanceCheckstatus = true;
            }
            moreIconreshow();
        }
        buttonStatus = false;
    }
    // this function clear the displayed balance from the screen
    balanceOut = () => {
        $("#balance").hide();
        clearInterval(errorMessage);
        clearInterval(successMessage);
        phoneContactrestore();
        dialButtonstatus = false
        buttonStatus = false;
    }
});
