import { getCurrentUser, getMessages, getUsers, setDisplayMessages, UpdateMessageRead } from "../data/provider.js";
const applicationElement = document.querySelector(".giffygram")
//div class="messages" 
    //div class="messageList"
        //div class="message" id="message--messageId"
            //div class="message__author" > from: Name
            //div class="message__text"> message contenet
export const InboxNumbers = ()=>{
    const messages = getMessages()
    const users = getUsers()
    const currentUser = users.find((user)=> user.id === getCurrentUser())
    const filteredMessages = messages.filter((message)=>{
        return message.recipientId === currentUser.id
    })
    const unReadMessages = filteredMessages.filter((message)=>{
        return message.read === false
    })
    return unReadMessages.length
}
export const DirectMessagesHtml = ()=>{
    const messages = getMessages()
    const users = getUsers()
    const currentUser = users.find((user)=> user.id === getCurrentUser())
    const filteredMessages = messages.filter((message)=>{
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
            <div class="messageList">
                ${inbox.map((message)=>{
                    if (message.read === true){
                        return `<div class="message read" id="message--${message.id}">
                                    <div class="message__author"> From: ${users.find(user =>{
                                        return user.id === message.userId
                                    }).name}
                                    </div>
                                    <div class="message__text">${message.text}</div>
                                    <label for="unread">Mark as Unread</label>
                                    <input id="readStatus--${message.id}"type="checkbox" name="unread"/>
                                </div>`
                    }
                    else if (message.read === false){
                        return `<div class="message unread" id="message--${message.id}">
                                    <div class="message__author"> From: ${users.find(user =>{
                                        return user.id === message.userId
                                    }).name}
                                    </div>
                                    <div class="message__text">${message.text}</div>
                                    <label for="read">Mark as Read</label>
                                    <input id="readStatus--${message.id}"type="checkbox" name="read"/>
                                </div>`
                    }}).join("")}

                    }
            </div>
        </div>`
}


applicationElement.addEventListener("click",
    (event)=>{
        if (event.target.id === "closeMessage"){
            setDisplayMessages(false)
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        }
    })

applicationElement.addEventListener("change",
    (event)=>{
        if (event.target.id.startsWith("readStatus")){
            const [,targetId] = event.target.id.split("--")
            let readStatus = null
            if(event.target.name === "read"){
                readStatus = true
            }else if(event.target.name ==="unread"){
                readStatus = false
            }
            const toggleRead = {'read': readStatus}
            UpdateMessageRead(toggleRead, parseInt(targetId))
        }
    })