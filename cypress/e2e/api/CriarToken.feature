#utf-8
#language: pt

Funcionalidade: Criar um token na API Book Store

    Cenário: Usuário cria um token com sucesso
        Quando o usuário tenta criar um token com dados válidos
        Então o token deve ser criado com sucesso

    Cenário: Usuário tenta criar um token com dados inválidos
        Quando o usuário tenta criar um token com dados inválidos
        Então o token não é criado
