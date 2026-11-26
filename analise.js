let addButton = document.getElementById("addButton");
let formularioDespesas = document.getElementById("formularioDespesas");
let resultadoListaDespesa = document.getElementById("resultadoListaDespesa");
let nomeDespesa = document.getElementById("despesaProgramada");
let vencimentoDaDespesa = document.getElementById("vencimentoDaDespesa");
let valorDespesa = document.getElementById("valorDespesa");
let situacaoDespesa = document.getElementById("situacaoDespesa");
let idEditado = null;
let resultadoDaSoma = document.getElementById("resultadoDaSoma");

let despesas = JSON.parse(localStorage.getItem("despesas")) || [];



function Despesa(_nomeDespesa, _vencimento, _valor, _situacao) {
    this.nome = _nomeDespesa;
    this.vencimento = _vencimento;
    this.valor = _valor;
    this.situacao = _situacao;
    this.id = Date.now();
}


function resultado(evento) {
    evento.preventDefault();
    let txtNome = nomeDespesa.value;
    let txtVencimento = vencimentoDaDespesa.value;
    let numValor = Number(valorDespesa.value);
    let txtSituacao = situacaoDespesa.value;

    if(idEditado === null){
    let novaDespesa = new Despesa(txtNome, txtVencimento, numValor, txtSituacao);
    despesas.push(novaDespesa);
} else {
    let despesasEditada = despesas.find(function(editada){
        return editada.id === idEditado;
    })
        despesasEditada.nome = txtNome;
        despesasEditada.vencimento = txtVencimento;
        despesasEditada.valor = numValor;
        despesasEditada.situacao = txtSituacao;
       
        
}

    salvar();
    desenharTabela();
    idEditado = null;
    formularioDespesas.hidden = true;
    formularioDespesas.reset();
}
formularioDespesas.addEventListener("submit", resultado);

function salvar(){
    localStorage.setItem("despesas", JSON.stringify(despesas));
}


function mostrarform() {
    idEditado = null;
    formularioDespesas.reset();
    formularioDespesas.hidden = false
}

addButton.addEventListener("click", mostrarform);


function desenharTabela() {
    resultadoListaDespesa.innerHTML = "";
    let soma = 0;
    despesas.forEach(function (tarefaRenderizada) {
        soma += tarefaRenderizada.valor;
        let itemDespesa = document.createElement("tr");

        let celulaNome = document.createElement("td");
        celulaNome.textContent = tarefaRenderizada.nome
        itemDespesa.appendChild(celulaNome);

        let celulaVencimento = document.createElement("td");
       let partesData = celulaVencimento.textContent = tarefaRenderizada.vencimento.split("-");
        celulaVencimento.textContent = partesData[2] + "/" + partesData[1] + "/" + partesData[0];
        itemDespesa.appendChild(celulaVencimento);

        let celulaValor = document.createElement("td");
        celulaValor.textContent = tarefaRenderizada.valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
        itemDespesa.appendChild(celulaValor);

        let celulaSituacao = document.createElement("td");
        celulaSituacao.textContent = tarefaRenderizada.situacao
        itemDespesa.appendChild(celulaSituacao);

        let celulaButton = document.createElement("td")
        

        let buttonEditar = document.createElement("button")
        buttonEditar.textContent = "Editar"
        celulaButton.appendChild(buttonEditar);
        buttonEditar.addEventListener("click", function () {
            formularioDespesas.hidden = false
            nomeDespesa.value = tarefaRenderizada.nome;
            vencimentoDaDespesa.value = tarefaRenderizada.vencimento;
            valorDespesa.value = tarefaRenderizada.valor;
            situacaoDespesa.value = tarefaRenderizada.situacao;
            idEditado = tarefaRenderizada.id;
            console.log(idEditado);
        })
       
       
        let buttonExcluir = document.createElement("button")
        buttonExcluir.textContent = "Excluir"
        celulaButton.appendChild(buttonExcluir);
        buttonExcluir.addEventListener("click", function () {
            excluirDespesa(tarefaRenderizada.id);
        })

        itemDespesa.appendChild(celulaButton)
        resultadoListaDespesa.appendChild(itemDespesa);

    })
    function excluirDespesa(id) {
            let despesasQueFicam = despesas.filter(function (tarefa) {
                return tarefa.id !== id;
            })
            despesas = despesasQueFicam;
            salvar();
            desenharTabela();
            
        }
    
       resultadoDaSoma.textContent = "Total despesas: " + soma.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
      
    }

    desenharTabela();


