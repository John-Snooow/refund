//Seleciona os elementos do formulario.

const amount = document.getElementById("amount")

//captura o evento de input para formatar o valor
amount.oninput = () =>{
    let value = amount.value.replace(/\D/g, "")

    amount.value = value
}