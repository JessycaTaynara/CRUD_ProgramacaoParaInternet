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
      window.location.href = "./sistema/index.html";
    } else {
      // Falha no login
      alert("Acesso negado | " + tokenData.message);
    }
  } catch (error) {
    console.error("Erro na solicitação:", error);
  }
}
