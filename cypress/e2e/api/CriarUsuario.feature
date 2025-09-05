#utf-8
#language: pt

Funcionalidade: Criar um usuário na API Book Store

    Cenário: Criar um usuário com sucesso
        Quando o usuário tenta se cadastrar com dados válidos
        Então o sistema deve criar o Usuário com sucesso

    Cenário: Não criar um usuário por não cumprir os requisitos de senha
        Quando o usuário tenta criar um usuário com uma senha simples
        Então o sistema não permite se cadastrar com uma senha simples

    Cenário: Não criar um usuário que já existe
        Quando o usuário tenta se recadastrar
        Então o sistema não deve permitir o usuário ser cadastrado novamente