import { getDisplayFavorites, setDisplayFavorites } from "../data/provider.js"

const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("change",
    (event)=>{
        const displayFavorites = getDisplayFavorites()
        if (event.target.name === "favoritesDisplay"){
            if(displayFavorites){
                setDisplayFavorites(false)
                applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
            }else{
                setDisplayFavorites(true)
                applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
            }
        }
    })

export const FooterBar = () => {
    const displayFavorites = getDisplayFavorites()
    let checkbox = ""
    if (displayFavorites){
        checkbox = `<label for="favoritesDisplay">Favorites</label>
        <input name="favoritesDisplay"type="checkbox" checked/>`
    }else{
        checkbox = `<label for="favoritesDisplay">Favorites</label>
        <input name="favoritesDisplay"type="checkbox"/>`
    }
    
    
    
    
    return `
    <div class='footer__item'>
        Posts Since (Year Select)
    </div>
    <div class='footer__item'>
        Posts by User (User Select)
    </div>
    <div class='footer__item'>
        ${checkbox}
    </div>
    `
}