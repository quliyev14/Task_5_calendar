const calendar = document.getElementById("calendar");
for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
        row.appendChild(document.createElement("td"));
    }
    calendar.appendChild(row);
}



//GUN IL VE AY SECIRIK NOTES YAZIB SAVE BUTTON CLICK LERYIRIK 
// VE HEMIN SECDIYIMIZ GUNUN UZERINE GELIB CLICKLEDIKDE YUXARIDA ALERT ILE GOSERILIR  O GUNE NE NOTE ELAVE OLUNUB DEYE.
    


const month = document.getElementById("month");
const year = document.getElementById("year");
const title = document.getElementById("title");
const button = document.getElementById("generate");
const dayInput = document.getElementById("day");
const saveBtn = document.getElementById("save");
const noteInput = document.getElementById("note");
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
const today = new Date();
const cells = document.querySelectorAll("#calendar td");
const currentMonth = today.getMonth() + 1;
const currentYear = today.getFullYear();
 
function Calendar() {
    const monthValue = Number(month.value);
    const yearValue = Number(year.value);
 
    if (monthValue > 12 || monthValue < 1 || yearValue < 1) {
        title.innerText = "Please enter a valid month and year";
        return;
    }
 
    cells.forEach(function (cell) {
        cell.textContent = "";
        cell.classList.remove("today", "marked");
        delete cell.dataset.day;
    });
 
    //BUNLARA BAXMISAM ve basa dusmusem.
    const offset = (new Date(yearValue, monthValue - 1, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(yearValue, monthValue, 0).getDate();
    //BUNLARA BAXMISAM
 
    const marked = getMarked();  
 
    for (let i = 0; i < daysInMonth; i++) {
        cells[offset + i].textContent = i + 1;
        cells[offset + i].dataset.day = i + 1;
 
        if (marked.includes(yearValue + "-" + monthValue + "-" + (i + 1))) {
            cells[offset + i].classList.add("marked");
        }
 
        if (i + 1 === today.getDate() &&
        monthValue === currentMonth &&
        yearValue === currentYear) {
            cells[offset + i].classList.add("today");
        }
    }
    title.innerText = monthNames[monthValue - 1] + ", " + yearValue;
}
 
month.value = currentMonth;
year.value = currentYear;
 
Calendar();
 
function setCookie(name, value, seconds) {
    const d = new Date();
    d.setTime(d.getTime() + seconds * 1000);
 
    let expires = "expires=" + d.toUTCString();
 
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}
 
function getCookieValue(key) {
    let name = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
 
    let components = decodedCookie.split(';');
 
    for (let i = 0; i < components.length; i++) {
        let section = components[i];
        while (section.charAt(0) == " ") {
            section = section.substring(1);
        }
        // Muellim bu kodu men basdan sonacan baxdim burda while kohneden ile yazilmisdi 
        // ele bir sey vardi elede isleyirdi sohbetsiz. 
        // amma while kenarda yazilmaliydi. onu deyismisem.
        if (section.indexOf(name) == 0) {
            return section.substring(name.length, section.length);
        }
    }
    return "";
}
 
function getMarked() {
    const v = getCookieValue("marked");
    return v ? v.split(",") : [];
}


cells.forEach(function (cell) {
    cell.addEventListener("click", function () {
        const day = cell.dataset.day;
        if (!day) return;  

        const key = Number(year.value) + "-" + Number(month.value) + "-" + day;
        const text = getCookieValue("note-" + key);

        if (text) {
            alert(day + ": " + text);
        } else {
            alert(day + ": note yoxdur");
        }
    });
});
 
button.addEventListener("click", Calendar);
 
saveBtn.addEventListener("click", function () {
    const d = Number(dayInput.value);
    const m = Number(month.value);
    const y = Number(year.value);

    const key = y + "-" + m + "-" + d;

    const list = getMarked();
    if (!list.includes(key)) {
        list.push(key);
        setCookie("marked", list.join(","), 60 * 60 * 24 * 365);
    }

    setCookie("note-" + key, encodeURIComponent(noteInput.value), 60 * 60 * 24 * 365);

    Calendar();
    dayInput.value = "";
    noteInput.value = "";
});