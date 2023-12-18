const urlBase = "http://localhost:3000"
const token = localStorage.getItem("token")

document.addEventListener("DOMContentLoaded", async function (){
    await listarGatosParaAdocao()
})

async function listarGatosParaAdocao(){
  try {
    const respostaApi = await fetch("http://localhost:3000/gatos", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
    if(respostaApi.ok){
      const gatos = await respostaApi.json()
      return gatos
    }else{
      const mensagem = await respostaApi.json()
      mostrarAlerta(mensagem.message, "alerta")
    }
  } catch (error) {
    mostrarAlerta(error.message, "erro")
  }
}
async function showGatosParaAdotar(){
  const gatos = await listarGatosParaAdocao()
  const gatosContainer = document.querySelector("main.gatosParaAdotar")

  if(gatos.lenght > 0){
    for(let gato of gatos){
      gatosContainer.innerHTML+= `
        <div class="card" style="width: 18rem;">
          <div class="card-body  d-flex flex-column">
              <h5 class="card-title">${gato.nome}</h5>
              <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                Sexo
                  <span class="badge bg-primary rounded-pill">${gato.sexo}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                Raça
                  <span class="badge bg-primary rounded-pill">${gato.raca}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                Cor
                  <span class="badge bg-primary rounded-pill">${gato.cor}</span>
                </li>
                <li class="list-group-item d-flex flex-column justify-content-between align-items-center">
                    <strong>Descrição:</strong>
                    <p>${gato.descricao}</p>
                </li>
            </ul>
          </div>
        </div>
      `
    }
  }else{
    gatosContainer.innerHTML = "<h1>Nenhum gato para adotar foi cadastrado</h1>"
  }
}
function mostrarAlerta(mensagem, tipo){
    const caixaDeAlerta = document.querySelector("div#caixaDeAlerta")
    const texto = document.querySelector("strong#mensagemDeAlerta")
  
    caixaDeAlerta.classList.remove("d-none")
    caixaDeAlerta.classList.add("d-flex")
  
    caixaDeAlerta.classList.remove("alert-success")
    caixaDeAlerta.classList.remove("alert-danger")
    caixaDeAlerta.classList.remove("alert-warning")
    
    switch(tipo){
      case "erro":
        caixaDeAlerta.classList.add("alert-danger")
        break
      case "alerta":
        caixaDeAlerta.classList.add("alert-warning")
        break
      case "sucesso":
        caixaDeAlerta.classList.add("alert-success")
        break
    }
  
    texto.innerHTML = mensagem
}
async function logout(){
    localStorage.clear()
    window.location.href = '../login.html';
}