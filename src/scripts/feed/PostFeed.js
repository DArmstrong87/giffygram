
import {
  createLike,
  deleteLike,
  deletePost,
  getCurrentUser,
  getLikes,
  getPosts,
  getUsers,
  getDisplayFavorites,
  getSelectedYear,
  getSelectedUser,
} from "../data/provider.js";


// Delete Post
document.addEventListener("click", (click) => {
  const clicked = click.target.id;
  if (clicked.startsWith("deletePost--") === true) {
    const [, postId] = clicked.split("--");
    deletePost(parseInt(postId));
  }
});
// Delete Like
document.addEventListener("click", (click) => {
  const clicked = click.target.id;
  if (clicked.startsWith("deleteLike--") === true) {
    const [, likeId] = clicked.split("--");
    deleteLike(parseInt(likeId));
  }
});

// Create Like
document.addEventListener("click", (click) => {
  const clicked = click.target.id;
  if (clicked.startsWith("like--") === true) {
    const [, postId] = clicked.split("--");
    const currentUser = getCurrentUser();
    const likeDataToAPI = {
      userId: currentUser,
      postId: parseInt(postId),
    };
    createLike(likeDataToAPI);
  }
});
export const postFeed = () => {
  const selectedYear = getSelectedYear();
  const selectedUser = getSelectedUser();
  const posts = getPosts()
  const likes = getLikes()
  const currentUser = getCurrentUser()
  let html = ""
  //if display favorites is true then filters the post to make it display only liked post
  if (getDisplayFavorites()) {
    const likedPost = posts.filter((post)=>{
        const foundLike = likes.find((like)=> like.postId === post.id && like.userId === currentUser)
        if (foundLike !== undefined){
            return post
        }
    });
    if (likedPost.length > 0){
        const sortedPost = likedPost.sort((a, b) => b.timestamp - a.timestamp);
        html = `${sortedPost.map((post)=> listPosts(post)).join("")}`
        return html

    }else{
        html = `<h3>You have not liked any post! Click the Star on the Post to Like the post</h3>`
        return html
    }
//if a year is selected then filters the post to make it display only post with the correct year
  } else if (selectedYear > 0) {
    const selectedYear = getSelectedYear();
    const matchedYear = posts.filter((post)=>{
        const newDate = new Date(post.timestamp);
        const postYear = newDate.getFullYear(post.timestamp);
        return postYear === selectedYear
    })
    if (matchedYear.length > 0 ){
        const sortedPost = matchedYear.sort((a, b) => b.timestamp - a.timestamp);
        html = `${sortedPost.map((post)=> listPosts(post)).join("")}`
        return html

    }else{
        html = `<h3>There are no post for this Year!</h3>`
        return html
    }
// if a user is selected then it will filter post by selected user
  } else if (selectedUser !== null) {
    const foundUser = getUsers().find((user)=> user.id === selectedUser)
    const selectedUserPost = posts.filter((post)=>{
        return post.userId === selectedUser
    })
    if (selectedUserPost.length > 0 ){
        const sortedPost = selectedUserPost.sort((a, b) => b.timestamp - a.timestamp);
        html = `${sortedPost.map((post)=> listPosts(post)).join("")}`
        return html

    }else{
        html = `<h3>${foundUser.name} has not added any post yet!</h3>`
        return html
    }
  } else {
    const posts = getPosts();
    const sortedPost = posts.sort((a, b) => b.timestamp - a.timestamp);
    let html = "";

    html += `${sortedPost
      .map((post) => {
        return listPosts(post);
      })
      .join("")}`;

      return html;
    }
};

const listPosts = (post) => {
  const users = getUsers();
  const currentUser = getCurrentUser();
  const likes = getLikes();
  const newDate = new Date(post.timestamp);
  const date = [
    newDate.getMonth() + 1,
    newDate.getDate(),
    newDate.getFullYear(),
  ].join("/");
  const foundUser = users.find((user) => {
    return user.id === post.userId;
  });
  const foundLike = likes.find((like) => {
    return like.postId === post.id && like.userId === currentUser;
  });
  let html = `<div class="post">
            <h3>${post.title}</h3>
            <img class="post__image" src="${post.imageUrl}">
        </div>
        <div class="post__tagline">${post.description}</div>
        <div class="post__tagline">
            Posted by <b><a href="">${foundUser.name}</a></b> on ${date}
        </div>
        <div class="post__actions">`;

  if (foundLike) {
    html += `<img class="post__icon" id="deleteLike--${foundLike.id}" src="./images/favorite-star-yellow.svg" />`;
  } else {
    html += `<img class="post__icon" id="like--${post.id}" src="./images/favorite-star-blank.svg" />`;
  }

  if (post.userId === currentUser) {
    html += `<img class="post__icon" id="deletePost--${post.id}" src="./images/block.svg" /></div>`;
  }
  html += `</div>`;
  return html;
};
