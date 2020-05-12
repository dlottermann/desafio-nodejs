

## Desafio modelo de armazenamento
 
O seguinte projeto tem como objetivo oferecer uma proposta de solução, para um cenário de armazenamento e consulta de informações com diferentes níveis de complexidade dos dados armazenados.

A solução elaborada tem como foco principal manter a integridade, disponibilidade e níveis de confidencialidade, sem perdas de performance e sem grandes custos de infraestrutura.

  

**Cenário:**

  

**Base de dados A**
Possui dados extremamente sensíveis e deve ser protegida com os maiores níveis de segurança, mas o acesso a esses dados não precisa ser tão performática.

**Base de dados B**
Possui dados críticos, o acesso precisa ser mais rápido. Base B além de consultas é utilizada para extração de dados por meio de algoritmos de aprendizado de máquina.

**Base de dados C**
Não possui nenhum tipo de dado crítico, mas precisa de um acesso extremamente rápido
 

## Solução

  

**Base de dados A**

Para esta base de armazenamento foi escolhido o PostgreSql por ser um banco de dados já consolidado no mercado e com uma grande quantidade de ferramentas e funcionalidades.

O uso do PL/pgSQL para criar rotinas dentro do servidor de banco de dados, e economizando tempo, para que não exista uma grande carga entre cliente e o servidor, isto pode aumentar o desempenho - uma alternativa porém com paga seria o Oracle

**Base de dados B**

Para base de armazenamento B também foi escolhido o PostgreSql, pelos menos motivos elencados no parágrafo anterior.

A diferença fica por conta da camada com Redis (cache), para um incremento na performance de consulta aproveitando principalmente o “in-memory” do Redis para aumentar a velocidade do retorno das consultas.

**Base de dados C**

Para esta base de armazenamento foi escolhido o MongoDB por ser uma base de dados baseada em documentos ele possui uma grande performance, e altamente escalável.

Por serem dados de consulta rápida o Mongo atende tranquilamente, independente da quantidade de informações - Firebase do google pode ser uma alternativa, embora ainda possui alguns pontos que deixam o mongo em vantagem

  

## Estrutura

**Micro Serviços**
Toda camada de consulta foram divididas em serviços separados para facilitar a implantação e a escalabilidade. Alguma possível falha em um dos serviços não impede o funcionamento dos demais.
Foi sugerido uso de docker com NodeJs rodando em cada service.
  

**Balancer**
Adicionei balancer, para distribuir as requisições, pensando dividir os recursos alta disponibilidade do serviço.

**API Gateway**
Adicionei a API gateway para tornar o endpoint único de acesso a APIs, implantar níveis de segurança, que dentre eles incluem autenticação e futuramente gravação de logs.

Algumas regras podem ser implantadas futuramente para redirecionamentos, tratamento de requisições http e etc.


## Código Modelo

 Para exemplificar o modelo de funcionamento foram criados 3 pequenos micro serviços, com dados mockados para simulação das bases de dados.
 
Também foi criada uma pequena API gateway para exemplificar as requisições efetuadas e os níveis de acesso e autenticação necessários.

### Como executar o exemplo

A API gateway e os micro serviços foram construídos em NodeJS, para executá los é preciso seguir alguns procedimentos, que seguem abaixo:

> Todo código desenvolvido está dentro do diretório "code"

Primeiramente precisamos inicializar os micro serviços que estão na pasta dentro da code. Cada service está dividido em um diretório - serviceA, serviceB e serviceC.

Para inicializar o serviço você deve entrar no diretório do projeto e posteriormente em code usando o terminal do sistema operacional 

    cd code

 
### Utilizando docker-compose
Com o docker-compose instalado basta rodar
 

    docker-compose up

  

O script *docker-compose.yml* será executado e os 3 micro serviços estarão disponíveis

  

### Instalação manual

Caso não tenha o docker instalado - seguir este procedimentos.

  

Depois você deve entrar em cada um dos diretórios dos services e executar o seguintes comandos

  

    npm install && npm start

  

Repita este processo para cada um dos três services dentro da pasta “services”.

Pode se notar que ao rodar os comandos os pacotes npm devem ser baixados para sua máquina.

Posteriormente uma mensagem informando que o serviço está rodando na porta 300X deve aparecer, isto significa que já está disponível este service

#### Mensagem ex:

> `Serviço A rodando na porta 3001`

Após executar o passo a passo via docker ou para cada services, você pode retornar para pastas “code” através do terminal, e executar:

    npm install && npm start

Este comando vai efetuar o download das dependências e inicializar a nossa API gateway.