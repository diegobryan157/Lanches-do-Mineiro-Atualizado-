// Máscara de telefone
const telInput = document.getElementById('telefone');
Inputmask({ mask: '(99) 99999-9999' }).mask(telInput);

const campos = ['nome', 'telefone', 'rua', 'numero', 'bairro'];
const btn = document.getElementById('btnEntrega');

btn.addEventListener('click', function () {
  let tudoOk = true;

  // Checar os campos de texto
  campos.forEach(campo => {
    const input = document.getElementById(campo);
    const erro = document.getElementById(`${campo}-erro`);
    if (!input.value.trim()) {
      erro.textContent = 'Preencha este campo!';
      tudoOk = false;
    } else {
      erro.textContent = '';
    }
  });

  // Checar se algum lanche foi selecionado
  const lancheSelecionado = document.querySelector('input[name="lanche"]:checked');
  const lancheErro = document.getElementById('lanche-erro');
  if (!lancheSelecionado) {
    lancheErro.textContent = 'Selecione um lanche!';
    tudoOk = false;
  } else {
    lancheErro.textContent = '';
  }

  if (!tudoOk) {
    document.getElementById('mensagem').innerHTML = '';
    return;
  }

  // Monta mensagem de sucesso
  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const rua = document.getElementById('rua').value.trim();
  const numero = document.getElementById('numero').value.trim();
  const bairro = document.getElementById('bairro').value.trim();
  const referencia = document.getElementById('referencia').value.trim();

  const textoPedido = `
✅ Pedido Confirmado!
👤 Cliente: ${nome}
📞 Telefone: ${telefone}
📍 Endereço: ${rua}, ${numero} - ${bairro}
${referencia ? `📝 Referência: ${referencia}\n` : ''}
🍔 Lanche: ${lancheSelecionado.value}
🚚 Seu pedido está sendo preparado e será entregue em breve!
  `.trim();

  const mensagem = document.getElementById('mensagem');
  mensagem.className = 'sucesso';
  mensagem.innerHTML = `
    <h3>✅ Pedido Confirmado!</h3>
    <p><strong>Cliente:</strong> ${nome}</p>
    <p><strong>Telefone:</strong> ${telefone}</p>
    <p><strong>Endereço:</strong> ${rua}, ${numero} - ${bairro}</p>
    ${referencia ? `<p><strong>Referência:</strong> ${referencia}</p>` : ''}
    <p><strong>Lanche:</strong> ${lancheSelecionado.value}</p>
    <p>🚚 Seu pedido está sendo preparado e será entregue em breve!</p>
    <a 
      href="https://wa.me/SEU_NUMERO_WHATSAPP?text=${encodeURIComponent(textoPedido)}" 
      target="_blank"
      class="btnWhats"
    >📲 Enviar via WhatsApp</a>
  `;

  // Limpa tudo após pedido
  document.querySelectorAll('.form input').forEach(input => input.value = '');
  document.querySelectorAll('input[name="lanche"]').forEach(input => input.checked = false);
});

// Validação em tempo real para sumir mensagem de erro
campos.forEach(campo => {
  const input = document.getElementById(campo);
  const erro = document.getElementById(`${campo}-erro`);
  input.addEventListener('input', () => {
    if (input.value.trim()) {
      erro.textContent = '';
    }
  });
});

// Também em tempo real para o cardápio (quando escolhe lanche)
document.querySelectorAll('input[name="lanche"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const lancheErro = document.getElementById('lanche-erro');
    lancheErro.textContent = '';
  });
});
document.getElementById("btnEntrega").addEventListener("click", function () {
    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const rua = document.getElementById("rua").value.trim();
    const numero = document.getElementById("numero").value.trim();
    const bairro = document.getElementById("bairro").value.trim();
    const referencia = document.getElementById("referencia").value.trim();
    const lancheSelecionado = document.querySelector('input[name="lanche"]:checked');
  
    const mensagemDiv = document.getElementById("mensagem");
    mensagemDiv.innerHTML = ""; // Limpa mensagens anteriores
  
    let erros = [];
  
    if (!lancheSelecionado) {
      erros.push("⚠️ Selecione um lanche.");
    }
    if (!nome) {
      erros.push("⚠️ Preencha o campo Nome.");
    }
    if (!telefone) {
      erros.push("⚠️ Preencha o campo Telefone.");
    }
    if (!rua) {
      erros.push("⚠️ Preencha o campo Rua.");
    }
    if (!numero) {
      erros.push("⚠️ Preencha o campo Número.");
    }
    if (!bairro) {
      erros.push("⚠️ Preencha o campo Bairro.");
    }
  
    if (erros.length > 0) {
      const ul = document.createElement("ul");
      ul.className = "mensagem-erro";
      erros.forEach(erro => {
        const li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
      });
      mensagemDiv.appendChild(ul);
    } else {
      const pedidoHTML = `
        <div class="mensagem-sucesso">
          <h3>✅ Pedido Realizado!</h3>
          <p><strong>Cliente:</strong> ${nome}</p>
          <p><strong>Telefone:</strong> ${telefone}</p>
          <p><strong>Endereço:</strong> ${rua}, ${numero} - ${bairro}</p>
          <p><strong>Referência:</strong> ${referencia || "Não informado"}</p>
          <p><strong>Lanche:</strong> ${lancheSelecionado.value}</p>
          <p>🛵 Seu pedido será entregue em breve!</p>
        </div>
      `;
      mensagemDiv.innerHTML = pedidoHTML;
    }
  });
  