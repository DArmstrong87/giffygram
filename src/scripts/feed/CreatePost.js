import {
  createNewPost,
  getCurrentUser,
  getNewPostForm,
  setDisplayNewPostForm,
} from "../data/provider.js";

const applicationElement = document.querySelector(".giffygram");
document.addEventListener("click", (click) => {
  if (click.target.id === "miniMode") {
    setDisplayNewPostForm(true);
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});
document.addEventListener("click", (click) => {
  if (click.target.name === "cancel-new-post") {
    setDisplayNewPostForm(false);
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});
document.addEventListener("click", (click) => {
  if (click.target.name === "upload-post") {
    const currentUser = getCurrentUser();
    const userTitle = document.querySelector("input[name='post-title']").value;
    const userUrl = document.querySelector(
      "input[name='post-image-url']"
    ).value;
    const userDescription = document.querySelector(
      "textarea[name='post-description']"
    ).value;

    const dataToAPI = {
      userId: currentUser,
      title: userTitle,
      imageUrl: userUrl,
      description: userDescription,
      timestamp: Date.now(),
    };
    if (
      dataToAPI.title === "" ||
      dataToAPI.imageUrl === "" ||
      dataToAPI.description === ""
    ) {
      window.alert("Please fill in all fields");
    } else {
      createNewPost(dataToAPI);
      setDisplayNewPostForm(false);
    }
    const posts = getPosts();
  }
});

export const newPost = () => {
  const newPostForm = getNewPostForm();
  if (newPostForm === false) {
    return `<section id="newPostContainer" >
        <div class="miniMode" id="miniMode">
    Have a gif to post?
        </div>
    </section>
    `;
  } else {
    return `
  <section class="newPost">
      <input class="newPost__input" type="text" name="post-title" placeholder="Title"></input><br>
      <input class="newPost__input" type="text" name="post-image-url" placeholder="Image URL"></input>
      <textarea class="newPost__description" name="post-description" placeholder="Tell us a story..."></textarea>
      <div class="newPost__upload">
      <button name="upload-post">Upload Post</button>
      <button name="cancel-new-post">Cancel</button>
      </div>
  </section>
  `;
  }
};
