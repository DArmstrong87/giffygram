import { getCurrentUser, getMessages, getMessages } from "../data/provider";

//div class="messages" 
    //div class="messageList"
        //div class="message" id="message--messageId"
            //div class="message__author" > from: Name
            //div class="message__text"> message contenet

export const DirectMessagesHtml = ()=>{
    const currentUser = getCurrentUser()
    const getMessages = getMessages()
}