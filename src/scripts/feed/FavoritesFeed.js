import { getCurrentUser, getLikes, getPosts, getUsers} from "../data/provider.js";


export const FavoritesFeed = () =>{
    const post = getPosts()
    const currentUser = getCurrentUser()
    const likes = getLikes()
    const users = getUsers()
    const likedPost = post.filter((post)=>{
        const foundLike = likes.find((like)=> like.postId === post.id && like.userId === currentUser)
        if (foundLike !== undefined){
            return post
        }
    })
    let html = ""
    if (likedPost !== undefined){
        const sortedPost = likedPost.sort((a,b)=>  b.timestamp - a.timestamp)
        html += `${sortedPost.map((post)=>{
           return `<div class="post">
           <h3>${post.title}</h3>
           <img class="post__image" src="${post.imageUrl}">
       </div>
       <div class="post__tagline">${post.description}</div>
       <div class="post__tagline">
           Posted by <b><a href="">${users.find((user)=> user.id === post.userId).name}</a></b> on ${[new Date(post.timestamp).getMonth() + 1, new Date(post.timestamp).getDate(), new Date(post.timestamp).getFullYear()].join("/")}
       </div>
       <div class="post__actions">
       <img class="post__icon" id="deleteLike--${likes.find((like)=> like.postId === post.id).id}" src="./images/favorite-star-yellow.svg" />
       </div>`
       }).join("")}`

    }else{
        html += `<h2>You have not liked any post yet!</h2>`
    }
    return html
}

