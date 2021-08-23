import { getSelectedYear, setYear, getDisplayFavorites, setDisplayFavorites } from "../data/provider.js"

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

export const SelectedYear = () => {
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
    </div >`
}


const applicationElement = document.querySelector(".giffygram")
applicationElement.addEventListener("change",
    (event) => {
        const displayFavorites = getDisplayFavorites()
        if (event.target.name === "favoritesDisplay") {
            if (displayFavorites) {
                setDisplayFavorites(false)
                applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
            } else {
                setDisplayFavorites(true)
                applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
            }
        }
    })

export const FooterBar = () => {
    const displayFavorites = getDisplayFavorites()
    let checkbox = ""
    if (displayFavorites) {
        checkbox = `<label for="favoritesDisplay">Favorites</label>
        <input name="favoritesDisplay"type="checkbox" checked/>`
    } else {
        checkbox = `<label for="favoritesDisplay">Favorites</label>
        <input name="favoritesDisplay"type="checkbox"/>`
    }

    return `
    <div class='footer__item'>
        ${SelectedYear}
    </div>
    <div class='footer__item'>
        Posts by User (User Select)
    </div>
    <div class='footer__item'>
        ${checkbox}
        Show only favorites (Checkbox)
    </div>
`
}