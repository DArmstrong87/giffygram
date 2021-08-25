import {
  setDisplayUserProfile,
  createFollow,
  deleteFollow,
  getFollows,
  getCurrentUser,
  getDisplayUserProfile,
} from "../data/provider.js";
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
