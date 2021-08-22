import { LoginForm } from "../auth/Login.js";
import { getCurrentUser, setCurrentUser, setDisplayMessages } from "../data/provider.js";
import { InboxNumbers } from "../friends/DirectMessage.js";
const applicationElement = document.querySelector(".giffygram");

document.addEventListener("click", (click) => {
  if (click.target.id === "logo") {
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});
document.addEventListener("click", (click) => {
  if (click.target.id === "logout") {
    let user = {};
    setCurrentUser(user);
    localStorage.clear();
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});
applicationElement.addEventListener("click",
  (event)=>{
    if (event.target.id ==="notification__count"){
      setDisplayMessages(true)
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    }
  })
export const NavBar = () => {
  let html = `
          <nav class="navigation">
        <div class="navigation__item navigation__icon">
          <img src="/images/pb.png" alt="Giffygram icon" id="logo" />
        </div>
        <div class="navigation__item navigation__name" id="logo">Giffygram</div>
        <div class="navigation__item navigation__search"></div>
        <div class="navigation__item navigation__message">
          <img
            id="directMessageIcon"
            src="/images/fountain-pen.svg"
            alt="Direct message"
          />
          <div id="notification__count"class="notification__count">${InboxNumbers()}</div>
        </div>
        <div class="navigation__item navigation__logout">
          <button id="logout" class="fakeLink">Logout</button>
        </div>
      </nav>
    `;
  return html;
};
