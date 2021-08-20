import { GiffyGram } from "./GiffyGram.js"
import { LoginForm } from "./auth/Login.js"
import { fetchFollows, fetchLikes, fetchMessages, fetchPosts, fetchUsers } from "./data/provider.js"
const applicationElement = document.querySelector(".giffygram")

export const renderApp = () => {
    const user = parseInt(localStorage.getItem("gg_user"))
    //fetch calls here, once fetch are complete then check if user
    fetchUsers()
    fetchFollows()
    fetchLikes()
    fetchMessages()
    fetchPosts()
    .then (()=>{
        if (user) {
            applicationElement.innerHTML = GiffyGram()
        } else {
            applicationElement.innerHTML = LoginForm()
        }

    })
}
renderApp()
applicationElement.addEventListener("stateChanged",
    (event)=> renderApp())