document.addEventListener("DOMContentLoaded", async function (){
    await mostrarSolicitacoes()
})

const token = localStorage.getItem("token")
console.log(token)

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
async function getSolicitacoes(){
    try {
        const retorno = await fetch("http://localhost:3000/solicitacoes", {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(retorno.ok){
            const solicitacoes = await retorno.json()
            return solicitacoes
        }else{
            const mensagem = await retorno.json()
            mostrarAlerta(mensagem.message, "erro")
        }
    } catch (error) {
        mostrarAlerta(error.message, "erro")
    }
}
async function getDono(email){
    try {
        const retorno = await fetch(`http://localhost:3000/getUserPorEmail/${email}`, {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
        if(retorno.ok){
            const dono = await retorno.json()
            return dono.nome
        }else{
            const erro = await retorno.json()
            mostrarAlerta(erro.message, "erro")
        }
        
    } catch (error) {
        mostrarAlerta(error.message, "erro")
    }
}
async function mostrarSolicitacoes(){
    try {
        const solicitacoes = await getSolicitacoes()
        const main = document.querySelector("main")
        main.innerHTML = ""

        for(let solicitacao of solicitacoes){
            const dono = await getDono(solicitacao.usuario_solicitante)
            main.innerHTML += `
            <div class="card m-3" style="width: 18rem;">
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
                            <strong>Descrição:</strong>
                            <p>${solicitacao.gato_descricao}</p>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Solicitado por:
                            <span class="badge bg-primary rounded-pill">${dono}</span>
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