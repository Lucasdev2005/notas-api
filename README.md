## NOTAS-API

## compilando localmente

1) instale as depêndencias do projeto com o comando ``` npm install ```
2) com o docker instalado em sua máquina rode o comando ``` docker compose up -d``` para iniciar o container da aplicação com todas as depêndencias necessárias. (mongo e mongo-express)
3) após isso, todas suas alterações reflitirão no container, assim basta rodar o comando ``` docker logs notas-api -f ``` para rastrear os logs da API.
4) entre na documentação da API com [swagger](http://localhost:8080/swagger), crie seu usuário e logue com ele nos endpoints ```/user``` e ```/auth```.


## tecnologias usadas

<div align="center"> 
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg" width=100 heigth=100 />
  <div>NestJS</div>
  <div>Foi utilizado o framework Node NestJS para contrução de endpoints e APIs REST.</div>
</div>

<br/>
<br/>
<br/>

<div align="center"> 
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" width=100 heigth=100 />
  <div>Docker</div>
  <div>Foi utilizado o Docker para containerização da aplicação e construção do ambiente de desenvolvimento de forma mais simples.</div>
</div>
