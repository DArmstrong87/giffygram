

export const UserProfile = () => {
    return `
        <h2>Interpolate Selected User Name</h2>
        <div class='ProfilePic'>
            Add profile pic here.
        </div>
        <div class='followUserButton'><button name="follow--$user.id">Follow</button></div>
        <div class='userFollowers'>
            List the user's followers here.
        </div>
        <div class='userFollowing'>
            List who the user is following here.
        </div>
        <div class='userPosts'>
            List all of this user's posts
        </div>
    `
}