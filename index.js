const calendar = document.getElementById("calendar");

for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
        row.appendChild(document.createElement("td"));
    }
    calendar.appendChild(row);
}




const cells = document.querySelectorAll("#calendar td");

const month = document.getElementById("month");
const year = document.getElementById("year");
const title = document.getElementById("title");
const button = document.getElementById("generate");

const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];

const today = new Date();
const currentMonth = today.getMonth() + 1;
const currentYear = today.getFullYear();

function Calendar() {
    const monthValue = Number(month.value);
    const yearValue = Number(year.value);

    if (monthValue > 12 || monthValue < 1 || yearValue < 1) {
        title.innerText = "Please enter a valid month and year";
        return;
    }


    // BUNU TAPMISAM
    const offset = (new Date(yearValue, monthValue - 1, 1).getDay() + 6) % 7;

    // BUNU TAPMISAM 
    const daysInMonth = new Date(yearValue, monthValue, 0).getDate();

    // 4. Günleri yaz
    for (let i = 0; i < daysInMonth; i++) {
        cells[offset + i].textContent = i + 1;

        if (i + 1 === today.getDate() && monthValue === currentMonth && yearValue === currentYear) {
            cells[offset + i].classList.add("today");
        }
    }

    // 5. Başlık
    title.textContent = monthNames[monthValue - 1] + ", " + yearValue;
}

button.addEventListener("click", Calendar);

// Sayfa açılınca bugünün ayını göster
month.value = currentMonth;
year.value = currentYear;
Calendar();