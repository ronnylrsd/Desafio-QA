#utf-8
#language: pt

Funcionalidade: Barra de progresso

    Contexto: O usuário está na página de widgets
        Dado que o usuário acessa a página de widgets
        E o usuário clica em 'Progress Bar' no submenu

    Cenário: Interagir com o progresso
        Dado o usuário inicia o progresso da barra
        E para antes dos '20'%
        Então o sistema deve mostrar um valor menor ou igual ao escolhido
        E o usuário continuar o progresso
        E chegar aos 100%
        E o usuário clica em resetar
        Então o valor da barra deve ser resetada