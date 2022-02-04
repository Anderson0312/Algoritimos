/**
         * Esta página é apenas um modelo para as páginas com os exercícios.
         * Lembre-se de seguir as instruções nas "Anotações de aula" para 
         * executar os exercícios corretamente.
         */

        /******************************************************
         * Declarando todas as variáveis e funções do script. *
         ******************************************************/

        /**
         * Esta função processa o formulario quando este for enviado.
         * A maior parte dos códigos será criada aqui.
         */
         var processaContato = () => {
            console.log('Processando...');

            // Cria objeto com dados do foormulário
            var contato = {
                nome: sanitiza(el('#nome').value),
                email: sanitiza(el('#email').value),
                assunto: sanitiza(el('#assunto').value),
                mensagem: sanitiza(el('#mensagem').value)
            }

            // console.log(contato);

            // Verifica se tem algum campo em branco.
            for (let campo in contato) {
                if (contato[campo] == '') {

                    // Atualiza o campo do formulário com os dados já sanitizados.
                    el(`#${campo}`).value = contato[campo];

                    // Alert o usuário de que algum campo está vazio.
                    alert(`Oooops!\n\nPor favor, preencha todos os campos do formulário.`);

                    // Não envia o formulário e sai da função 'processaContato()'.
                    return false;
                }
            }

            // Adiciona ao objeto 'contato' a data de envio.
            contato.data = dataAtual();

            console.log(contato);

            /**
             * Essa deve ser a última linha desta função.
             * Ela conclui a função sem fazer mais nada.
             * Isso impede que o HTML retome o controla e envie o formulário 
             * novamente.
             */
            return false;
        }

        /**
         * Esta função salva os dados do formulário enviado no armazenamento local do navegador.
         * Ela serve como um teste de envio do formulário.
         * Para acessar o 'Loca Storage' no Chrome, nas ferramentas do desenvolvedor (tela [F12]), 
         * acesse a opção 'Aplicativo' → 'Armazenamento local'
         * 
         * Importante! O parâmetro 'contatoDados' deve ser um objeto JavaScript.
         * 
         * Exemplo de uso:
         *   enviaContato({
         *     nome: 'Joca da Silva',
         *     email: 'joca@silca',
         *     assunto: 'Teste de contato',
         *     mensagem: 'Isso é um teste'
         *     data: '2022-02-02 10:15:18'
         *   });
         * 
         *   Referências:
         *     • Local Storage → https://www.w3schools.com/js/js_api_web_storage.asp
         *     • Local Storage → https://www.w3schools.com/jsref/prop_win_localstorage.asp
         *     • JSON → https://www.w3schools.com/js/js_json_intro.asp
         *     • JSON.stringify → https://www.w3schools.com/js/js_json_stringify.asp
         *     • Date() → https://www.w3schools.com/jsref/jsref_obj_date.asp
         *     • getTime() → https://www.w3schools.com/jsref/jsref_gettime.asp
         *     • document.querySelector() → https://www.w3schools.com/jsref/met_document_queryselector.asp
         */

        var enviaContato = (contatoDados) => {

            // Se os dados não são passados em um objeto...
            if (typeof contatoDados !== 'object') {

                // Gera mensagem de erro.
                let message = `Erro ao salvar os dados. Estavamos esperando um objeto.`;

                // Exibe erro no console.
                console.error(message);

                // Retorna um objeto com o status 'false' e mensagem de erro.
                return { status: false, message: message };

                // Se os dados estão em um objeto...
            } else {

                // Obtém a data atual em timestamp para servir de índice.
                let agora = new Date().getTime();

                // Converte os dados de objeto para uma string (JSON).
                let dados = JSON.stringify(contatoDados);

                // Salva no armazenamento local do browser e, se deu certo...
                if (localStorage.setItem(agora, dados)) {

                    // Gera mensagem de sucesso.
                    let message = `Contato enviado com sucesso.`;

                    // Exibe mensagem no console.
                    console.log(message);

                    // Retorna um objeto com o status 'true' e mensagem de sucesso.
                    return { status: true, message: message };
                };
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
         * Função que retorna a data atual em system date.
         */
        var dataAtual = () => {

            // Obtém a data atual no formato do JavaScript.
            return new Date().toISOString();
        }

        /**
         * Sanitiza a string retornando-a sem códigos HTML perigosos.
         */
        var sanitiza = (str) => {

            // Remove todas as tags HTML
            str = str.replace(/<[^>]*>?/gm, '');

            // Substitui quebras de linha JavaScript por HTML
            str = str.replace(/\n/g, '<br>');

            // Remover espaços antes e depois da string.
            str = str.trim();

            // Retorna a string sanitizada.
            return str;
        }

        /**
         * Monitora o envio do formulário, chamando 'enviaContato()' se 
         * ocorrer.
         */
        el('#contato').onsubmit = processaContato;

        // console.log(sanitiza(`      <strong>teste</strong> \n<a href="google">Google</a>     `));


        /*************************************************
         * Testes unitários para as funções.             *
         * Descomente essas linhas para fazer os testes. *
         *************************************************/

        // console.log(el('#contato').name);

        // enviaContato({ nome: 'Joca da Silva', email: 'joca@silca', assunto: 'Teste de contato', mensagem: 'Isso é um teste' });

        // console.log(dataAtual());