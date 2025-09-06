#utf-8
#language: pt

Funcionalidade: Testar formulário de registro de estudante

    Contexto: O usuário está na página de registro de estudante
        Dado que o usuário acessa a página de registro de estudante

    Cenário: Registrar um estudante com sucesso
        Quando o usuário preenche o formulário com dados válidos
        E o usuário clica em 'submit'
        Então o sistema deve exibir um pop-up de confirmação com os dados corretos
        E o usuário clica em 'close'