import { NavBar } from "./nav/NavBar.js";
import { newPost, newPostForm } from "./feed/PostList.js";
import { getDisplayMessageForm } from "./data/provider.js";
import { MessageForm } from "./message/MessageForm.js";

export const GiffyGram = () => {
  return `<div>${NavBar()}</div>
            <div id="newMessageForm">
            ${MessageForm()}
            </div>        
            <div>
            ${newPost()}
            PostFeed</div>
            <div>Footer</div>`;
};
