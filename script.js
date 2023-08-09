const P = document.querySelectorAll("section p");
const bars = document.querySelectorAll(".bar");
const daysOfWeekNames = [6, 0, 1, 2, 3, 4, 5];

getData();

async function getData() {
    const response = await fetch("./data.json");
    const data = await response.json();
    let biggest = [data[0], 0];

    data.forEach((element, index) => {
        P[index].innerHTML = "$" + element.amount;
        if (element.amount > biggest[0].amount) {
            biggest = [element, index];
        }
    });
    bars.forEach((bar, index) => {
        bar.style.height = "70%"
        bar.style.height = bars[biggest[1]].clientHeight * (data[index].amount / biggest[0].amount) + "px";
    });
    console.log(bars[biggest[1]].clientHeight)
};

bars.forEach(bar => {
    bar.addEventListener("mouseover", () => {
        const p = bar.parentElement.querySelector("p");
        p.classList.remove("hidden");
    });

    bar.addEventListener("mouseleave", () => {
        const p = bar.parentElement.querySelector("p");
        p.classList.add("hidden");
    });
});

bars[daysOfWeekNames[new Date().getDay()]].style.backgroundColor = "hsl(186, 34%, 60%)"

window.addEventListener("resize", getData);