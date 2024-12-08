const data = [
    {
        title: "Work",
        timeframes: {
            daily: { current: 5, previous: 7 },
            weekly: { current: 32, previous: 36 },
            monthly: { current: 103, previous: 128 },
        },
    },
    {
        title: "Play",
        timeframes: {
            daily: { current: 1, previous: 2 },
            weekly: { current: 10, previous: 8 },
            monthly: { current: 23, previous: 29 },
        },
    },
    {
        title: "Study",
        timeframes: {
            daily: { current: 0, previous: 1 },
            weekly: { current: 4, previous: 7 },
            monthly: { current: 13, previous: 19 },
        },
    },
    {
        title: "Exercise",
        timeframes: {
            daily: { current: 1, previous: 1 },
            weekly: { current: 4, previous: 5 },
            monthly: { current: 11, previous: 18 },
        },
    },
    {
        title: "Social",
        timeframes: {
            daily: { current: 1, previous: 3 },
            weekly: { current: 5, previous: 10 },
            monthly: { current: 21, previous: 23 },
        },
    },
    {
        title: "Self Care",
        timeframes: {
            daily: { current: 0, previous: 1 },
            weekly: { current: 2, previous: 2 },
            monthly: { current: 7, previous: 11 },
        },
    },
];

const buttons = document.querySelectorAll(".tog-btn");
const statsContainers = document.querySelectorAll(".stats-container");

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

function updatestats(timeframe) {
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
