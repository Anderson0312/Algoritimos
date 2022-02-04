var processaContato = () => {
    console.log('Processando...');

    // Cria objeto com dados do foormulário
    var contato = {
        nome: sanitiza(el('#nome').value),
        email: sanitiza(el('#gmail').value),
        assunto: sanitiza(el('#assunto').value),
        mensagem: sanitiza(el('#mensagem').value),
    }

    console.log(contato);

    return false;
}

/**
 * Essa deve ser a última linha desta função.
* Ela conclui a função sem fazer mais nada.
* Isso impede que o HTML retome o controla e envie o formulário 
* novamente.
*/

var enviarContato = (contatoDados) => {
    if (typeof contatoDados !== 'object'){
        let mensagem = 'ERRO ao salvar os dados. ';

        console.error(mensagem);

        return {status: false, message: mensagem};
    } else {
        let agora = new Date().getTime();


        let dados = JSON.stringify(contatoDados);


        if(localStorage.setItem(agora, dados)){
            let msg = 'Contato enviado com sucesso'

            console.log(msg);

            return {status: true, message: msg};
        }
    }
}

/**
* Esta função é um atalho para selecionar um elemento único do HTML,
* usando o seletor deste, de forma similar a 
* 'document.getElementById()'.
* 
* Observe que somente o primeiro elemento do seletor é retornado.
* Se houverem outros, estes serão ignorados.
* 
* Exemplos de uso:
*    el('#feedback').innerHTML = 'Teste';
*    el('button').disabled;
*/

var el = (seletor) => {
    return document.querySelector(seletor);
}

/**
* Monitora o envio do formulário, chamando 'enviaContato()'se 
* ocorrer.
*/
el('#contato').onsubmit = processaContato;

/*************************************************
 * Testes unitários para as funções.             *
 * Descomente essas linhas para fazer os testes. *
*************************************************/

// console.log(el('#contato').name);
// enviarContato({nome: 'Anderson moura', email:'Anderon@gmail.com',   assunto: 'teste teste', mensagem: 'teste teste teste teste teste '})

var dataAtual = () => {
    return new Date().toISOString();
}

/***********************************************
 *              Retorna a data atual           *
*************************************************/

var sanitiza = (str) => {
    //remove todos os caracters indesejaveis
    str = str.replace(/<[^>]*>?/gm, '');

    // substitute quebras de linha javascript por HTML
    str = str.replace(/\n/g, '<br>');

    // remove todosespaços antes e depois
    str = str.trim();
    return str;
}

// console.log(sanitiza('<strong>anderson</strong><script></script>'));