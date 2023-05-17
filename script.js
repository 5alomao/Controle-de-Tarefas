// Crie uma instância da fila
let minhaLista = new LinkedList();

// Verificar o início da fila
function verInicio() {
  if (minhaLista.getFirst() === null)
    alert(`Lista Vazia!`);
  else{
    const diasEspera = calcularDiferencaDias(minhaLista.getFirst().data, obterDataAtual());
    const tempoEspera = calcularDiferencaHoras(minhaLista.getFirst().hora, obterHoraAtual());
    alert(`Primeiro da Fila: \n` + minhaLista.getFirst() + `\nTempo de Espera: \n ${diasEspera} dia(s) e ${tempoEspera}`);
  }
    
}

// Verificar o final da fila
function verFim() {
  if (minhaLista.getFirst() === null)
    alert(`Lista Vazia!`);
  else{
    const diasEspera = calcularDiferencaDias(minhaLista.getLast().data, obterDataAtual());
    const tempoEspera = calcularDiferencaHoras(minhaLista.getLast().hora, obterHoraAtual());
    alert(`Último da Fila: \n` + minhaLista.getLast() + `\nTempo de Espera: \n ${diasEspera} dia(s) e ${tempoEspera}`);
  }
}

function limpaCampo() {
  txtnovaTarefa.value = "";
  txtnovaPrioridade.value = "";
}

// Função para adicionar um elemento
function adicionarElemento() {
  const descricao = document.getElementById("txtnovaTarefa");
  const prioridade = document.getElementById("txtnovaPrioridade");
  const indice = document.getElementById("txtIndice");

  if (descricao.value === "" || prioridade.value === "") {
    alert("Preencha todos os campos antes de adicionar à fila!");
    return;
  }
  let novaTarefa = new Tarefa(descricao.value, prioridade.value, obterDataAtual(), obterHoraAtual());
  alert(`Tarefa: ${novaTarefa.descricao} Inserida !`);
  minhaLista.addAtIndex(indice.value, novaTarefa);
  mostrarLista();
  descricao.value = "";
  prioridade.value = "";
  indice.value = "";
  descricao.focus();
}

// Função para adicionar um elemento ordenado
function adicionarOrdenado() {
  const descricao = document.getElementById("txtnovaTarefa").value.trim();
  const prioridade = document.getElementById("txtnovaPrioridade").value.trim();

  if (descricao === "" || prioridade === "") {
    alert("Preencha todos os campos!");
    return;
  }

  const novaTarefa = new Tarefa(descricao, prioridade, obterDataAtual(), obterHoraAtual());
  let indice = 0;
  let novaPrioridade = parseInt(novaTarefa.prioridade);
  let retorno = false;

  if (minhaLista.isEmpty()) {
    retorno = minhaLista.addFirst(novaTarefa);
    limpaCampo();
  } else if (novaPrioridade >= minhaLista.getLast().prioridade) {
    retorno = minhaLista.addLast(novaTarefa);
    limpaCampo();
  } else if (novaPrioridade < minhaLista.getFirst().prioridade) {
    retorno = minhaLista.addFirst(novaTarefa);
    limpaCampo();
  } else {
    minhaLista.forEach((item) => {
      if (novaPrioridade >= item.prioridade) {
        indice++;
      }
    });
    minhaLista.addAtIndex(indice, novaTarefa);
    limpaCampo();
  }
  alert(`Tarefa: ${novaTarefa.descricao} Inserida !`);
  mostrarLista();
}

// Função para remover o primeiro elemento da fila
function removerElemento() {
  if (minhaLista.isEmpty())
    alert("Lista vazia!");
  else {
    // remover e mostrar mensagem de remoção
    let rem = minhaLista.deleteFirst();
    mostrarMensagemRemocao(rem);
  }
  mostrarLista();
}
//--------------------------------------------------------------------------------------------
let checked = null;
let removido = null;

function getIndexli() {
  let items = document.querySelectorAll("#list_listadeTarefas li");
  let index;

  //adiciona valores no vetor
  let tab = [];
  for (let i = 0; i < items.length; i++) {
    tab.push(items[i].innerHTML);
  }

  //pega o elemento selecionado
  for (let i = 0; i < items.length; i++) {
    items[i].onclick = function () {
      index = tab.indexOf(this.innerHTML);

      if (checked === null) {
        items[i].style.backgroundColor = "#90ee90";
        checked = i;
      } else {
        if (checked === i) {
          items[i].style.backgroundColor = "#f2f2f2";
          checked = null; // Restaura o valor de checked para null
        } else {
          items[checked].style.backgroundColor = "#f2f2f2";
          items[i].style.backgroundColor = "#90ee90";
          checked = i;
        }
      }
      removido = index;
    };
  }
}

function removerSelecionada() {
  if (minhaLista.isEmpty()) {
    alert("Lista Vazia!");
    return;
  }
  else if (checked === null) {
    alert("Selecione alguma Tarefa!");
    return;
  }
  else{
    let resposta = confirm("Deseja Remover Tarefa Selecionada");
    if (resposta) {
      // Chama a função getIndexli() antes de executar a remoção
      const retorno = minhaLista.deleteAtIndex(removido);
      checked = null;
      mostrarMensagemRemocao(retorno);
      mostrarLista();
    } else {
      checked = null;
      return;
    }
  }
}
//--------------------------------------------------------------------------------------------
function tarefaMaisAntiga() {
  
  let tarefaMaisAntiga = minhaLista.getFirst();

  minhaLista.forEach((tarefa) => {
    const dataHoraTarefa = new Date(`${converterDataFormatoISO8601(tarefa.data)}T${tarefa.hora}`);
    const dataHoraTarefaMaisAntiga = new Date(`${converterDataFormatoISO8601(tarefaMaisAntiga.data)}T${tarefaMaisAntiga.hora}`);

    if (dataHoraTarefa < dataHoraTarefaMaisAntiga) {
      tarefaMaisAntiga = tarefa;
    }
  });
  return tarefaMaisAntiga;
  
}
//--------------------------------------------------------------------------------------------
function exibirTarefaMaisAntiga() {
  const maisAntiga = tarefaMaisAntiga();
  
  if (maisAntiga === null) {
    alert("Lista vazia!");
  } else {
    const tarefa = tarefaMaisAntiga();
    const diasEspera = calcularDiferencaDias(tarefa.data, obterDataAtual());
    const tempoEspera = calcularDiferencaHoras(tarefa.hora, obterHoraAtual());
    alert("Tarefa mais antiga: \n" + maisAntiga + `\nTempo de Espera: \n ${diasEspera} dia(s) e ${tempoEspera}`);
  }
}

//--------------------------------------------------------------------------------------------
function mostrarMensagemRemocao(tarefaRealizada) {
    const mensagem2 = document.getElementById("mensagem-remocao2");
    const diasEspera = calcularDiferencaDias(tarefaRealizada.data, obterDataAtual());
    const tempoEspera = calcularDiferencaHoras(tarefaRealizada.hora, obterHoraAtual());
    mensagem2.innerHTML ="Resolvida: Tarefa ["+ tarefaRealizada.descricao + "] Levou "+ diasEspera +" dia(s) e " + tempoEspera; 
    // apresentar a mensagem de remoção com dias e horas
    mensagem2.style.display = "block";
  }
//--------------------------------------------------------------------------------------------
  function mostrarProximo() {
    const mensagem = document.getElementById("mensagem-remocao");
  if (minhaLista.isEmpty()) {
    mensagem.innerHTML = "Próxima: Lista vazia";
  } else {
    mensagem.innerHTML = "Próxima: " + minhaLista.getFirst().descricao;
  }
  mensagem.style.display = "block";
  }
//-------------------------------------------------------------------------------------------- 
// Função para atualizar a exibição da fila
 function mostrarLista() {
   const listaElemento = document.getElementById("list_listadeTarefas");
   const listaTarefa = document.getElementById("lblmostraTarefas");
   if (minhaLista.isEmpty()) {
      listaTarefa.innerHTML = "Lista vazia!";
      listaElemento.innerHTML = "";
   } else {
       listaTarefa.innerHTML = "Tarefas Pendentes:";
        listaElemento.innerHTML = "";
        minhaLista.forEach((item) => {
          const li = document.createElement("li");
          li.innerText = item.toString();
          listaElemento.appendChild(li);
        }); // for each percorre cada elemento da lista encadeada
   }
   retorno = getIndexli();
   mostrarProximo();
 }
//--------------------------------------------------------------------------------------------
 // funcao data
 function obterDataAtual() {
    let dataAtual = new Date();
    let dia = dataAtual.getDate();
    let mes = dataAtual.getMonth() + 1; // Adiciona 1 porque o mês inicia do zero
    let ano = dataAtual.getFullYear();
    // Formata a data como "dd/mm/aaaa"
    let dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
    return dataFormatada;
}
//--------------------------------------------------------------------------------------------
function obterHoraAtual() {
  const data = new Date();
  const hora = data.getHours().toString().padStart(2, '0');
  const minuto = data.getMinutes().toString().padStart(2, '0');
  const segundo = data.getSeconds().toString().padStart(2, '0');
  return `${hora}:${minuto}:${segundo}`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaHoras(hora1, hora2) {
  const [h1, m1, s1] = hora1.split(':').map(Number);
  const [h2, m2, s2] = hora2.split(':').map(Number);
  
  const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);
  
  const horas = Math.floor(diferencaSegundos / 3600);
  const minutos = Math.floor((diferencaSegundos % 3600) / 60);
  const segundos = diferencaSegundos % 60;
  
  return `${horas.toString().padStart(2, '0')} hora(s) ${minutos.toString().padStart(2, '0')} minuto(s) e ${segundos.toString().padStart(2, '0')} segundo(s)`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaDias(dataInicial, dataFinal) {
  // Converte as datas em milissegundos
  const msPorDia = 24 * 60 * 60 * 1000; // Quantidade de milissegundos em um dia
  const [diaIni, mesIni, anoIni] = dataInicial.split('/').map(Number);
  const [diaFim, mesFim, anoFim] = dataFinal.split('/').map(Number);
  // Cria objetos Date com as datas fornecidas
  const dataIni = new Date(anoIni, mesIni - 1, diaIni); // Subtrai 1 do mês porque o mês inicia do zero
  const dataFim = new Date(anoFim, mesFim - 1, diaFim);
  // Calcula a diferença em milissegundos entre as duas datas
  const diferencaMs = dataFim - dataIni;
  // Converte a diferença de milissegundos para dias e arredonda para baixo
  const diferencaDias = Math.floor(diferencaMs / msPorDia);
  return diferencaDias;
}
//--------------------------------------------------------------------------------------------
function converterDataFormatoISO8601(data) {
  const partes = data.split('/');
  const dia = partes[0].padStart(2, '0');
  const mes = partes[1].padStart(2, '0');
  const ano = partes[2];
  return `${ano}-${mes}-${dia}`;
}
//--------------------------------------------------------------------------------------------
function comparaTarefasDataHora(tarefa1, tarefa2){
  const dataHoraTarefa1 = new Date(`${converterDataFormatoISO8601(tarefa1.data)}T${tarefa1.hora}`);
  const dataHoraTarefa2 = new Date(`${converterDataFormatoISO8601(tarefa2.data)}T${tarefa2.hora}`);

  if(dataHoraTarefa1.getTime() < dataHoraTarefa2.getTime()){
    return tarefa1;
  }else{
    return tarefa2;
  }
}
//--------------------------------------------------------------------------------------------

