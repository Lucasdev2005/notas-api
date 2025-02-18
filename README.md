## NOTAS-API

1) instale as depêndencias do projeto com o comando ``` npm install ```
2) com o docker instalado em sua máquina rode o comando ``` docker compose up -d``` para iniciar o container da aplicação com todas as depêndencias necessárias. (mongo e mongo-express)
3) após isso, todas suas alterações reflitirão no container, assim basta rodar o comando ``` docker logs notas-api -f ``` para rastrear os logs da API.
4) entre na documentação da API com [swagger](http://localhost:8080/swagger), crie seu usuário e logue com ele nos endpoints ```/user``` e ```/auth```.
