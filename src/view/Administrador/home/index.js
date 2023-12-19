const urlBase = "http://localhost:3000"
const token = localStorage.getItem("token")

document.addEventListener("DOMContentLoaded", async function (){
    await showGatosParaAdotar()
})

async function listarGatosParaAdocao(){
  try {
    const respostaApi = await fetch(`${urlBase}/gatos`, {
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

  gatosContainer.innerHTML= ""

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
            <div class="d-flex justify-content-around mt-4">
              <div class="botoes bg-success" data-bs-toggle="modal" data-bs-target="#modalEdicao" onclick="preenherFormsDeEdicao('${gato.id}')"><i class="bi bi-pencil-fill icones"></i></div>
              <div class="botoes bg-danger" data-bs-toggle="modal" data-bs-target="#modalExclusao" onclick="excluirGato('${gato.id}')"><i class="bi bi-trash icones"></i></div>
            </div>
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
async function getGatoPorId(id){
  try {
    const respostaApi = await fetch(`${urlBase}/buscarGatoPorId/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })

    const gato = await respostaApi.json()

    if(respostaApi.ok){
      return gato
    }else{
      mostrarAlerta(gato.message, "erro")
    }
  } catch (error) {
    mostrarAlerta(error.message, "erro")
  }
}
let idDoGatoParaEditar;

async function preenherFormsDeEdicao(id){
  idDoGatoParaEditar = id
  const gato = await getGatoPorId(id)

  const nome = document.querySelector("input#nome")
  const cor = document.querySelector("input#cor")
  const raca = document.querySelector("input#raca")
  const descricao = document.querySelector("input#descricao")

  nome.value = gato.nome
  cor.value = gato.cor
  raca.value = gato.raca
  descricao.value = gato.descricao
}
async function editar(){
  const nome = document.querySelector("input#nome").value
  const cor = document.querySelector("input#cor").value
  const raca = document.querySelector("input#raca").value
  const descricao = document.querySelector("input#descricao").value
  const sexo = document.querySelector("input#sexo")

  try {
    const respostaApi = await fetch(`${urlBase}/editarGato/`,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({nome, cor, raca, descricao, sexo, id})
    })

    const retorno = await respostaApi.json()

    if(respostaApi.ok){
      mostrarAlerta(retorno.message, "sucesso")
      await showGatosParaAdotar()
    }else{
      mostrarAlerta(retorno.message, "erro")
    }
  } catch (error) {
    mostrarAlerta(error.message, "erro")
  }
}
async function excluirGato(id){
  try {
    const respostaApi = await fetch(`${urlBase}/deletarGato/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })

    const mensagemApi = await respostaApi.json()

    if(!respostaApi.ok){
      mostrarAlerta(mensagemApi.message, "alerta")
    }else{
      await showGatosParaAdotar()
      mostrarAlerta(mensagemApi.message, "sucesso")
    }
  } catch (error) {
    mostrarAlerta(error.message, "erro")
  }
}
async function logout(){
  localStorage.clear()
  window.location.href = '../../../../login.html';
}