import { setYear } from "../data/provider.js"

document.addEventListener("change",
    change => {
        if (change.target.id === 'select-year') {
            const [, year] = change.target.value.split("--")
            setYear(parseInt(year))
            const applicationElement = document.querySelector(".giffygram");
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
        }
    }
)

export const FooterBar = () => {
    const lastFiveYears = [2021, 2020, 2019, 2018, 2017]
    return `
    <div class='footer__item'>
        <select id="select-year">
            <option selected disabled disabled>Choose Year</option>
            ${lastFiveYears.map(
        year => {
            return `
                    <option value="year--${year}">${year}</option>
                    `
        }
    )}
        </select>
    </div>
    <div class='footer__item'>
        Posts by User (User Select)
    </div>
    <div class='footer__item'>
        Show only favorites (Checkbox)
    </div>
    `
}