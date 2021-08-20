import { NavBar } from "./nav/NavBar.js";
import { newPost } from "./feed/CreatePost.js";
import { postFeed } from "./feed/PostFeed.js";

export const GiffyGram = () => {
  return `<div>${NavBar()}</div>
            <div class="new-post-container">
            ${newPost()}</div>
            <div class="post-feed-container">${postFeed()}</div>
            <div>Footer</div>`;
};
