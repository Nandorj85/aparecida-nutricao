var botaoAdicionar = document.querySelector('#adicionar-paciente');

botaoAdicionar.addEventListener('click', function(event) {
  event.preventDefault(); // Evitando o comportamento padrão
  
  var form = document.querySelector('#form-adiciona');

  var paciente = pegaPacienteForm(form);  

  var pacienteTr = montaTr(paciente);

  var erros = validaPaciente(paciente);

  if(erros.length > 0) {
    exibeMensagensDeErro(erros);
    return;
  }

  adicionaPacienteNaTabela(paciente);
  
  form.reset();

  var mensagemErro = document.querySelector('#mensagens-erro');
  mensagemErro.innerHTML = '';
});

function adicionaPacienteNaTabela(paciente) {
  var pacienteTr = montaTr(paciente);
  var tabelaPacientes = document.querySelector('#tabela-pacientes');
  tabelaPacientes.appendChild(pacienteTr);

}


function exibeMensagensDeErro(erros) {
  var ul = document.querySelector('#mensagens-erro');
  ul.innerHTML = '';

  erros.forEach(function(erro) {
    var li = document.createElement('li');
    li.textContent = erro;
    ul.appendChild(li);
  });
}

function pegaPacienteForm(form) {
  var paciente = {
    nome: form.nome.value,
    peso: form.peso.value,
    altura: form.altura.value,
    gordura: form.gordura.value,
    imc: calculaImc(form.peso.value, form.altura.value)
  }
  return paciente;
}

function montaTr(paciente) {
  var pacienteTr = document.createElement('tr');
  pacienteTr.classList.add('paciente');

  pacienteTr.appendChild(montaTd(paciente.nome, 'info-nome'));
  pacienteTr.appendChild(montaTd(paciente.peso, 'info-peso'));
  pacienteTr.appendChild(montaTd(paciente.altura, 'info-altura'));
  pacienteTr.appendChild(montaTd(paciente.gordura, 'info-gordura'));
  pacienteTr.appendChild(montaTd(paciente.imc, 'info-imc'));

  return pacienteTr;
}

function montaTd(dado, classe) {
  var td = document.createElement('td');
  td.textContent = dado;
  td.classList.add(classe);
  return td;
}

function validaPaciente(paciente) {

  var erros = [];

  if(paciente.nome.length == 0) {
    erros.push('Favor preencher o campo nome!');
  }

  if(!validaPeso(paciente.peso)) {
    erros.push('Peso Inválido!');
  }

  if(paciente.peso.length == 0) {
    erros.push('Favor preencher o campo peso!');
  }

  if(!validaAltura(paciente.altura)) {
    erros.push('Altura Inválida!');
  }

  if(paciente.altura.length == 0) {
    erros.push('Favor preencher o campo altura!');
  }

  if(paciente.gordura.length == 0) {
    erros.push('Favor preencher o campo gordura!');
  }

  return erros;
}