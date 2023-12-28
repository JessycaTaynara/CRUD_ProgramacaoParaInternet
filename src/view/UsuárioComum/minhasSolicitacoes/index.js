document.addEventListener("DOMContentLoaded", async function (){
  await mostrarMinhasSolicitacoes()
})
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
function mostrarTelaDeLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.style.display = 'flex';
}
function fecharTelaDeLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.style.display = 'none';
}
async function getMinhasSolicitacoes(){
  const token = localStorage.getItem("token")
  const emailDoUsuario = (JSON.parse(atob(decodeURIComponent(token.split(".")[1])))).email

  try {
      const retornoApi = await fetch(`http://localhost:3000/minhasSolicitacoes/${emailDoUsuario}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }) 

    if(retornoApi.ok){
      const minhasSolicitacoes = await retornoApi.json()
      return minhasSolicitacoes
    }else{
      const mensagemDeErro = await retornoApi.json()
      mostrarAlerta(mensagemDeErro.message, "erro")
    }
  } catch (error) {
    mostrarAlerta(error.message, "erro")
  }
  
}
async function mostrarMinhasSolicitacoes(){
  mostrarTelaDeLoading()
  const container = document.querySelector("div.containerSolicitacoes")
  const solicitacoes = await getMinhasSolicitacoes()

  if(solicitacoes.length === 0){
    container.innerHTML = "<h2>Você Ainda Não Fez nenhuma Solicitação</h2>"
  }else{
    for(let solicitacao of solicitacoes){
      let classe;

      if(solicitacao.solicitacao_rejeitada === true){
        classe = "solicitacaoNegada"
      }else if(solicitacao.solicitacao_aceita === true){
        classe = "solicitacaoAceita"
      }
      else if(solicitacao.solicitacao_rejeitada === false && solicitacao.solicitacao_aceita === false){
        classe = "solicitacaoEmEspera"
      }

      container.innerHTML += `
        <div class="card mb-3 ${classe}" style="width: 18rem;">
          <div class="card-body  d-flex flex-column">
            <h5 class="card-title">${solicitacao.gato_nome}</h5>
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Sexo
                <span class="badge bg-primary rounded-pill">${solicitacao.gato_sexo}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Raça
                <span class="badge bg-primary rounded-pill">${solicitacao.gato_raca}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Cor
                <span class="badge bg-primary rounded-pill">${solicitacao.gato_cor}</span>
              </li>
              <li class="list-group-item d-flex flex-column justify-content-between align-items-center">
                <strong>Descrição:</strong><br>
                <p>${solicitacao.gato_descricao}</p>
              </li>
            </ul>
          </div>
        </div>
      `
    }
  }
  fecharTelaDeLoading()
}