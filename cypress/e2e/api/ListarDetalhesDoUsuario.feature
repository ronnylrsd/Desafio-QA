#utf-8
#language: pt

Funcionalidade: Listar detalhes do usuário na API Book Store

    Cenário: Listar detalhes do usuário autenticado
        Quando o usuário pede para listar os detalhes de um usuário que existe
        Então o sistema deve retornar os detalhes do usuário autenticado

    Cenário: Listar detalhes do usuário sem token de autenticação
        Quando o usuário pede para listar os detalhes de um usuário sem fornecer um token de autenticação
        Então o sistema deve retornar uma mensagem de erro de autenticação