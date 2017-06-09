
#Início

Repositório para Front End do Cardappio, utilizando Ionic.

Ao dar o clone, usar o comando `npm install` (sudo)
Para rodar o ionic no browser, `ionic serve`

#Testes

Para criar testes, há uma pasta "tests" no projeto. Crie o teste no arquivo "exemplo.js"
Ou crie um novo arquivo ".js" com seus testes.

Para executar os testes, dê o comando "karma start", ele irá abrir o navegador sinalizando
que foi executado, o resultado do teste irá aparecer na linha de comando.

Caso tenha algum Problema com o Karma, veja se você tem ele instalado no 'global'.
Veja o seguindte link para ajuda. [Link](http://ericnish.io/blog/set-up-jasmine-and-karma-for-angularjs/)

#Imagens da aplicação

| ScreenShot        | Descrição           
| ------------- |:-------------:
| ![Screen 1](https://github.com/Cardappio/cardappio-app/blob/master/resources/screens/20897032_snapshot_2017-06-08_17-21-09.png)      | Adicionei um FAB com lista, e dentro dele implementei o botão de traçar a rota, o ideal é que este botão só apareça quando o estabelecimento for selecionado, mas não consegui implementar isto
| ![Screen 2](https://github.com/Cardappio/cardappio-app/blob/master/resources/screens/20897032_snapshot_2017-06-08_17-21-17.png)      | Achei interessante o estilo desse FAB porque a gente pode implementar mais funcionalidades nele depois, ajudem aí a pensar, se decidirem pelo FAB simples, ou por outra forma de acionar a rota, avisem.      
| ![Screen 3](https://github.com/Cardappio/cardappio-app/blob/master/resources/screens/20897032_snapshot_2017-06-08_17-21-24.png) | Implementada uma função paramostrar aviso caso não seja escolhido um destino (se o usuário não tiver clicado em nenhum estabelecimento no mapa)
| ![Screen 4](https://github.com/Cardappio/cardappio-app/blob/master/resources/screens/20897032_snapshot_2017-06-08_17-22-26.png) | Área com os estabelecimentos carregados
| ![Screen 5](https://github.com/Cardappio/cardappio-app/blob/master/resources/screens/20897032_snapshot_2017-06-08_17-22-39.png) | InfoWindow com as informações do estabelecimento, aqui precisamos urgente refzer e decidir quais informações colocar no box, poderiamos até criar um box próprio, para não depender tanto do modelo do googleMaps, mas vemos isso depois
| ![Screen 6](https://github.com/Cardappio/cardappio-app/blob/master/resources/screens/20897032_snapshot_2017-06-08_17-23-22.png) | 
Aqui já é a tela do maps nativo, depois que o usuário clica no botão "rota" estando ele com algum estabelecimento selecionado, tem um problema aqui que o comando "window.open('geo:' ... " usado para chamar o app nativo, só funciona se o estabelecimento for reconhecido como um "place" no google maps, o que logicamente não será o nosso caso, temos que pensar como resolver isso.