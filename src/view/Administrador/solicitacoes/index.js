document.addEventListener("DOMContentLoaded", async function (){
    await mostrarSolicitacoes()
})

const token = localStorage.getItem("token")

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
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
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
    mostrarTelaDeLoading()
    try {
        const solicitacoes = await getSolicitacoes()
        const main = document.querySelector("main")
        main.innerHTML = ""

        if(solicitacoes.length === 0){
            main.innerHTML = "<h2>Nenhum usuário fez solicitações de gatos para adoção</h2>"
        }else{
            for(let solicitacao of solicitacoes){
                const dono = await getDono(solicitacao.usuario_solicitante)
                if(solicitacao.solicitacao_rejeitada == false && solicitacao.solicitacao_aceita == false){
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
                                <div class="d-flex justify-content-around mt-4">
                                    <div class="botoes bg-success" data-bs-toggle="modal" data-bs-target="#modalEdicao" onclick="aceitarSolicitacao('${solicitacao.id}')"><i class="bi bi-check-lg"></i></div>
                                    <div class="botoes bg-danger" data-bs-toggle="modal" data-bs-target="#modalExclusao" onclick="negarSolicitacao('${solicitacao.id}')"><i class="bi bi-x-lg"></i></div>
                                </div>
                            </ul>
                        </div>
                    </div>
                    `
                }
            }
        }
        if(main.innerHTML === ""){
            main.innerHTML = "<h2>Nenhum usuário fez solicitações de gatos para adoção</h2>"
        }
    } catch (error) {
        fecharTelaDeLoading()
        mostrarAlerta(error.message, "erro")
    }
    fecharTelaDeLoading()
}
async function aceitarSolicitacao(id){
    try {
        const retornoApi = await fetch(`http://localhost:3000/aceitarSolicitacao/${id}`, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const mensagem = await retornoApi.json()

        if(retornoApi.ok){
            mostrarAlerta(mensagem.message, "sucesso")
            await mostrarSolicitacoes()
        }else{
            mostrarAlerta(mensagem.message, "erro")
        }
    } catch (error) {
        mostrarAlerta(error.message, "erro")
    }
}
async function negarSolicitacao(id){
    try {
        const retornoApi = await fetch(`http://localhost:3000/negarSolicitacao/${id}`, {
            method: "PUT",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const mensagem = await retornoApi.json()

        if(retornoApi.ok){
            mostrarAlerta(mensagem.message, "sucesso")
            mostrarSolicitacoes()
        }else{
            mostrarAlerta(mensagem.message, "erro")
        }
    } catch (error) {
        mostrarAlerta(error.message, "erro")
    }
}
function mostrarTelaDeLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.style.display = 'flex';
}
function fecharTelaDeLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.style.display = 'none';
}