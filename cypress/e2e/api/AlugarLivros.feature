#utf-8
#language: pt

Funcionalidade: Alugar livros na API Book Store

    Cenário: Alugar dois livros disponíveis na API
        Dado que o usuário está autenticado com livros disponíveis
        Quando o usuário seleciona '2' livros para alugar
        Então o sistema deve confirmar que os livros foram alugados com sucesso

    Cenário: Alugar livros com token e id inválidos
        Dado que o usuário tenta realizar o aluguel sem estar autenticado
        Quando o usuário seleciona '1' livros para alugar
        Então o sistema deve retornar uma mensagem de erro de campo inválido

    Cenário: Alugar um livro que não existe
        Dado que o usuário tem os dados válidos 2 de autenticação
        Quando o usuário seleciona um livro com ID inválido para alugar
        Então o sistema deve retornar uma mensagem de erro de livro não encontrado