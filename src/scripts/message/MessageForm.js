import { createDirectMessage } from "../data/provider.js";

document.addEventListener("click", (click) => {
  if (click.target.id === "directMessageIcon") {
    const container = document.getElementById("newMessageForm");
    container.innerHTML = MessageForm();
  }
});

export const MessageForm = () => {
  let html = `
        <div class="directMessage" id="directMessageForm">
                <h3>Direct Message</h3>
                <div>Recipient:
                    <select name="directMessage__userSelect" class="message__input">
                        <option>Choose a recipient...</option>
                        <option value="messageRecipient--1">1</option>,<option value="messageRecipient--2">2</option>,<option value="messageRecipient--3">3</option>,<option value="messageRecipient--4">4</option>,<option value="messageRecipient--5">5</option>,<option value="messageRecipient--6">6</option>
                    </select>
                </div>
                <div>
                    <label for="message">Message:</label>
                    <input name="message" class="message__input" type="text" placeholder="Message to user">
                </div>

                <button id="directMessage__submit">Save</button>
                <button id="directMessage__cancel">Cancel</button>

                <button id="directMessage__close">x</button>

            </div>
    `;
  return html;
};
