let phone = document.getElementById("phone")
let phoneStatus = "on";
phoneOn = () => {
    if (phoneStatus === "on") {
        phone.setAttribute("class", "offscreen");
        phoneStatus = "of"
    } else {
        phone.setAttribute("class", "lockscreen");
        phoneStatus = "on"
    }
    
}