import { getSelectedYear, setYear, getDisplayFavorites, setDisplayFavorites, setFilterChosenUser, getSelectedUser, getUsers, getPosts } from "../data/provider.js";

document.addEventListener("change", (change) => {
  if (change.target.id === "select-year") {
    const [, year] = change.target.value.split("--");
    setYear(parseInt(year));
    const applicationElement = document.querySelector(".giffygram");
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});
document.addEventListener("change", (change) => {
  if (change.target.id === "select-user") {
    const [, user] = change.target.value.split("--");
    setFilterChosenUser(parseInt(user));
    const applicationElement = document.querySelector(".giffygram");
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});

const SelectYear = () => {
  const posts = getPosts()
  const selectedYear = getSelectedYear();
  const lastFiveYears = [2021, 2020, 2019, 2018, 2017];
  const allYears = []
  for (const post of posts) {
    const newDate = new Date(post.timestamp);
    const fullYear = newDate.getFullYear()
    allYears.push(fullYear)
  }

  const years = [...new Set(allYears)]
  console.log(years)
  
  let html = `<div class='footer__item'><select id="select-year">`;

  if (selectedYear === 0) {
    html += `<option selected value="year--0">All Posts</option>`;
  } else {
    html += `<option value="year--0">All Posts</option>`;
  }


  lastFiveYears.map((year) => {
    if (year === selectedYear) {
      html += `<option selected value="year--${year}">${year}</option>`;
    } else {
      html += `<option value="year--${year}">${year}</option>`;
    }
  });

  html += `</select >
    </div >`;
  return html;
};

const SelectUser = () => {
  const users = getUsers();
  const selectedUser = getSelectedUser();
  let html = `<div><select id="select-user">`;

  if (selectedUser === null) {
    html += `<option>Choose a user...</option>
    ${users
        .map((user) => {
          return `<option value="select--${user.id}">${user.name}</option>`;
        })
        .join("")}
    </select>
    </div>`;
  } else {
    html += `<option>Choose a user...</option>
    ${users
        .map((user) => {
          if (selectedUser === user.id) {
            return `<option selected value="select--${user.id}">${user.name}</option>`;
          } else {
            return `<option value="select--${user.id}">${user.name}</option>`;
          }
        })
        .join("")}
    </select>
    </div>`;
  }
  return html;
};

const applicationElement = document.querySelector(".giffygram");
applicationElement.addEventListener("change", (event) => {
  const displayFavorites = getDisplayFavorites();
  if (event.target.name === "favoritesDisplay") {
    if (displayFavorites) {
      setDisplayFavorites(false);
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    } else {
      setDisplayFavorites(true);
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    }
  }
});
applicationElement.addEventListener("click", (event) => {
  if (event.target.id === "resetfilters") {
    setYear(0);
    setFilterChosenUser(null);
    setDisplayFavorites(false);
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});
export const FooterBar = () => {
  const displayFavorites = getDisplayFavorites();
  let checkbox = "";
  if (displayFavorites) {
    checkbox = `<label for="favoritesDisplay">Favorites</label>
        <input name="favoritesDisplay"type="checkbox" checked/>`;
  } else {
    checkbox = `<label for="favoritesDisplay">Favorites</label>
        <input name="favoritesDisplay"type="checkbox"/>`;
  }

  return `
    <div class='footer__item'>
        ${SelectYear()}
    </div>
    <div class='footer__item'>
        ${SelectUser()}
    </div>
    <div class='footer__item'>
        ${checkbox}
        
    </div>
    <div>
        <button id="resetfilters">Reset</button>
    </div>
`;
};
