import { createNewPost, getCurrentUser, getPosts } from "../data/provider.js"

document.addEventListener("click",
    click => {
        if (click.target.id === 'miniMode') {
            const container = document.getElementById('newPostContainer')
            container.innerHTML = ''
            container.innerHTML = newPostForm()
        }
    }
)
document.addEventListener("click",
    click => {
        if (click.target.name === 'cancel-new-post') {
            const container = document.getElementById('newPostContainer')
            container.innerHTML = `
            <div class="miniMode" id="miniMode">
            Have a gif to post?
            </div>
            `
        }
    }
)
document.addEventListener("click",
    click => {
        if (click.target.name === 'upload-post') {
            const currentUser = getCurrentUser()
            const userTitle = document.querySelector("input[name='post-title']").value
            const userUrl = document.querySelector("input[name='post-image-url']").value
            const userDescription = document.querySelector("textarea[name='post-description']").value

            const dataToAPI = {
                userId: currentUser,
                title: userTitle,
                imageUrl: userUrl,
                description: userDescription,
                timestamp: Date.now()
            }
            if (dataToAPI.title === '' || dataToAPI.imageUrl === '' || dataToAPI.description === ''){
                window.alert('Please fill in all fields')
            } else {
                createNewPost(dataToAPI)
            }
            const posts = getPosts()
            console.log(posts)
        }
    }
)

export const newPost = () => {
    return `<section id="newPostContainer">
        <div class="miniMode" id="miniMode">
    Have a gif to post?
        </div>
    </section>
    `
}

export const newPostForm = () => {
    return `
    <section class="newPost">
        <input class="newPost__input" type="text" name="post-title" placeholder="Title"></input><br>
        <input class="newPost__input" type="text" name="post-image-url" placeholder="Image URL"></input>
        <textarea class="newPost__description" name="post-description" placeholder="Tell us a story..."></textarea>
        <button name="upload-post">Upload Post</button>
        <button name="cancel-new-post">Cancel</button>
    </section>
    `
}