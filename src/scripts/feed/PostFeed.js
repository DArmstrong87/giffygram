import { createLike, deleteLike, deletePost, getCurrentUser, getLikes, getPosts, getSelectedYear, getUsers } from "../data/provider.js"
import { postsByYear } from "./PostsByYear.js"

// Delete Post
document.addEventListener("click",
    click => {
        const clicked = click.target.id
        if (clicked.startsWith('deletePost--') === true) {
            const [, postId] = clicked.split("--")
            deletePost(parseInt(postId))
        }
    }
)
// Delete Like
document.addEventListener("click",
    click => {
        const clicked = click.target.id
        if (clicked.startsWith('deleteLike--') === true) {
            const [, likeId] = clicked.split("--")
            deleteLike(parseInt(likeId))
        }
    }
)

// Create Like
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

export const postFeed = () => {
    const posts = getPosts()
    let html = ''

    html += postsByYear()

    return html
}