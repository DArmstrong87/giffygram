import { NavBar } from "./nav/NavBar.js";
import { newPost, newPostForm } from "./feed/PostList.js";

export const GiffyGram = () => {
  return `<div>${NavBar()}</div>
            <div>
            ${newPost()}
            PostFeed</div>
            <div>Footer</div>`;
};
