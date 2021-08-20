import { getCurrentUser, getMessages, getMessages, getUsers } from "../data/provider";
const applicationElement = document.querySelector(".giffygram")
//div class="messages" 
    //div class="messageList"
        //div class="message" id="message--messageId"
            //div class="message__author" > from: Name
            //div class="message__text"> message contenet

export const DirectMessagesHtml = ()=>{
    const currentUser = getCurrentUser()
    const getMessages = getMessages()
    const users = getUsers()
    const filteredMessages = getMessages.filter((message)=>{
        return message.recipientId === currentUser.id
    })
    const readMessages = filteredMessages.filter((message)=>{
        return message.read === true
    })
    const unReadMessages = filteredMessages.filter((message)=>{
        return message.read === false
    })
    const inbox = unReadMessages.concat(readMessages)
    return `
        <div class="messages">
            <h1>${currentUser.name}'s Inbox</h1>
            <button id="closeMessage">Close Messages</button>
            <div class="messageList>
                ${inbox.map((message)=>{
                    if (message.read){
                        return `<div class="message read" id="message--${message.id}>
                                    <div class="message__author"> From: ${users.find(user =>{
                                        return user.id === message.userId
                                    }).name}
                                    </div>
                                    <div class="message__text">${message.text}</div>
                                </div>`
                    }
                    else{
                        return `<div class="message" id="message--${message.id}>
                                    <div class="message__author"> From: ${users.find(user =>{
                                        return user.id === message.userId
                                    }).name}
                                    </div>
                                    <div class="message__text">${message.text}</div>
                                </div>`
                    }}).join("")}

                    }
            </div>
        </div>`
}


applicationElement.addEventListener("click",
    (event)=>{
        if (event.target.id === "closeMessage"){
            
        }
    })

