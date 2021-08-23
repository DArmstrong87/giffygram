import { getSelectedYear, setYear } from "../data/provider.js"

document.addEventListener("change",
    change => {
        if (change.target.id === 'select-year') {
            const [, year] = change.target.value.split("--")
            setYear(year)
            const applicationElement = document.querySelector(".giffygram");
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
            console.log(year)
        }
    }
)

export const FooterBar = () => {
    const selectedYear = getSelectedYear()
    const lastFiveYears = [2021, 2020, 2019, 2018, 2017]
    let html = `<div class='footer__item'><select id="select-year">`

    if (selectedYear === 0) {
        html += `<option selected value="year--0">All Posts</option>`
    } else {
        html += `<option value="year--0">All Posts</option>`
    }

    lastFiveYears.map(
        year => {
            if (year === selectedYear) {
                html += `<option selected value="year--${year}">${year}</option>`
            } else {
                html += `<option value="year--${year}">${year}</option>`
            }
        })

    html += `</select >
    </div >
    <div class='footer__item'>
        Posts by User (User Select)
    </div>
    <div class='footer__item'>
        Show only favorites (Checkbox)
    </div>
`
    return html
}