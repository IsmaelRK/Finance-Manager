# Finance-Manager


[Mudar para Inglês](./README_EN.md)


![Static Badge Node JS](https://img.shields.io/badge/Node--green)
![Static Badge React](https://img.shields.io/badge/React--blue)
![Static Badge Javascript](https://img.shields.io/badge/JS--yellow)
![Static Badge NPM](https://img.shields.io/badge/Npm--red)
![Static Badge Under MIT License](https://img.shields.io/badge/MIT--green)
![Static Badge](https://img.shields.io/badge/English--darkblue)
![Static Badge](https://img.shields.io/badge/Portugu%C3%AAs_BR--green)

![Imagem da Aplicação](./readme-img/appImage.jpg)

## Objetivo do projeto
Criar uma aplicação gerenciadora de finanças com React e Node JS, 
a qual recebe um valor total mensal, despesas e lucros, que se tratam das transações.
Ressaltando que todos os campos são editáveis e as transações são passiveis de criações e deleções.

## Sobre

Este é meu primeiro projeto com React e Node JS, representando minha primeira incursão ao uso destas tecnologias. Foi muito
útil para criar novos conhecimentos e aprimorar os anteriores.



## Instalação

* Assegure-se que tenha o <a href="https://nodejs.org/en">Node JS</a> instalado.

1. Clone o repositório:

    ```shell
    https://github.com/IsmaelRK/Finance-Manager.git
    ```

2. Navegue até a raiz do projeto:
    
   ```shell
   cd finance-manager
   ```
   
3. Instale as dependências:

   ```shell
   npm install 
   ```
   
## Executando a aplicação

### Iniciando o backend:
   

   - Partindo da raiz do projeto ``./finance-manager``, entre no diretório ``./backend`` e então execute:

      ```shell
      npm install
      node index.js
      ```
   
   Isso deve iniciar o backend na porta 3001, se necessário, pode ser alterada na linha 5 de ``index.js``.
   
   > Nota:
   >  
   > Se for sua primeira vez iniciando o backend, o banco de dados SQLite será gerado.
   > 
   > Deverá receber em seu terminal um log ```Database successfully built!```

<br>

### Iniciando a UI com React

   - Partindo da raiz do projeto ``./finance-manager``, execute:

      ```shell
      npm start
      ```
   
   * A aplicação deve estar ouvindo porta 3000, então acesse ``http://localhost:3000/``
   

## Estrutura do projeto
    
   * Estando na raiz do projeto ``./finance-manager``

   ### Front-end
   
   #### Diretório ``./src``

   * O arquivo ``FinanceViewer.js`` possui o código relativo á interface em React incluindo usas funções.
   
      > Nota: Até o momento não está com a organização considerada ideal para o projeto, de tal modo,
      uma alteração deve ocorrer em atualizações futuras.
    
    
   * O arquivo ``FinanceViewerContent.jsx`` contém o html/jsx que usufrui da estilização de ``FinanceViewerContent.css``.
   Ressaltando que o jsx é importado no arquivo principal ``FinanceViewer.js``.

   
   * ``App.js`` define o componente principal da aplicação e ``index.js`` renderiza tal componente.

   <br>

   #### Diretório ``./public``

   * Possui o favicon da página e o template base da mesma.

   <br>

### Back-end

* Estando no diretório ``./backend``

#### Diretório ``./``

   * Será onde o banco de dados SQLite será gerado e armazenado e onde o arquivo principal se localiza


#### Diretório ``./modules``

   * Tal diretório possui algumas das funções necessárias á aplicação: 
   
   O arquivo com a definição das rotas ``route.js``, o qual é usado pelo arquivo principal ``index.js``, a fim de 
   construir as rotas da aplicação.

   O arquivo ``dbCreator.js`` cria a conexão com o banco de dados e além disso, o constrói se ainda não o tenha feito.
   Ressaltando que se o banco de dados for deletado, outro sera gerado após reinicializar o back-end.

   O arquivo ``calculateSubtotal.js`` recalcula o subtotal/balança atual, toda vez que há uma mudança relevante nos
   valores.

#### Diretório ``./modules/routeModules``

   * Este diretório possui a maioria das funções necessárias á aplicação, mais especificamente, á suas rotas:

   Pode se conferir a associação das funções á suas respectivas rotas, além da criação de novas em ``./modules/route.js``.
   

## Problemas conhecidos

   - Um bug detectado, é um no qual ao fazer muitas requisições para o back-end, onde o banco de dados é acessado,
   o mesmo gera um erro. O erro ocorre pois, segundo o log, o banco de dados está travado. Creio que o problema seja
   alguma concorrencia entre as chamadas.


   - Delay nas inputs, possívelmente ocorre pelo gargalo de tempo entre a ação e alguma resposta do banco de dados.


## Licença

   > MIT
