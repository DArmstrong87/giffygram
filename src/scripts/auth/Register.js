import {
  getUsers,
  postCreatedUser,
  setDisplayCreateUser,
} from "../data/provider.js";
const applicationElement = document.querySelector(".giffygram");
export const RegisterUser = () => {
  return `
    <div class="registerForm">
        <form>
            <fieldset>
                <label for="createEmail">Enter Email:</label>
                <input type="text" name="createEmail" autofocus placeholder="Email address" />
            </fieldset>
            <fieldset>
                <label for="createUserName">Create UserName:</label>
                <input type="text" name="createUserName" placeholder="User Name" />
            </fieldset>
            <fieldset>
                <label for="createPassword">Password:</label>
                <input type="password" name="createPassword" placeholder="Password" />
            </fieldset>
        </form>
        <button id="createUser">Create</button>
        <button id="cancelCreateUser">Cancel</button>
    </div>
`;
};
applicationElement.addEventListener("click", (event) => {
  const users = getUsers();

  if (event.target.id === "createUser") {
    const createdUser = {
      email: applicationElement.querySelector("input[name='createEmail']")
        .value,
      name: applicationElement.querySelector("input[name='createUserName']")
        .value,
      password: applicationElement.querySelector("input[name='createPassword']")
        .value,
    };
    const checkedUser = users.some((user) => {
      return user.email === createdUser.email && user.name === createdUser.name;
    });
    if (checkedUser) {
      window.alert("User Email/Username Combintation Already Exist");
    } else {
      window.alert("Account Created!!! Let's Get Giffy With It!");
      postCreatedUser(createdUser);
    }
  } else if (event.target.id === "cancelCreateUser") {
    setDisplayCreateUser(false);
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});
