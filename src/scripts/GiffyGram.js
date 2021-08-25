import { NavBar } from "./nav/NavBar.js";
import { MessageForm } from "./message/MessageForm.js";
import { newPost } from "./feed/CreatePost.js";
import { postFeed } from "./feed/PostFeed.js";
import { getDisplayUserProfile, getMessageState } from "./data/provider.js";
import { DirectMessagesHtml } from "./friends/DirectMessage.js";
import { FooterBar } from "./nav/Footer.js";
import { UserProfile } from "./friends/UserProfile.js";


export const GiffyGram = () => {
  console.log(getDisplayUserProfile())
  if (getMessageState()) {
    return `<div>${NavBar()}</div>
                <div>${DirectMessagesHtml()}</div>`;
  } else if (getDisplayUserProfile() > 0) {
    return `<div>${NavBar()}</div>
                <section class="userProfile">${UserProfile()}</section>`
  }
  else {
    return `<div>${NavBar()}</div>
        <div id="newMessageForm">${MessageForm()}</div>
        <div class="new-post-container">
        ${newPost()}</div>
        <section class="giffygram__feed">${postFeed()}</section>
        <div class='footer'>${FooterBar()}</div>`;
  }
};