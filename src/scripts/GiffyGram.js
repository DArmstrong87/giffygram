import { NavBar } from "./nav/NavBar.js";
import { newPost, newPostForm } from "./feed/PostList.js";
import { getMessageState } from "./data/provider.js";
import { DirectMessagesHtml } from "./friends/DirectMessage.js";
export const GiffyGram = () => {
    if (getMessageState()){
        return `<div>${NavBar()}</div>
                <div>${DirectMessagesHtml()}`
    }else{

        return `<div>${NavBar()}</div>
                  <div>
                  ${newPost()}
                  PostFeed</div>
                  <div>Footer</div>`;
    }
};
