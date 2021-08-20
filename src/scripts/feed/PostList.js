


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
            const container = document.getElementById('newPostContainer')
            container.innerHTML = `
            <div class="miniMode" id="miniMode">
            Have a gif to post?
            </div>
            `
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
        <input class="newPost__input" type="text" name="url" placeholder="URL"></input>
        <textarea class="newPost__description" name="description" placeholder="Tell us a story..."></textarea>
        <button name="upload-post">Upload Post</button>
        <button name="cancel-new-post">Cancel</button>
    </section>
    `
}