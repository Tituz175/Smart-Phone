$(document).ready(function () {
    // smart phone var
    let phone = document.getElementById("phone");
    let phoneStatus;
    let homeStatus;
    let dialStatus;
    let buttonStatus;
    let numIn;

    // airtime generator var
    let store = []
    let cardName;
    let cardValue;
    let cardPin;
    let cardDetails;
    let lastNum = 0;
    let oriTable = document.getElementById("tablebody");
    let loStore;
    let num = -1;
    let pinShow;

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
        let hrLen = timeHours.toString().length;
        let timeMins = timeNow.getMinutes();
        let minLen = timeMins.toString().length;
        let currentTime;
        if (hrLen == "1") {
            if (minLen == "1") {
                currentTime = "0" + timeHours + ':0' + timeMins;
            } else {
                currentTime = "0" + timeHours + ':' + timeMins;
            }
        } else {
            if (minLen == "1") {
                currentTime = timeHours + ':0' + timeMins;
            } else {
                currentTime = timeHours + ':' + timeMins;
            }
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
    // airtime load
    let message;
    let position;
    let balanceAfter;
    airtimeLoad = (network1stLetter, sim, messagePrefix) => {
        loStore = JSON.parse(localStorage.getItem("cards"));
        for (let i = 0; i < loStore.length; i++) {
            if (loStore[i].Name[0] == network1stLetter && inVal.toString().substr(5, 15) == loStore[i].Pin.toString()) {
                message = true;
                position = i;
                break
            } else {
                message = false;
            }
        }
        if (message == true) {
            if (loStore[position].Used == true) {
                balanceCheckstatus = false;
                phoneContactrestore();
                $("#balance").show();
                errorMessage = setInterval(() => {
                    phoneContactrestore();
                    $("#loader").attr("class", "none");
                    $("#balance-message").html(`<p>${messagePrefix}, Card already used by you.</p><p>OK</p>`);
                    $("#balance-message").children().last().attr("onclick", "balanceOut()");
                    $("#balance-message").children().last().css("cursor", "pointer");
                    $("#balance").show();
                }, 1000)
                balanceCheckstatus = true;
            } else {
                balanceCheckstatus = false;
                phoneContactrestore();
                $("#balance").show();
                loStore[position].Used = true;
                store = loStore;
                localStorage.setItem("cards", JSON.stringify(store));
                console.log(sim);
                sim += loStore[position].Amount;
                balanceAfter = sim
                successMessage = setInterval(() => {
                    $("#loader").attr("class", "none");
                    $("#balance-message").html(`<p>${messagePrefix}, your recharge of ${loStore[position].showAmount} was successful. Details via SMS.</p><p>OK</p>`);
                    $("#balance-message").children().first().css({ "text-align": "left", "margin": "0px 0px 0px 15px" });
                    $("#balance-message").children().last().attr("onclick", "balanceOut()");
                    $("#balance-message").children().last().css("cursor", "pointer");
                    $("#balance").show();
                }, 1000)
                balanceCheckstatus = true;
            }
        } else {
            balanceCheckstatus = false;
            phoneContactrestore();
            $("#balance").show();
            errorMessage = setInterval(() => {
                phoneContactrestore();
                $("#loader").attr("class", "none");
                $("#balance-message").html("<p>Invalid USSD code</p><p>OK</p>");
                $("#balance-message").children().last().attr("onclick", "balanceOut()");
                $("#balance-message").children().last().css("cursor", "pointer");
                $("#balance").show();
            }, 1000)
            balanceCheckstatus = true;
        }
        moreIconreshow()
    }

    let inVal;
    // this is the function that checks the balance of the user and returns the value of the balance
    balanceCheck = (i) => {
        serviceProvider = i
        dialButtonstatus = true
        inVal = $("#numScreen").val();
        $("#numScreen").val("");
        if (serviceProvider == "MTN - NG") {
            if (balanceCheckstatus == true) {
                $("#balance-message").html("USSD code running...");
                $("#loader").attr("class", "spinner-grow text-primary");
            }
            if (inVal.length > 5) {
                airtimeLoad("M", airtimeBalance.sim1, "Yello");
                airtimeBalance.sim1 = balanceAfter;
            } else {
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
            }

        } else {
            if (balanceCheckstatus == true) {
                $("#balance-message").html("USSD code running...");
                $("#loader").attr("class", "spinner-grow text-primary");
            }
            if (inVal.length > 5) {
                airtimeLoad("E", airtimeBalance.sim2, "Dear Customer");
                airtimeBalance.sim2 = balanceAfter;
            } else {
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

    // Airtime generator
    genCard = () => {
        cardName = document.getElementById("cardname").value;
        cardValue = document.getElementById("cardamount").value;
        cardPin = Math.ceil(Math.random() * 1000000000000000);
        cardDetails = { Name: "", showAmount: "", Amount: "", Pin: 0, Used: false };
        cardDetails.Name = cardName;
        cardDetails.showAmount = cardValue;
        cardDetails.Amount = parseInt(cardValue.slice(1));
        cardDetails.Pin = cardPin;
        store.push(cardDetails)
        localStorage.setItem("cards", JSON.stringify(store));
        document.getElementById("cardname").value = "";
        document.getElementById("cardamount").value = "";
        loStore = JSON.parse(localStorage.getItem("cards"));
        $("#generate-button").children().last().attr("class", "spinner-grow text-warning");
        pinShow = setInterval(() => {
            $("#generate-button").children().last().attr("class", "none");
            $("#cardpin").val(cardPin);
        }, 1000)
    }

    clearPin = () => {
        clearInterval(pinShow);
        $("#cardpin").val("");
    }

    showList = () => {
        oriTable.innerHTML = "";
        loStore = JSON.parse(localStorage.getItem("cards"));
        for (let i = 0; i < loStore.length; i++) {
            let tableRow = document.createElement("tr");
            tableRow.setAttribute("id", `trow${i}`)
            let sN = document.createElement("td");
            let cardNet = document.createElement("td");
            let cardAmt = document.createElement("td");
            let cardPn = document.createElement("td");
            let rowBut = document.createElement("td");

            lastNum++
            sN.append(lastNum)
            cardNet.append(loStore[i].Name);
            cardAmt.append(loStore[i].showAmount);
            cardPn.append(loStore[i].Pin);
            let but = document.createElement("i");
            but.setAttribute('onclick', `remove(${i})`);
            but.setAttribute("class", 'far fa-trash-alt');
            but.style.color = "#dc3545";
            rowBut.append(but);

            tableRow.appendChild(sN);
            tableRow.appendChild(cardNet);
            tableRow.appendChild(cardAmt);
            tableRow.appendChild(cardPn);
            tableRow.appendChild(rowBut);
            oriTable.appendChild(tableRow);
            console.table(loStore[i].Name, loStore[i].showAmount, loStore[i].Pin);
        }
        num++
        lastNum = 0;
        clearPin();
    }

    remove = (nu) => {
        let index = nu;
        let out = JSON.parse(localStorage.getItem("cards"))
        out.splice(nu, 1)
        store = out
        localStorage.setItem("cards", JSON.stringify(store));
        document.getElementById(`trow${nu}`).style.display = "none"
        showList()
    }
});






