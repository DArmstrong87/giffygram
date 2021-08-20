import {
  createDirectMessage,
  getDisplayMessageForm,
  getUsers,
  setDisplayMessageForm,
} from "../data/provider.js";
const applicationElement = document.querySelector(".giffygram");

document.addEventListener("click", (click) => {
  if (click.target.id === "directMessage__cancel") {
    setDisplayMessageForm(false);
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});

export const MessageForm = () => {
  let users = getUsers();
  let html = `
    <div class="directMessage" id="directMessageForm">
    <h3>Direct Message</h3>
    <div>Recipient:
    <select name="directMessage__userSelect" class="message__input">
    <option>Choose a recipient...</option>
    ${users
      .map((user) => {
        return `<option id="users--${user.id}" value="recipient--${user.id}">${user.name}</option>`;
      })
      .join("")}
    </select>
    </div>
    <div>
    <label for="message">Message:</label>
    <input name="message" class="message__input" type="text" placeholder="Message to user">
    </div>
    
    <button id="directMessage__submit">Save</button>
    <button id="directMessage__cancel">Cancel</button>
    
    </div>
    `;
  if (getDisplayMessageForm()) {
    return html;
  } else {
    return;
  }
};
