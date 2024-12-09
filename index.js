let data = [];

async function loadData() {
    try {
        const response = await fetch("./data.json");
        data = await response.json();
        console.log(data);
        updatestats("daily");
    } catch (error) {
        console.error("Error reading JSON file:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".tog-btn");

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            const timeframe = this.innerText.toLowerCase();
            updatestats(timeframe);

            buttons.forEach((btn) => {
                btn.classList.remove("active");
                btn.classList.add("inactive");
            });
            this.classList.remove("inactive");
            this.classList.add("active");
        });
    });
});

function updatestats(timeframe) {
    if (data.length === 0) {
        console.error("Data is not loaded yet!");
        return;
    }

    data.forEach((activity) => {
        const currentElem = document.querySelector(
            `.${activity.title.toLowerCase().replace(" ", "-")}-cur`
        );
        const previousElem = document.querySelector(
            `.${activity.title.toLowerCase().replace(" ", "-")}-prev`
        );

        if (currentElem && previousElem) {
            currentElem.innerText = `${activity.timeframes[timeframe].current}hrs`;
            if (timeframe === "daily") {
                previousElem.innerText = `Yesterday - ${activity.timeframes[timeframe].previous}hrs`;
            } else {
                previousElem.innerText = `Last ${
                    timeframe === "weekly" ? "week" : "month"
                } - ${activity.timeframes[timeframe].previous}hrs`;
            }
        }
    });
}

loadData();

const toggle = document.querySelector("#toggle");
const toggleCircle = document.querySelector(".toggle-circle");
const toggleText = document.querySelector("#toggle-text");
const containers = document.querySelectorAll(".card");

document.body.classList.add("bg-[#0F1424]", "text-white");
toggleCircle.style.transform = "translateX(30px)";
toggleText.innerText = "Dark Mode";

toggle.addEventListener("click", () => {
    const isDarkMode = document.body.classList.contains("bg-[#0F1424]");

    if (isDarkMode) {
        document.body.classList.remove("bg-[#0F1424]", "text-white");
        document.body.classList.add("bg-[#fff]", "text-black");
        toggleText.innerText = "Light Mode";

        toggle.classList.remove("bg-[#fff]");
        toggle.classList.add("bg-[#0F1424]");

        toggleCircle.classList.remove("bg-[#fff]");
        toggleCircle.classList.add("bg-[#0F1424]");

        containers.forEach((container) => {
            container.style.backgroundColor = "#adadad";
            container.classList.remove("text-white");
            container.classList.add("text-black", "group-hover:opacity-60");
        });

        toggleCircle.style.transform = "translateX(0)";
    } else {
        document.body.classList.remove("bg-[#fff]", "text-black");
        document.body.classList.add("bg-[#0F1424]", "text-white");
        toggleText.innerText = "Dark Mode";

        toggle.classList.remove("bg-[#0F1424]");
        toggle.classList.add("bg-[#fff]");

        toggleCircle.classList.remove("bg-[#0F1424]");
        toggleCircle.classList.add("bg-[#fff]");

        containers.forEach((container) => {
            container.style.backgroundColor = "#1C1F4A";

            container.classList.remove("text-black", "group-hover:opacity-60");
            container.classList.add("text-white");
        });

        toggleCircle.style.transform = "translateX(30px)";
    }
});
