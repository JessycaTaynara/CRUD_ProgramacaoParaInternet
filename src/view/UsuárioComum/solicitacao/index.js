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
async function solicitar(){
    const nome = capitalizeWords(document.querySelector("input#nome").value)
    const sexo = document.querySelector("select#sexo").value
    const cor = capitalizeWords(document.querySelector("input#cor").value)
    const descricao = document.querySelector("textarea#descricao").value
    const raca = capitalizeWords(document.querySelector("input#raca").value)

    if(!nome || !sexo || !cor || !descricao || !raca){
        mostrarAlerta("Digite todos os campos de informação sobre o gato para fazer a solicitação", "alerta")
    }else{
        const gato = {nome, sexo, cor, descricao, raca}
        const token = localStorage.getItem("token")
        const emailSolicicitante = (JSON.parse(atob(decodeURIComponent(token.split(".")[1])))).email
        try {
            const retorno = await fetch("http://localhost:3000/fazerSolicitacao", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({gato, emailSolicicitante})
            })
    
            const mensagem = await retorno.json()
    
            if(retorno.ok){
                mostrarAlerta(mensagem.message, "sucesso")
            }else{
                mostrarAlerta(mensagem.message, "erro")
            }
        } catch (error) {
            mostrarAlerta(error.message, "erro")
        }
    }
}
function capitalizeWords(str) {
    return str.replace(/\b\w/g, function(char) {
      return char.toUpperCase();
    });
}