document.addEventListener('DOMContentLoaded', async function () {
    await carregarCard()
});
async function carregarCard(){
    const token = localStorage.getItem('token')
    const email = (JSON.parse(atob(token.split(".")[1]))).email
    try{
        const resp = await fetch(`http://localhost:3000/minhasAdocoes/${email}`, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }    
        })
        const gatos = await resp.json()

        const main = document.querySelector("main")
        if(gatos.length > 0){
            gatos.forEach(gato => {
                main.innerHTML+= `
                <div class="card mr-4" style="width: 18rem; height: 300px">
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
                                <strong>Descrição:</strong><br>
                                <p>${gato.descricao}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                `
            });
        }else{
            main.innerHTML = "<h1>Você não adotou nenhum gato</h1>"
        }
    }catch(error){
        mostrarAlerta(error.mensagem, "erro")
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