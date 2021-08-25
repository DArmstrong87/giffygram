import { getDisplayUserProfile, getFollows, getPosts, getUsers, setDisplayNewPostForm, setDisplayUserProfile } from "../data/provider.js";
import { listPosts } from "../feed/PostFeed.js";

const applicationElement = document.querySelector(".giffygram")
applicationElement.addEventListener("click", (click) => {
    if (click.target.id.startsWith("user")) {
        // click.preventDefault()
        const [, foundUserId] = click.target.id.split("--");
        const chosenUser = parseInt(foundUserId);
        setDisplayUserProfile(chosenUser)
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    }
});

export const UserProfile = () => {
    const posts = getPosts()
    const userProfile = getDisplayUserProfile()
    const user = getUsers().find(
        user => {
            return user.id === userProfile
        }
    )
    return `
        <h2>${user.name}</h2>
        <div class='profilePic'>
            <img src=${user.profilePicUrl}>
        </div>
        <div class='followUserButton'><button name="follow--$user.id">Follow</button></div>
        <div class='userFollowersDiv'>
            <h3>Bob's Followers</h3>
            ${Followers()}
        </div>
        <div class='userFollowing'>
        <h3>Bob is Following:</h3>
            ${Following()}
        </div>
        <div class='userPosts'>
        <h3>${user.name}'s Posts</h3>
        <hr class="lineBreak"></hr>
            ${posts.map(
        post => {
            return listPosts(post)
        }
    ).join("")}
        </div>
    `
}

const Followers = () => {
    const follows = getFollows()
    const userProfile = getDisplayUserProfile()
    const users = getUsers()
    return `
    <select class='followersList'>
        ${follows.map(
        follow => {
            if (follow.followingId === userProfile) {
                const foundUser = users.find(
                    user => { return follow.userId === user.id }
                )
                return `<option>${foundUser.name}</option>`
            }
        }
    ).join("")}
    </select>
    `
}
const Following = () => {
    const follows = getFollows()
    const userProfile = getDisplayUserProfile()
    const users = getUsers()
    return `
    <select class='followersList'>
        ${follows.map(
        follow => {
            if (follow.followingId === userProfile) {
                const foundUser = users.find(
                    user => { return follow.userId === user.id }
                )
                return `<option>${foundUser.name}</option>`
            }
        }
    ).join("")}
    </select>
    `
}

