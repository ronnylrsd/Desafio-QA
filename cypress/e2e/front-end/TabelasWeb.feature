#utf-8
#language: pt

Funcionalidade: Tabelas da Web

    Contexto: O usuário está na página de tabelas da web
      Dado que o usuário acessa a página de tabelas da web

    Cenário: Criar um novo registro na tabela
      Quando o usuário aperta no botão 'Add'
      E o usuário preenche o formulário para a tabela com dados válidos
      E o usuário aperta no botão 'Submit'
      Então o sistema deve adicionar o novo registro à tabela

    Cenário: Editar o novo registro na tabela
      Dado que um registro foi adicionado à tabela com dados conhecidos
      Quando o usuário aperta no botão 'Edit'
      E o usuário edita este registro com novos dados válidos
      E o usuário aperta no botão 'Submit'
      Então o sistema deve atualizar o registro na tabela com os novos dados

    Cenário: Remover o novo registro na tabela
      Dado que um registro foi adicionado à tabela com dados conhecidos
      Quando o usuário aperta no botão 'Delete'
      Então o sistema deve atualizar o registro na tabela sem os novos dados