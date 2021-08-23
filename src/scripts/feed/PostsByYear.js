import { getCurrentUser, getLikes, getPosts, getSelectedYear, getUsers } from "../data/provider.js"

export const postsByYear = () => {
    const posts = getPosts()
    let html = ''

    html += `${posts.map(post => {
        return listPosts(post)
    }).join("")}`

    return html
}

export const listPosts = (post) => {
    const users = getUsers()
    const currentUser = getCurrentUser()
    const likes = getLikes()
    const newDate = new Date(post.timestamp)
    const date = [newDate.getMonth() + 1, newDate.getDate(), newDate.getFullYear()].join("/")
    const selectedYear = getSelectedYear()
    const postYear = newDate.getFullYear(post.timestamp)
    const foundUser = users.find(
        user => {
            return user.id === post.userId
        })
    const foundLike = likes.find(
        like => {
            return like.postId === post.id && like.userId === currentUser
        }
    )
    let html = ''

    if (selectedYear === 0) {
        html +=
            `<div class="post">
                <h3>${post.title}</h3>
                <img class="post__image" src=${post.imageUrl}>
            </div>
            <div class="post__tagline">${post.description}</div>
            <div class="post__tagline">
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
    } else if (selectedYear === postYear) {
        html +=
            `<div class="post">
                <h3>${post.title}</h3>
                <img class="post__image" src=${post.imageUrl}>
            </div>
            <div class="post__tagline">${post.description}</div>
            <div class="post__tagline">
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
    }

    html += `</div>`
    return html
}
