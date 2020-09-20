(() => {
  const resourcesBtn = document.getElementById("resources");
  const secResourcesBtn = document.getElementById("secret-resources");
  const loginBtn = document.getElementById("login");
  const logoutBtn = document.getElementById("logout");
  const msgH1 = document.getElementById("msg");
  const usersBtn = document.getElementById("users");
  const resourceMsgElement = document.getElementById("resource-msg");
  const usersList = document.querySelector(".users");
  const usernameInput = document.getElementById("username-input");
  const passwordInput = document.getElementById("password-input");
  const form = document.getElementById("form");

  let ACCESS_TOKEN = null;

  const setToStorage = (key, value) => {
    window.localStorage.setItem(key, value);
  };
  const getFromStorage = (key) => {
    let keyValue = window.localStorage.getItem(key);
    return keyValue;
  };

  const handleData = async (endPoint, config = {}) => {
    const res = await fetch("http://localhost:4000" + endPoint, config);
    const data = await res.json();
    console.log(data);
    return data;
  };

  resourcesBtn.addEventListener("click", async () => {
    let resourceMsg = await handleData("/api/resources");
    resourceMsgElement.innerText = resourceMsg.msg;
  });

  secResourcesBtn.addEventListener("click", async () => {
    ACCESS_TOKEN = getFromStorage("token");
    if (!ACCESS_TOKEN) {
      msgH1.innerText = "You have no access for this route";
      setTimeout(() => {
        msgH1.innerText = "";
      }, 3000);
      return;
    }
    let headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    };
    const config = {
      method: "GET",
      headers,
    };
    let resourceMsg = await handleData("/api/resources/secret", config);
    msgH1.innerText = resourceMsg.msg;
  });

  form.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!usernameInput.value && !passwordInput.value) {
      msgH1.innerText = "please fill in the input values";
      setTimeout(() => {
        msgH1.innerText = "";
      }, 3000);
      return;
    }

    const config = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        id: 3,
        username: usernameInput.value,
        password: passwordInput.value,
      }),
    };

    const res = await handleData("/api/auth/login", config);

    usernameInput.value = "";
    passwordInput.value = "";

    const token = res.jwt_token;
    setToStorage("token", token);
    ACCESS_TOKEN = token;
  });

  logoutBtn.addEventListener("click", async () => {});

  usersBtn.addEventListener("click", async () => {
    const users = await handleData("");
    usersList.innerHTML = users
      .map(
        (user) =>
          `
      <li class="collection-item">
        id:${user.id} , username:${user.username}
      </li>
      `,
      )
      .join("");
  });
})();
