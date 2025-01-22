//Seleciona os elementos do formulario.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//Seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesTotal = document.querySelector("aside header h2")
const expensesQuantity = document.querySelector("aside header p  span")


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
    //chama a função que irá adicionar o item na lista.
    expenseAdd(newExpense)

}

//Adiciona um novo item na lista.
function expenseAdd(newExpense){
    try{
       // Cria o elemento de il para adicionar o item (li) na lista (ul). 
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        //Cria o icone da categoria.
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        //Cria info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        //cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        //Cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        //Adiciona nome e categoria ma div das informações da despesa
        expenseInfo.append(expenseName, expenseCategory)

        //Cria o valor da despesa.
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
        .toUpperCase()
        .replace("R$", "")
        }`

        //Crai o icone de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "Remover")

        //Adiciona as informações no item.
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
        //Adiciona o item na lista
        expenseList.append(expenseItem)

        //Limpa o formulario para adicionar um novo item
        formClear()

        //Adiciona os totais.
        updateTotals()

    } catch (erro){
        alert("Não foi possivel atualizar a lista de despesas.")
        console.log(error)
    }
}

//Atualiza os totais.
function updateTotals() {
    try {
        //Recupera todos os itens (li) da lista (ul)
        const items = expenseList.children
        
        //Atualiza a quantidade de itens da lista
        expensesQuantity.textContent = `${items.length} ${items.length >1? "despesas" : "despesa"}`

        //variavel para incrementar o valor
        let total = 0

        //Percorre cada item (li) da lista (ul)
        for (let item = 0; item < items.length; item++){
        const itemAmount = items [item].querySelector(".expense-amount")

        //Remove caracteres não númericos e subistitui vírgula por ponto.
        let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

        //Converte o valor para float.
        value = parseFloat(value)

        //Verifica seé uma número válido.
        if (isNaN(value)){
            return alert(
                "Não foi posível calcular o total. O valor não parece ser número."
                )
            }
            //Incrementa o valor total.
            total += Number(value)
        }

       //Cria a span para adicionar o R$ formatado 
       const symbolBRL = document.createElement("small")
       symbolBRL.textContent = "R$"

       //Formata o valor e remove o R$ que será exibido pela small com um estilo constumizado
       total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

       //Limpa o conteudo do elemento.
       expensesTotal.innerHTML = ""

       //adiciona o simboloda moeda e o valor total formatado 
       expensesTotal.append(symbolBRL, total)

    }catch(error){
        console.log(error)
        alert("Não foi possível atualizar os totais.")
    }
}

//Evento que captura o clique nos itens da lista.
expenseList.addEventListener("click", function(event){
    //Verifica se o elemento clicado é o icone de remover
    if(event.target.classList.contains("remove-icon")){
    //Obtém a (li) pai do elemento clicado        
    const item = event.target.closest(".expense")

    //Remove itens da lista
    item.remove()
    }

    //atualiza os totais.
    updateTotals()
})

function formClear(){
    //Limpa os inputs.
    expense.value = ""
    category.value = ""
    amount.value = ""

    //coloca o foco no input de amount
    expense.focus()
}