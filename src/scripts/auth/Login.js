import { getUsers, setCurrentUser, setDisplayCreateUser } from "../data/provider.js"


document.addEventListener("click", clickEvent => {
    
    if(clickEvent.target.id === "createUserButton"){
        setDisplayCreateUser(true)
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
    }
})

export const LoginForm = () => {
    return `
        <section class="loginForm">
            <h1>Giffygram</h1>
            <img src="./images/pb.png" alt="Giffygram icon" id="logo" />
            <div id="loginbuttonsdiv">
            <button id="loginButton">Login</button>
            <button id="createUserButton">Create User</button>
            </div>
        </section>
    `
}
document.addEventListener("click",
(event)=>{
    if (event.target.id === "loginButton"){
        let foundUser = null
        const userState = getUsers()
        Swal.fire({
            title: 'Login ',
            html: `<input type="text" id="login" name="password"name="email"class="swal2-input" placeholder="Username">
            <input type="password" id="password" class="swal2-input" placeholder="Password">`,
            confirmButtonText: 'Sign in',
            focusConfirm: false,
            preConfirm: () => {
              const login = Swal.getPopup().querySelector('#login').value
              const password = Swal.getPopup().querySelector('#password').value
              const checkedUser = userState.some(user => user.email === login && user.password === password)
              const foundUser = userState.find(user => user.email === login && user.password === password)
              if (!login || !password) {
                Swal.showValidationMessage(`Please enter login and password`)
              }else if(checkedUser === false){
                Swal.showValidationMessage(`You entered the wrong information`) 
              }else if (checkedUser){
                  
                  localStorage.setItem("gg_user", foundUser.id)
                  
              }
              
              return { login: login, password: password }
            }
          }).then((result) => {
            Swal.fire({
                title: "Login Successful",
                icon:"success",
                confirmButtonText: 'Continue',
                focusConfirm: false,
            }).then(document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged")))
          })
    }
})
  