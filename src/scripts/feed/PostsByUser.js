import {
  getCurrentUser,
  getPosts,
  getUsers,
  getSelectedUser,
  getLikes,
} from "../data/provider.js";

export const UsersFeed = () => {
  const post = getPosts();
  const likes = getLikes();
  const currentUser = getCurrentUser();
  const selectedUser = getSelectedUser();
  const users = getUsers();

  const usersPost = post.filter((post) => {
    return post.userId === selectedUser;
  });
  let html = "";
  if (usersPost !== undefined) {
    const sortedPost = usersPost.sort((a, b) => b.timestamp - a.timestamp);
    html += `${sortedPost
      .map((post) => {
        const foundLike = likes.find((like) => {
          return like.postId === post.id && like.userId === currentUser;
        });
        let starIcon = null;
        let trashIcon = null;
        if (foundLike) {
          starIcon = `<img class="post__icon" id="deleteLike--${foundLike.id}" src="./images/favorite-star-yellow.svg" />`;
        } else {
          starIcon = `<img class="post__icon" id="like--${post.id}" src="./images/favorite-star-blank.svg" />`;
        }
        if (post.userId === currentUser) {
          trashIcon = `<img class="post__icon" id="deletePost--${post.id}" src="./images/block.svg" /></div>`;
        }
        return `<div class="post">
           <h3>${post.title}</h3>
           <img class="post__image" src="${post.imageUrl}">
       </div>
       <div class="post__tagline">${post.description}</div>
       <div class="post__tagline">
           Posted by <b><a href="">${
             users.find((user) => user.id === post.userId).name
           }</a></b> on ${[
          new Date(post.timestamp).getMonth() + 1,
          new Date(post.timestamp).getDate(),
          new Date(post.timestamp).getFullYear(),
        ].join("/")}
       </div>
      <div class="post__actions">
        ${starIcon}
        ${trashIcon}
        </div>`;
      })
      .join("")}`;
  }
  return html;
};
