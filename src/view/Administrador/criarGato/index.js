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

async function criarGato(){
    const token = localStorage.getItem("token")

    const nome = capitalizeWords(document.querySelector("#nome").value)
    const sexo = document.querySelector("#sexo").value
    const descricao = document.querySelector("#descricao").value
    const cor = capitalizeWords(document.querySelector("#cor").value)
    const raca = capitalizeWords(document.querySelector("#raca").value)

    if(!nome || !sexo || !descricao || !cor || !raca){
        mostrarAlerta("Preencha todos os campos", "alerta")
    }else{
        const retornoApi = await fetch("http://localhost:3000/addGato", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({nome, sexo, descricao, cor, raca})
        })
        const mensagem = await retornoApi.json()

        if(retornoApi.ok){
            mostrarAlerta(mensagem.message, "sucesso")
        }else{
            mostrarAlerta(mensagem.message, "erro")
        }
    }
}

function capitalizeWords(inputString) {
    return inputString
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}