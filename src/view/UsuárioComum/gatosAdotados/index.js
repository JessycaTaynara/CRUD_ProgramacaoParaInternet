document.addEventListener('DOMContentLoaded', function () {
    carregarCard()
});
async function carregarCard(){
    const token = localStorage.getItem('token')
    const email = (JSON.parse(atob(token.split(".")[1]))).email
    try{
        const resp = await fetch(`http://localhost:3000/meusGatosAdotados/${email}`)
        const gatos = await resp.json()

        const body = document.querySelector("body")
        if(gatos.length > 0){
            gatos.forEach(gato => {
                body.innerHTML+= `
                <div class="card" style="width: 18rem;">
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
            body.innerHTML = "<h1>Você não adotou nenhum gato</h1>"
        }
    }catch(error){
        alert(error.mensagem)
    }
}