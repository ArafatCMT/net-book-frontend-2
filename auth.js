const handleRegistration = (event) => {
  event.preventDefault();

  const form = document.getElementById("registration-form");
  const formData = new FormData(form);

  const RegistrationData = {
    username: formData.get("username"),
    first_name: formData.get("first_name"),
    email: formData.get("email"),
    last_name: formData.get("last_name"),
    password: formData.get("password1"),
    confirm_password: formData.get("password2"),
  };

  // password check
  // console.log(RegistrationData.password, RegistrationData.confirm_password)
  if (RegistrationData.password === RegistrationData.confirm_password) {
    document.getElementById("error").innerText = "";

    if (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        RegistrationData.password
      )
    ) {
      fetch("https://net-book.vercel.app/accounts/register/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(RegistrationData),
      })
        .then((res) => res.json())
        .then((data) => {
          window.location.href = "./login.html";
        });
    } else {
      document.getElementById("error").innerText =
        "password must Minimum eight characters, at least one uppercase letter, one lowercase letter and one number";
    }
  } else {
    document.getElementById("error").innerText =
      "password and confirm password dosen't match";
  }
};

const handleLogin = (event) => {
  event.preventDefault();

  const form = document.getElementById("login-form");
  const formData = new FormData(form);

  const loginData = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  console.log(loginData);
  fetch("https://net-book.vercel.app/accounts/login/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(loginData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token && data.account_id) {
        // console.log(data.token, data.user_id);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("accountId", data.account_id);
        window.location.href = "./home.html";
      } else {
        document.getElementById("error").innerText =
      "invalid username & password";
        // window.location.href = "./login.html";
        // throw new Error("Invalid login response");
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

const handleLogout = () => {
  const token = localStorage.getItem("authToken");
  console.log(token);

  fetch("https://net-book.vercel.app/accounts/logout/", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${token}`,
    },
  }).then((res) => {
    // console.log('hello')
    localStorage.removeItem("authToken");
    localStorage.removeItem("accountId");
    window.location.href = "./login.html";
  });
};
