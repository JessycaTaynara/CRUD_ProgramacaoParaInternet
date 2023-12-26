const token = localStorage.getItem("token")

document.addEventListener("DOMContentLoaded", async ()=>{
  await exibirGatos();
})

  async function exibirGatos() {
    try{
      var r = await fetch('http://localhost:3000/gatos', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
      const gatos = await r.json();
      const caixa = document.querySelector('div.container');
      caixa.innerHTML="";

      if(gatos.length === 0){
        caixa.innerHTML = "<h1>Não há gatos para adotar, adicione</h1>"
      }else{
        gatos.forEach(gato => {
          if(gato.adotado == false){
            caixa.innerHTML += `
              <div class="card mb-3" style="width: 18rem;">
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
                  <button type="button" class="btn btn-secondary mb-2 mt-2" onclick="adotar('${gato.id}')">Adote</button>
                </div>
              </div>
              `
          }
        })
      }
    }catch(error) {
      mostrarAlerta(error.message, "erro");
    }
  }
  async function adotar(idGato) {
    const token = localStorage.getItem('token')
    const payload = JSON.parse(atob(token.split(".")[1]))
    const emailDono = payload.email
    try{
      const resp = await fetch('http://localhost:3000/adotarGato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({idGato, emailDono})
      })
      const mensagem = await resp.json()

      if(resp.ok){
        mostrarAlerta(mensagem.message, "sucesso")
        await exibirGatos();
      }else{
        mostrarAlerta(mensagem.message, "erro")
      }
    }catch(error){
      mostrarAlerta(error.message, "erro")
    }
  }
  async function logout(){
    localStorage.clear()
    window.location.href = '../../../../login.html';
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
  
