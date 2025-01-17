//Seleciona os elementos do formulario.

const amount = document.getElementById("amount")

//captura o evento de input para formatar o valor
amount.oninput = () =>{
    //obtem o valor atual do input e remove os caracters não númericos
    let value = amount.value.replace(/\D/g, "")

    //transformando em centavos(ex: 150/100 = 1,5 que é equivalente a 1,50).
    value = Number(value) / 100

    //Atualiza o valor do input.
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value){
    //formata o valor na padrão BRL (Real Brasileiro)
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
    //retorna o valor formatado
    return value

}