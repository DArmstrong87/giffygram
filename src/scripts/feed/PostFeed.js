import { getCurrentUser, getPosts, getUsers } from "../data/provider.js"


const listPosts = (post) => {
    console.log(post)
    const users = getUsers()
    const currentUser = getCurrentUser()
    const date = new Date(post.timestamp)
    const foundUser = users.find(
        user => {
            return user.id === post.userId
        })
    let html =
        `<div class="post">
        <h3>${post.title}</h3>
        <img class="post__image" src=${post.imageUrl}>
        </div>
        <div class="post">
        Posted by <b><a href="">${foundUser.name}</a></b> on ${date}
        </div>
        <div class="post__actions">
        <img class="post__icon" src="./images/favorite-star-blank.svg" />`

    if (post.userId === currentUser) {
        html += `<img class="post__icon" src="./images/block.svg" />`
    }
    html += `</div></div>`
    return html
}

export const postFeed = () => {
    const posts = getPosts()
    let html = ''

    html += `${posts.map(post => {
        return listPosts(post)
    }).join("")}`


    return html
}