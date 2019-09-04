viewLogin = () => {
  let main = document.getElementsByClassName("main"),
    form = document.getElementsByClassName("form")[0],
    login = document.getElementsByClassName("login")[0],
    clone = document.importNode(login.content, true);
  if (document.getElementsByClassName("form").length === 0) {
    main[0].appendChild(clone);
  } else {
    main[0].removeChild(form);
    main[0].appendChild(clone);
  }
};

viewLogout = (image, username) => {
  let main = document.getElementsByClassName("main"),
    form = document.getElementsByClassName("form")[0],
    logout = document.getElementsByClassName("logout")[0],
    clone = document.importNode(logout.content, true),
    nameUser = document.getElementsByClassName("form__username"),
    avatarUser = document.getElementsByClassName("form__user-avatar");
  main[0].removeChild(form);
  main[0].appendChild(clone);

  nameUser[0].textContent = username;
  avatarUser[0].alt = username;
  avatarUser[0].src = image;
};

isValid = () => {
  let email = document.getElementById("email").value,
    password = document.getElementById("password").value,
    validation = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/;
  if (email === "" || password === "") {
    addErrorNotification("E-Mail or password is not entered");
  } else if (!validation.test(email)) {
    addErrorNotification("E-Mail doesn't match format");
    onChangeEmailInput(email);
    onChangePasswordInput(password);
  } else {
    requestUser(email, password);
  }
};

requestUser = (email, password) => {
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
      onChangeEmailInput(email);
      onChangePasswordInput(password);
    } else {
      response.json().then(function(data) {
        let image = data["photoUrl"];
        let username = data["name"];
        viewLogout(image, username);
      });
    }
  });
};

addErrorNotification = textError => {
  let errorText = document.getElementsByClassName("form__error");
  if (document.getElementsByClassName(errorText).length === 1) {
    errorText[0].textContent = textError;
  } else {
    let form = document.getElementsByClassName("form"),
      button = document.getElementsByClassName("form__button"),
      error = document.getElementsByClassName("errorNotification")[0],
      clone = document.importNode(error.content, true);
    form[0].insertBefore(clone, button[0]);
    document.getElementsByClassName("form__error")[0].textContent = textError;
    console.log(error.getElementsByTagName("p"));
    form[0].className += " form_error";
  }
};

onChangeEmailInput = () => {
  let emailClassName = "form__input",
    emailErrorClassName = " form__input_email_error",
    emailText = document.getElementById("email");
  if (emailText.value === "") {
    emailText.className = emailClassName;
  } else {
    emailText.className += emailErrorClassName;
  }
};

onChangePasswordInput = () => {
  let password = document.getElementById("password");
  password.value = "";
};
