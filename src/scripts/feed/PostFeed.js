import { getPosts } from "../data/provider.js"


const listPosts = (post) => {
    console.log(post)
    return `<div class="post">
        <h3>
            ${post.title}
        </h3>
        <img class="post__image" src=${post.imageUrl}>
        </div>
        `
}

export const postFeed = () => {
    const posts = getPosts()
    let html = ''

    html += `${posts.map(post => {
        return listPosts(post)
    }).join("")}`


    return html
}