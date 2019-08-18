loadPage = () => {
  viewLogin();
};

validation = (email, password) => {
  let validation = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/;
  if (email === "" || password === "") {
    addErrorNotification("E-Mail or password is not entered");
    return false;
  } else if (!validation.test(email)) {
    addErrorNotification("E-Mail doesn't match format");
    return false;
  } else {
    return true;
  }
};

mercdevRequest = () => {
  let email = document.getElementsByClassName("email-text")[0].value;
  let password = document.getElementsByClassName("password-text")[0].value;

  if (!validation(email, password)) {
    return null;
  } else {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch("https://us-central1-mercdev-academy.cloudfunctions.net/login", {
      method: "POST",
      headers: myHeaders,
      mode: "cors",
      cache: "force-cache",
      body: JSON.stringify({
        email: email,
        password: password,
        credentials: "include"
      })
    }).then(function(response) {
      if (!response.ok) {
        addErrorNotification("E-Mail or password is incorrect");
      } else {
        response.json().then(function(data) {
          viewLogout(data);
        });
      }
    });
  }
};

viewLogin = () => {
  let html = `<div class="form-name">Log In</div>`;
  html += `<div class="email">`;
  html += `<input class="email-text"                      
                            type="email"
                            placeholder="E-Mail"
                            pattern="([a-z0-9_-]+@[a-z0-9-]+\\.[a-z]{2,6})"
                            required 
                            autofocus/>`;
  html += `</div>`;
  html += `<div class="password">`;
  html += `<input class="password-text"
                            type="password"
                            placeholder="Password" />`;
  html += `</div>`;
  html += `<div class="button">`;
  html += `<input type="button" class="Text" value="Login" onclick=mercdevRequest() />`;
  html += `</div>`;

  let form = document.getElementsByClassName("form");
  form[0].className = "form";
  form[0].innerHTML = html;
};

viewLogout = data => {
  let form = document.getElementsByClassName("form");
  let image = data["photoUrl"];
  let username = data["name"];
  let html = `<img class="avatar" src=${image} alt=${username}>`;
  html += `<div class="username">${username}</div>`;
  html += `<div class="button button--logout">`;
  html += `<input type="button" class="Text" value="Logout" onclick=viewLogin() />`;
  html += `</div>`;
  form[0].innerHTML = html;
  form[0].className += " form--logout";
};

addErrorNotification = textError => {
  changeEmailText();
  changePasswordText();
  if (document.getElementsByClassName("error").length === 1) {
    let error = document.getElementsByClassName("error");
    error[0].innerHTML = `<p>${textError}</p>`;
  } else {
    let button = document.getElementsByClassName("button");
    let form = document.getElementsByClassName("form");
    let error = document.createElement("div");
    error.className = "error";
    error.innerHTML = `<p>${textError}</p>`;

    form[0].insertBefore(error, button[0]);
    form[0].className += " form--error";
  }
};

changeEmailText = () => {
  let emailText = document.getElementsByClassName("email-text");
  if (emailText[0].value === "") {
    emailText[0].className = "email-text";
  } else {
    emailText[0].className = "email-text";
    emailText[0].className += " email-text--error";
    console.log(emailText);
  }
};

changePasswordText = () => {
  let password = document.getElementsByClassName("password-text");
  password[0].value = "";
};
