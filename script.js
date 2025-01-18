//Seleciona os elementos do formulario.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")


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
//Captura o evento de submit do formulario para obter os valores
form.onsubmit = (event) => {
    //Previne o comportamento padão de recarregar a pagina
    event.preventDefault()

    //Cria um objeto com os detalhes na nova despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }


}