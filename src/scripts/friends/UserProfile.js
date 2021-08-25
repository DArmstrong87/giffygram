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
    createFollow(chosenProfileId);
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
    (follow) => currentUser === follow.foundUserId
  );
  const findFollows = filteredFollows.find(
    (follow) => follow.followingId === userProfile
  );
  if (findFollows !== undefined) {
    return `
                <div class='UnfollowUserButton'><button id="unfollow--${userProfile}">Unfollow</button></div>
                `;
  } else {
    return `
                <div class='followUserButton'><button id="follow--${userProfile}">Follow</button></div>
                `;
  }
};

export const UserProfile = () => {
  return `
                <h2>Interpolate Selected User Name</h2>
                <div class='ProfilePic'>
                    Add profile pic here.
                </div>
                ${FollowButton()}
                <div class='userFollowers'>
                    List the user's followers here.
                </div>
                <div class='userFollowing'>
                    List who the user is following here.
                </div>
                <div class='userPosts'>
                    List all of this user's posts
                </div>
            `;
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
        <div class='followUserButton'><button name="follow--$user.id">Follow</button></div>
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
