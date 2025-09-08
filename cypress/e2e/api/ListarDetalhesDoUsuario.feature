#utf-8
#language: pt

Funcionalidade: Listar detalhes do usuário na API Book Store

    Contexto:
        Dado que um usuário está autenticado no sistema

    Cenário: Listar detalhes do usuário autenticado
        Quando o usuário pede para listar seus detalhes
        Então o sistema deve retornar os detalhes do usuário autenticado

    Cenário: Listar detalhes do usuário sem token de autenticação
        Quando o usuário tenta listar os detalhes sem um token de autenticação
        Então o sistema deve retornar uma mensagem de erro de autenticação