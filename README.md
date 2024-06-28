# Sobre o projeto

No projeto é abordado conceitos importantes sobre o mundo do backend.

Tem conceitos como:
- Endpoints
- Controllers
- Banco de dados SQL
- Query builder
- Migrations de banco
- Seeds de banco
- Controle de usuário com email e senha
- Criptografia de senha
- Login de usuários
- Geração e utilização de tokens JWT
- Validação minuciosa de dados que entram nos endpoints
- Paginação de consultas
- Filtros de consultas
- Testes de código para garantir qualidade das entregas
- Uso de diferentes bancos de dados com um mesmo código
- Boas práticas de código, com conceitos do clean code


Está é uma API Rest, então não tem interface nesse repositório. Porém, é possível conectar um interface a ele. A interface está em outro repositório.

# Como rodar 

Você vai precisar do nodens instalado no seu computador para rodar o projeto.

Clone o repositório:
```
$ git clone [https://github.com/lvsouza/youtube-curso-react-materialui-typescript.git](https://github.com/Aristidescosta/api-rest-node-typescript.git)
```

Entre na pasta
```
$ cd api-rest-node-typescript
```

Instale as dependências
```
$ yarn install
```

Configure as variáveis ambiente, crie o arquivo `.env` na pasta raiz do projeto coloque o conteúdo a seguir dentro
```
PORT=3333
NODE_ENV=dev

IS_LOCALHOST=true

ENABLED_CORS=[Lista de endereços separados por ";"]
JWT_SECRET=[Uma string qualquer]
```

Rode o projeto
```
$ yarn start
```
