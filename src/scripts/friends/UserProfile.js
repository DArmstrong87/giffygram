import { setDisplayUserProfile } from "../data/provider.js";
document.addEventListener("click", (click) => {
  if (click.target.id.startsWith("user")) {
    const [, foundUserId] = click.target.id.split("--");
    const chosenUser = parseInt(foundUserId);
    setDisplayUserProfile(chosenUser);
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});
