import { NavBar } from "./nav/NavBar.js";
import { newPost } from "./feed/CreatePost.js";
import { postFeed } from "./feed/PostFeed.js";
import { getMessageState } from "./data/provider.js";
import { DirectMessagesHtml } from "./friends/DirectMessage.js";
import { Footer } from "./nav/Footer.js";

export const GiffyGram = () => {
    if (getMessageState()) {
        return `<div>${NavBar()}</div>
                <div>${DirectMessagesHtml()}`
    } else {

        return `<div>${NavBar()}</div>
        <div class="new-post-container">
        ${newPost()}</div>
        <div class="giffygram__feed">${postFeed()}</div>
        <div class='footer'>${Footer()}</div>`;
    }
};