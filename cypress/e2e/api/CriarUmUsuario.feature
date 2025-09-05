#utf-8
#language: pt

Funcionalidade: Criar um usuário na API Book Store

    Cenário: Criar um usuário com sucesso
        Quando eu criar um usuário com dados válidos
        Então o usuário deve ser criado com sucesso