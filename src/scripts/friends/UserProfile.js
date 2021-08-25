import {
  setDisplayUserProfile,
  createFollow,
  deleteFollow,
  getFollows,
  getCurrentUser,
  getDisplayUserProfile,
  getPosts,
  getUsers,
  setDisplayNewPostForm,
} from "../data/provider.js";
import { listPosts } from "../feed/PostFeed.js";
import { MessageForm } from "../message/MessageForm.js";
const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", (click) => {
  if (click.target.id.startsWith("user")) {
    const [, foundUserId] = click.target.id.split("--");
    const chosenUser = parseInt(foundUserId);
    setDisplayUserProfile(chosenUser);
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});

applicationElement.addEventListener("click", (click) => {
  if (click.target.id.startsWith("follow")) {
    const [, userProfileId] = click.target.id.split("--");
    const chosenProfileId = parseInt(userProfileId);
    const dataToAPI = {
      followingId: chosenProfileId,
      userId: getCurrentUser(),
    };
    createFollow(dataToAPI);
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});
applicationElement.addEventListener("click", (click) => {
  if (click.target.id.startsWith("unfollow")) {
    const [, userProfileId] = click.target.id.split("--");
    const chosenProfileId = parseInt(userProfileId);
    deleteFollow(chosenProfileId);
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});

export const FollowButton = () => {
  const currentUser = getCurrentUser();
  const follows = getFollows();
  const userProfile = getDisplayUserProfile();
  const filteredFollows = follows.filter(
    (follow) => currentUser === follow.userId
  );
  const findFollows = filteredFollows.find(
    (follow) => follow.followingId === userProfile
  );

  if (findFollows !== undefined) {
    return `
                <div class='UnfollowUserButton'><button id="unfollow--${findFollows.id}">Unfollow</button></div>
                `;
  } else {
    return `
                <div class='followUserButton'><button id="follow--${userProfile}">Follow</button></div>
                `;
  }
};

applicationElement.addEventListener("click", (click) => {
  if (click.target.id.startsWith("user")) {
    // click.preventDefault()
    const [, foundUserId] = click.target.id.split("--");
    const chosenUser = parseInt(foundUserId);
    setDisplayUserProfile(chosenUser);
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});

export const UserProfile = () => {
  const posts = getPosts();
  const userProfile = getDisplayUserProfile();
  const user = getUsers().find((user) => {
    return user.id === userProfile;
  });
  return `
        <h2>${user.name}</h2>
        <div class='profilePic'>
            <img src=${user.profilePicUrl}>
        </div>
        <div id="newMessageForm">${MessageForm()}</div>
         ${FollowButton()}
        <div class='userFollowersDiv'>
            <h3>${user.name}'s Followers</h3>
            ${Followers()}
        </div>
        <div class='userFollowing'>
        <h3>${user.name} is Following:</h3>
            ${Following()}
        </div>
        <div class='userPosts'>
        <h3>${user.name}'s Posts</h3>
        <hr class="lineBreak"></hr>
            ${posts
              .map((post) => {
                return listPosts(post);
              })
              .join("")}
        </div>
    `;
};

const Followers = () => {
  const follows = getFollows();
  const userProfile = getDisplayUserProfile();
  const users = getUsers();
  return `
    <select class='followersList'>
        ${follows
          .map((follow) => {
            if (follow.followingId === userProfile) {
              const foundUser = users.find((user) => {
                return follow.userId === user.id;
              });
              return `<option>${foundUser.name}</option>`;
            }
          })
          .join("")}
    </select>
    `;
};
const Following = () => {
  const follows = getFollows();
  const userProfile = getDisplayUserProfile();
  const users = getUsers();
  return `
    <select class='followersList'>
        ${follows
          .map((follow) => {
            if (follow.followingId === userProfile) {
              const foundUser = users.find((user) => {
                return follow.userId === user.id;
              });
              return `<option>${foundUser.name}</option>`;
            }
          })
          .join("")}
    </select>
    `;
};
