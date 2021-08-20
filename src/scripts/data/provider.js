const API = "http://localhost:8088"
const applicationElement = document.querySelector(".giffygram")

const applicationState = {
    users: [],
    posts: [],
    likes: [],
    messages: [],
    follows: [],
    currentUser: {},
    feed: {
        chosenUser: null,
        displayFavorites: false,
        displayMessages: false
    }
}

// Fetchers
export const fetchUsers = () => {
    return fetch(`${API}/users`)
        .then(response => response.json())
        .then(
            (user) => {
                applicationState.users = user
            }
        )
}

export const fetchPosts = () => {
    return fetch(`${API}/posts`)
        .then(response => response.json())
        .then(
            (post) => {
                applicationState.posts = post
                console.log(applicationState)
            }
        )
}

export const fetchLikes = () => {
    return fetch(`${API}/likes`)
        .then(response => response.json())
        .then(
            (like) => {
                applicationState.likes = like
            }
        )
}

export const fetchMessages = () => {
    return fetch(`${API}/posts`)
        .then(response => response.json())
        .then(
            (message) => {
                applicationState.messages = message
            }
        )
}

export const fetchFollows = () => {
    return fetch(`${API}/posts`)
        .then(response => response.json())
        .then(
            (follow) => {
                applicationState.follows = follow
            }
        )
}

// Getters
export const getUsers = () => {
    return applicationState.users.map(user => ({ ...user }))
}
export const getPosts = () => {
    return applicationState.posts.map(post => ({ ...post }))
}
export const getLikes = () => {
    return applicationState.likes.map(like => ({ ...like }))
}
export const getMessages = () => {
    return applicationState.messages.map(message => ({ ...message }))
}
export const getFollows = () => {
    return applicationState.follows.map(follow => ({ ...follow }))
}
export const getCurrentUser = () => {
    return applicationState.currentUser.map(user => ({ ...user }))
}
export const getFeed = () => {
    return applicationState.feed.map(feed => ({ ...feed }))
}