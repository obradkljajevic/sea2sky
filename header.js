fetch("header.html")
    .then(res=>res.text())
    .then(data=>{
        document.getElementById("header-placeholder").innerHTML=data;
        document.getElementById("login").onclick = () => {
          window.location.href = "signin.html";
        };

        document.getElementById("register").onclick = () => {
          window.location.href = "signup.html";
        };
    });