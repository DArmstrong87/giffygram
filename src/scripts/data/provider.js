import { listPosts } from "../feed/PostFeed.js";
const API = "http://localhost:8088";
const applicationElement = document.querySelector(".giffygram");

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
    displayMessages: false,
    displayCreateUser: false,
    displayMessageForm: false,
    selectedYear: 0,
    displayNewPostForm: false,
  },
};

// Fetchers
export const fetchUsers = () => {
  return fetch(`${API}/users`)
    .then((response) => response.json())
    .then((user) => {
      applicationState.users = user;
    });
};

export const fetchPosts = () => {
  return fetch(`${API}/posts`)
    .then((response) => response.json())
    .then((post) => {
      applicationState.posts = post;
    });
};

export const fetchLikes = () => {
  return fetch(`${API}/likes`)
    .then((response) => response.json())
    .then((like) => {
      applicationState.likes = like;
    });
};

export const fetchMessages = () => {
  return fetch(`${API}/messages?_sort=read&_order=asc`)
    .then((response) => response.json())
    .then((message) => {
      applicationState.messages = message;
      console.log(applicationState.messages)
    });
};

export const fetchFollows = () => {
  return fetch(`${API}/posts`)
    .then((response) => response.json())
    .then((follow) => {
      applicationState.follows = follow;
    });
};

// Getters
export const getUsers = () => {
  return applicationState.users.map((user) => ({ ...user }));
};
export const getPosts = () => {
  return applicationState.posts.map((post) => ({ ...post }));
};
//super long getpost method that checks the state of the application and returns the array of filtered post
export const getPostsState = () => {
  const posts = applicationState.posts.map((user) => ({ ...user }))
  
  const selectedUser = applicationState.feed.chosenUser
  const selectedYear = applicationState.feed.selectedYear;
  const likes = applicationState.likes.map((user) => ({ ...user }))
  const currentUser = (applicationState.currentUser)
  let html = ""
  //if display favorites is true then filters the post to make it display only liked post
  if (applicationState.feed.displayFavorites) {
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
    
    const users = applicationState.users.map((user) => ({ ...user }))
    const foundUser = users.find((user)=> user.id === selectedUser)
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
//End of super long get post function
export const getLikes = () => {
  return applicationState.likes.map((like) => ({ ...like }));
};
export const getMessages = () => {
  return applicationState.messages.map((message) => ({ ...message }));
};
export const getFollows = () => {
  return applicationState.follows.map((follow) => ({ ...follow }));
};
export const getFeed = () => {
  return applicationState.feed.map((feed) => ({ ...feed }));
};
export const getCurrentUser = () => {
  return applicationState.currentUser;
};
export const getLoginState = () => {
  return applicationState.feed.displayCreateUser;
};
export const getDisplayMessageForm = () => {
  return applicationState.feed.displayMessageForm;
};
export const getMessageState = () => {
  return applicationState.feed.displayMessages;
};
export const getSelectedYear = () => {
  return applicationState.feed.selectedYear;
};
export const getSelectedUser = () => {
  return applicationState.feed.chosenUser;
};
export const getDisplayFavorites = () => {
  return applicationState.feed.displayFavorites;
};
export const getNewPostForm = () => {
  return applicationState.feed.displayNewPostForm;
};
//SETTERS
export const setDisplayCreateUser = (boolean) => {
  return (applicationState.feed.displayCreateUser = boolean);
};
export const setDisplayMessages = (boolean) => {
  return (applicationState.feed.displayMessages = boolean);
};
export const setCurrentUser = (item) => {
  return (applicationState.currentUser = item);
};
export const setRecipientUser = (item) => {
  return (applicationState.users.id = item);
};
export const setDisplayMessageForm = (boolean) => {
  return (applicationState.feed.displayMessageForm = boolean);
};
export const setYear = (year) => {
  return (applicationState.feed.selectedYear = year);
};
export const setDisplayFavorites = (boolean) => {
  return (applicationState.feed.displayFavorites = boolean);
};
export const setFilterChosenUser = (value) => {
  return (applicationState.feed.chosenUser = value);
};
export const setDisplayNewPostForm = (boolean) => {
  return (applicationState.feed.displayNewPostForm = boolean);
};
// POST FUNCTIONS

export const postCreatedUser = (object) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  };
  return fetch(`${API}/users`, fetchOptions)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("gg_user", data.id);
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    });
};
export const createNewPost = (object) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  };
  return fetch(`${API}/posts`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    });
};
export const createDirectMessage = (object) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  };
  return fetch(`${API}/messages`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    });
};
export const createLike = (object) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  };

  return fetch(`${API}/likes`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

// Delete Functions
export const deletePost = (id) => {
  return fetch(`${API}/posts/${id}`, { method: "DELETE" }).then(() => {
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  });
};
export const deleteLike = (id) => {
  return fetch(`${API}/likes/${id}`, { method: "DELETE" }).then(() => {
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  });
};

//PATCH
export const UpdateMessageRead = (object, id) => {
  const fetchOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  };
  return fetch(`${API}/messages/${id}`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    });
};
