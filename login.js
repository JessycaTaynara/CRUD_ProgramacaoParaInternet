async function login() {
  localStorage.clear();
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const data = {
    email: email,
    senha: senha,
  };

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const tokenData = await response.json();

    if (tokenData.token) {
      // Login bem-sucedido
      localStorage.clear();
      localStorage.setItem("token", tokenData.token);
      const payload = JSON.parse(atob(decodeURIComponent(token.split(".")[1])));
      if(payload.tipo === "adm"){
        window.location.assign("./src/Administrador/home/index.html");
      }else if(payload.tipo === "comum"){
        window.location.assign("./src/UsuárioComum/home/index.html");
      }
    } else {
      // Falha no login
      alert("Acesso negado | " + tokenData.mensagem);
    }
  } catch (error) {
    console.error("Erro na solicitação:", error);
  }
}

