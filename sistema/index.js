exibirGatos();
  async function addGato(){
    var nome = document.getElementById("nome").value;
    var sexo = document.getElementById("sexo").value;
    var idade = document.getElementById("idade").value;
    var raca = document.getElementById("raca").value;
    var cor = document.getElementById("cor").value;
    var decricao = document.getElementById("descricao").value;

    var gato = {
      nome: nome,
      sexo: sexo,
      idade: idade,
      raca: raca,
      cor: cor,
      descricao: decricao
    };
    try{
      const r = await fetch('http://localhost:3000/addGato', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(gato)
      })
    }catch(error) {
      alert(error.mensagem);
    };

    document.getElementById("nome").value = "";
    document.getElementById("sexo").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("raca").value = "";
    document.getElementById("cor").value = "";
    document.getElementById("descricao").value = "";

    exibirGatos()
    
    const m = document.querySelector("#modal1");
    const modal = bootstrap.Modal.getInstance(m);
    modal.hide();
  }
  async function exibirGatos() {
    try{
      var r = await fetch('http://localhost:3000/gatos')
      const gatos = await r.json();
      const caixa = document.querySelector('div.container');
      caixa.innerHTML="";
      gatos.forEach(gato => {
        if(gato.adotado == false){
          caixa.innerHTML += `
            <div class="card mb-3" style="width: 18rem;">
              <div class="card-body  d-flex flex-column">
                <h5 class="card-title">${gato.nome}</h5>
                <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Idade
                    <span class="badge bg-primary rounded-pill">${gato.idade}</span>
                  </li>
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
                <button type="button" class="btn btn-secondary mb-2 mt-2" onclick="adotar('${gato.nome}')">Adote</button>
                <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal2" onclick="editarGato('${gato.nome}')">Edite</button>
              </div>
            </div>
            `
        }
      })
      if(caixa.innerHTML == ""){
        caixa.innerHTML = "<h1>Não há gatos para adotar, adicione</h1>"
      }
    }catch(error) {
      alert(error.mensagem);
    }
  }
  async function adotar(nomeGato) {
    const token = localStorage.getItem('token')
    const emailDono = (JSON.parse(atob(token.split(".")[1]))).email
    try{
      const resp = await fetch('http://localhost:3000/adotarGato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({nomeGato, emailDono})
      })
      const mensagem = await resp.json()
      alert(mensagem.mensagem)
      exibirGatos();
    }catch(error){
      alert(error.mensagem)
    }
  }
  async function editarGato(nomeGato) {
    let nomeAntigo;
    try{
      const res = await fetch('http://localhost:3000/gatos')
      var listaGatos = await res.json();
      
      for(let i = 0; i < listaGatos.length; i++){
        if(listaGatos[i].nome == nomeGato){
          nomeAntigo = listaGatos[i].nome
          const nome = document.querySelector('input#nomee').value = listaGatos[i].nome
          const raca = document.querySelector('input#racaa').value = listaGatos[i].raca
          const cor =  document.querySelector('input#corr').value = listaGatos[i].cor
          const idade = document.querySelector('input#idadee').value = listaGatos[i].idade
          const sexo = document.querySelector('input#sexoo').value = listaGatos[i].sexo
          const descricao = document.getElementById("descricaoo").value = listaGatos[i].descricao
          break
        }
      }
    }catch(error){
      console.log(error.mensagem)
    }

    const botaoEnviar = document.querySelector('button#botaoEnviar');
    botaoEnviar.addEventListener('click', async ()=>{
      try {
        var nome = document.getElementById("nomee").value;
        var raca = document.getElementById("racaa").value;
        var cor = document.getElementById("corr").value;
        var idade = document.getElementById("idadee").value;
        var sexo = document.getElementById("sexoo").value;
        var descricao = document.getElementById("descricaoo").value;

        var gatoEditado = {
          nomeAntigo: nomeAntigo,
          novoNome: nome,
          raca: raca,
          cor: cor,
          idade: idade,
          sexo: sexo,
          descricao: descricao
        };

        var response = await fetch(`http://localhost:3000/atualizarGato`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(gatoEditado)
        });
        const mensagem = await response.json()
        alert(mensagem.mensagem)
        location.reload()
      } catch (error) {
        console.error(error.mensagem);
      }
    })
    exibirGatos()
    const m = document.querySelector("#modal2");
    const modal = bootstrap.Modal.getInstance(m);
    modal.hide();
  }
  async function logout(){
    localStorage.clear()
    window.location.href = '../login.html';
  }
  
