#utf-8
#language: pt

Funcionalidade: Tabelas da Web

  Contexto: 
    Dado que o usuário está na página de tabelas da web

  Cenário: Criar um novo registro na tabela
    Quando o usuário adiciona um novo registro com dados válidos
    Então o registro deve ser exibido corretamente na tabela

  Cenário: Editar um registro existente na tabela
    Dado que um registro foi adicionado à tabela
    Quando o usuário edita este registro com novos dados
    Então o registro deve ser exibido na tabela com os dados atualizados

  Cenário: Remover um registro existente da tabela
    Dado que um registro foi adicionado à tabela
    Quando o usuário remove este registro
    Então o registro não deve mais ser exibido na tabela

  Cenário: Criar e remover 12 registros dinamicamente
    Quando o usuário adiciona '12' novos registros na tabela
    Então todos os '12' registros devem existir na tabela
    E o usuário remove todos os registros criados
    Então eles não devem mais ser exibidos na tabela