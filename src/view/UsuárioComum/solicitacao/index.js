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
    try {
        
    } catch (error) {
        mostrarAlerta(error.message, "erro")
    }
}