#utf-8
#language: pt

Funcionalidade: Testar a criação de uma nova janela

    Contexto: O usuário está na página de alertas, quadros e janelas
        Dado que o usuário acessa a página de alertas, quadros e janelas

    Cenário: Testar a criação de uma nova janela
        Quando o usuário clica no submenu 'Browser Windows'
        E o usuário clica no botão 'New Window'
        Então o sistema deve tentar abrir uma nova janela
        E a página de exemplo deve ter o título 'This is a sample page'
        E o usuário fecha a nova janela