document.addEventListener("DOMContentLoaded", async function (){
    await gerarCardsGatosAdotados()
})

const token = localStorage.getItem("token")

async function gerarCardsGatosAdotados(){
    const main = document.querySelector("main")
    main.innerHTML = ""
    try {
        const gatosAdotados = await getGatosAdotados()
        for(let adocao of gatosAdotados){
            main.innerHTML += `
            <div class="card m-3" style="width: 18rem;">
                <div class="card-body  d-flex flex-column">
                    <h5 class="card-title">${adocao.gato.nome}</h5>
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                        Sexo
                            <span class="badge bg-primary rounded-pill">${adocao.gato.sexo}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                        Raça
                            <span class="badge bg-primary rounded-pill">${adocao.gato.raca}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                        Cor
                            <span class="badge bg-primary rounded-pill">${adocao.gato.cor}</span>
                        </li>
                        <li class="list-group-item d-flex flex-column justify-content-between align-items-center">
                            <strong>Descrição:</strong>
                            <p>${adocao.gato.descricao}</p>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Adotado por:
                            <span class="badge bg-primary rounded-pill">${adocao.dono}</span>
                        </li>
                    </ul>
                </div>
            </div>
            `
        }
    } catch (error) {
        mostrarAlerta(error.message, "erro")
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
async function getGatosAdotados(){
    console.log(token)
    const retornoGatosAdotados = await fetch("http://localhost:3000/adocoes", {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
    })
    if(!retornoGatosAdotados.ok){
        const mensagem = await retornoGatosAdotados.json()
        mostrarAlerta(mensagem.message, "erro")
    }else{
        return await retornoGatosAdotados.json()
    }
}