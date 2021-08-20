import { createLike, deleteLike, deletePost, getCurrentUser, getLikes, getPosts, getUsers } from "../data/provider.js"

document.addEventListener("click",
    click => {
        const clicked = click.target.id
        if (clicked.startsWith('deletePost--') === true) {
            const [, postId] = clicked.split("--")
            deletePost(postId)
        }
    }
)
document.addEventListener("click",
    click => {
        const clicked = click.target.id
        if (clicked.startsWith('deleteLike--') === true) {
            const [, likeId] = clicked.split("--")
            deleteLike(parseInt(likeId))
        }
    }
)
document.addEventListener("click",
    click => {
        const clicked = click.target.id
        if (clicked.startsWith('like--') === true) {
            const [, postId] = clicked.split("--")
            const currentUser = getCurrentUser()
            const likeDataToAPI = {
                userId: currentUser,
                postId: parseInt(postId)
            }
            createLike(likeDataToAPI)
        }
    }
)

const listPosts = (post) => {
    const users = getUsers()
    const currentUser = getCurrentUser()
    const likes = getLikes()
    const date = new Date(post.timestamp)
    const foundUser = users.find(
        user => {
            return user.id === post.userId
        })
    const foundLike = likes.find(
        like => {
            return like.postId === post.id && like.userId === currentUser
        }
    )
    let html =
        `<div class="post">
            <h3>${post.title}</h3>
            <img class="post__image" src=${post.imageUrl}>
            </div>
            <div class="post__tagline">${post.description}</div>
            <div class="post">
            Posted by <b><a href="">${foundUser.name}</a></b> on ${date}
            </div>
            <div class="post__actions">`

    if (foundLike) {
        html += `<img class="post__icon" id="deleteLike--${foundLike.id}" src="./images/favorite-star-yellow.svg" />`
    } else {
        html += `<img class="post__icon" id="like--${post.id}" src="./images/favorite-star-blank.svg" />`
    }

    if (post.userId === currentUser) {
        html += `<img class="post__icon" id="deletePost--${post.id}" src="./images/block.svg" /></div>`
    }
    html += `</div>`
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