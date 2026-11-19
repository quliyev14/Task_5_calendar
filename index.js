const calendar = document.getElementById("calendar");
for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
        row.appendChild(document.createElement("td"));
    }
    calendar.appendChild(row);
}

const month = document.getElementById("month");
const year = document.getElementById("year");
const title = document.getElementById("title");
const button = document.getElementById("generate");
const dayInput = document.getElementById("day");
const saveBtn = document.getElementById("save");
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

const today = new Date();
const cells = document.querySelectorAll("#calendar td");
const currentMonth = today.getMonth() + 1;
const currentYear = today.getFullYear();
const ONE_YEAR = 365 * 24 * 60 * 60;



function setCookie(name, value, seconds) {
    const d = new Date();
    d.setTime(d.getTime() + seconds * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${d.toUTCString()}; path=/`;
}

function getCookieValue(key) {
    const name = key + "=";
    const components = document.cookie.split(";");

    for (let section of components) {
        section = section.trim();
        if (section.indexOf(name) === 0) {
            return decodeURIComponent(section.substring(name.length));
        }
    }
    return "";
}


function getMarked() {
    const v = getCookieValue("marked");
    return v ? v.split(",") : [];
}


function renderCalendar() {
    const monthValue = Number(month.value);
    const yearValue = Number(year.value);

    if (!Number.isInteger(monthValue) || !Number.isInteger(yearValue) ||
        monthValue > 12 || monthValue < 1 || yearValue < 1) {
        title.innerText = "Please enter a valid month and year";
        return;
    }

    cells.forEach(function (cell) {
        cell.textContent = "";
        cell.classList.remove("today", "marked");
        delete cell.dataset.day;
    });

    const offset = (new Date(yearValue, monthValue - 1, 1).getDay() + 6) % 7;
    // Ayda neçə gün var
    const daysInMonth = new Date(yearValue, monthValue, 0).getDate();

    const marked = getMarked();

    for (let i = 0; i < daysInMonth; i++) {
        const cell = cells[offset + i];
        cell.textContent = i + 1;
        cell.dataset.day = i + 1;

        if (marked.includes(yearValue + "-" + monthValue + "-" + (i + 1))) {
            cell.classList.add("marked");
        }

        if (i + 1 === today.getDate() &&
            monthValue === currentMonth &&
            yearValue === currentYear) {
            cell.classList.add("today");
        }
    }
    title.innerText = monthNames[monthValue - 1] + ", " + yearValue;
}


button.addEventListener("click", renderCalendar);

saveBtn.addEventListener("click", function () {
    const d = Number(dayInput.value);
    const m = Number(month.value);
    const y = Number(year.value);

    if (!Number.isInteger(m) || !Number.isInteger(y) || m < 1 || m > 12 || y < 1) {
        title.innerText = "Please enter a valid month and year";
        return;
    }

    const daysInMonth = new Date(y, m, 0).getDate();
    if (dayInput.value === "" || !Number.isInteger(d) || d < 1 || d > daysInMonth) {
        title.innerText = "Please enter a valid day";
        return;
    }

    const list = getMarked();
    const key = y + "-" + m + "-" + d;

    if (!list.includes(key)) {
        list.push(key);
        setCookie("marked", list.join(","), ONE_YEAR);
    }

    renderCalendar();
    dayInput.value = "";
});


month.value = currentMonth;
year.value = currentYear;
renderCalendar();