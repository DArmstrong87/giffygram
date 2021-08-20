const applicationElement = document.querySelector(".giffygram");

document.addEventListener("click", (click) => {
  if (click.target.id === "logo") {
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});

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
          <div class="notification__count">0</div>
        </div>
        <div class="navigation__item navigation__logout">
          <button id="logout" class="fakeLink">Logout</button>
        </div>
      </nav>
    `;
  return html;
};
