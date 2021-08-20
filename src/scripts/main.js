import { GiffyGram } from "./GiffyGram.js"
import { LoginForm } from "./auth/Login.js"
import { fetchFollows, fetchLikes, fetchMessages, fetchPosts, fetchUsers, getLoginState, setCurrentUser } from "./data/provider.js"
import { RegisterUser } from "./auth/Register.js"
const applicationElement = document.querySelector(".giffygram")

export const renderApp = () => {
    const user = parseInt(localStorage.getItem("gg_user"))
    setCurrentUser(user)
    const createUser = getLoginState()
    //fetch calls here, once fetch are complete then check if user
    fetchUsers()
    .then(fetchFollows)
    .then(fetchLikes)
    .then(fetchMessages)
    .then(fetchPosts)
    .then (()=>{
        if (user) {
            applicationElement.innerHTML = GiffyGram()
        } else {
            if (createUser){
                applicationElement.innerHTML = RegisterUser()
            }else{
                applicationElement.innerHTML = LoginForm()
            }
        }

    })
}
renderApp()
applicationElement.addEventListener("stateChanged",
    (event)=> renderApp())