#utf-8
#language: pt

Funcionalidade: Confirmar se o usuário está autorizado na API Book Store

    Cenário: Verificar se o usuário está autorizado com dados válidos
        Quando o usuário tenta entrar com dados válidos
        Então o usuário deve estar autorizado

    Cenário: Verificar se o usuário não está autorizado com dados inválidos
        Quando o usuário tenta entrar com dados inválidos
        Então o usuário não deve estar autorizado com dados inválidos

    Cenário: Verificar se o usuário não está autorizado sem dados
        Quando o usuário tenta entrar sem dados
        Então o usuário não deve estar autorizado com campos vazios