#utf-8
#language: pt

Funcionalidade: Ordenável

    Contexto: O usuário está na página de Interactions
        Dado que o usuário acessa a página de interactions
        E o usuário clica em 'Sortable' no submenu

    Cenário: Ordenar forma crescente
        Quando que o usuário ordernou a lista de forma crescente
        Então o sistema deve exibir os itens de forma crescente