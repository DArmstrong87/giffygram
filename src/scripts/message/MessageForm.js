import {
  createDirectMessage,
  getDisplayMessageForm,
  getUsers,
  getCurrentUser,
  setDisplayMessageForm,
  setRecipientUser,
} from "../data/provider.js";
const applicationElement = document.querySelector(".giffygram");
let selectedRecipient = "";

document.addEventListener("click", (click) => {
  if (click.target.id === "directMessage__cancel") {
    setDisplayMessageForm(false);
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});
document.addEventListener("change", (event) => {
  if (event.target.id === "select--recipient") {
    const [, recipientId] = event.target.value.split("--");
    selectedRecipient = parseInt(recipientId);
    console.log(selectedRecipient);
    setRecipientUser(selectedRecipient);
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});

document.addEventListener("click", (click) => {
  if (click.target.id === "directMessage__submit") {
    const currentUser = getCurrentUser();
    const userMessage = document.querySelector("input[name='message']").value;
    const recipientUser = selectedRecipient;

    const dataToAPI = {
      userId: currentUser,
      recipientId: recipientUser,
      text: userMessage,
      read: false,
    };
    if (dataToAPI.text === "" || dataToAPI.recipientId === "") {
      window.alert("Please fill in all fields");
    } else {
      window.alert("Message sent");
      createDirectMessage(dataToAPI);
      setDisplayMessageForm(false);
      selectedRecipient = "";
      console.log(selectedRecipient);
    }
  }
});

export const MessageForm = () => {
  let users = getUsers();
  let html = `
    <div class="directMessage" id="directMessageForm">
    <h3>Direct Message</h3>
    <div>Recipient:
    <select name="directMessage__userSelect" class="message__input" id="select--recipient">
    <option>Choose a recipient...</option>
    ${users
      .map((user) => {
        if (selectedRecipient === user.id) {
          return `<option selected value="recipient--${user.id}">${user.name}</option>`;
        } else {
          return `<option value="recipient--${user.id}">${user.name}</option>`;
        }
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
