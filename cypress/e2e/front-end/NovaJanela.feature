#utf-8
#language: pt

Funcionalidade: Testar a criação de uma nova janela

    Contexto: O usuário está na página de alertas, quadros e janelas
        Dado que o usuário está na página de Janelas do Navegador

    Cenário: Testar a criação de uma nova janela
        Quando o usuário clica para abrir uma nova janela
        Então uma nova janela com a página de exemplo deve ser aberta
        E a página de exemplo deve ter o título 'This is a sample page'
        E o usuário fecha a nova janela