
# Hours Manager (ONLY BACKEND) 

*This project was created as a test to build a backend using Node.js, MySQL, and a RESTful API. It allows you to create, query, and manage activities, as well as upload related media files.*

## Technologies Used

- Node.js
- Express.js
- MySQL
- Multer (for file uploads)
- JWT (for authentication)
- Postman (for testing)

## Setting Up the Project

### 1. Clone the repository:
``git clone <url-do-repositorio>
cd time_manager``

### 2. Install dependencies:
``npm install``


### 3. Set up the MySQL database:

```
CREATE DATABASE time_manager;

USE time_manager;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activities table
CREATE TABLE activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    description TEXT,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Notes table
CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    activity_id INT NOT NULL,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);

-- Media uploads table
CREATE TABLE media_uploads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    activity_id INT NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    media_type ENUM('image', 'video') NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);
```

### 4. Set up the .env file:
*Create a .env file in the project root and add the following variables:*

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=<your_password>
DB_NAME=time_manager
JWT_SECRET=supersecretkey
```

### 5. Start the application:
```
npx nodemon src/app.js
```

## How to Test the API with Postman

### Register a user
- Method: **POST**
- URL: ``http://localhost:3000/api/auth/register``
- Body (JSON):
- - ``{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
}
``

### Log in
- Method: **POST**
- URL: ``http://localhost:3000/api/auth/login``
- Body (JSON):
- - ``{
    "email": "john.doe@example.com",
    "password": "password123"
}
``
- Expected Response:
- - `` {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
``

### Create an activity
- Method: **POST**
- URL: ``http://localhost:3000/api/activities``
- Headers:
- - Authorization: Bearer ``<token>``
- Body (JSON):
- - ``{
    "userId": 1,
    "categoryId": 1,
    "description": "Work on the project",
    "startTime": "2025-02-04 09:00:00",
    "endTime": "2025-02-04 11:00:00"
}
``

### List activities for a user
- Method: **GET**
- URL: ``http://localhost:3000/api/activities/1``
- Headers:
- - Authorization: Bearer ``<token>``

### Upload Media file
- Method: **POST**
- URL: ``http://localhost:3000/api/media``
- Headers:
- - Authorization: Bearer ``<token>``
- Body (Form Data):
- - ``Key: activityId -> 1``
- - ``Key: file -> <choose a file>``

### List files for an activity 
- Method: **GET**
- URL: ``http://localhost:3000/api/media/1``
- Headers:
- - Authorization: Bearer ``<token>``

## Important Note
*This project was built as a backend example and is not production-ready. Before using it in a real environment, it is necessary to:*

- Add robust validations
- Improve security (e.g., protect against SQL injection)
- Set up proper error logging

## 🙌 Acknowledgements
*Thank you for trying out this project! 😊*



# Português

## Gestor de horas (ONLY BACKEND) 

*Este projeto foi criado para testar a criação de um backend utilizando Node.js, MySQL e uma API RESTful. Ele permite a criação, consulta e gestão de atividades, bem como o upload de ficheiros de mídia relacionados.*

## Tecnologias utilizadas

- Node.js
- Express.js
- MySQL
- Multer (para uploads de ficheiros)
- JWT (para autenticação)
- Postman (para testes)

## Como configurar o projeto

### 1. Clonar o repositório:

``git clone <url-do-repositorio>
cd time_manager``

### 2. Instalar as dependências:

``npm install``

### 3. Configurar a DB MySQL:

```
CREATE DATABASE time_manager;

USE time_manager;

-- Tabela de utilizadores
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de categorias
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de atividades
CREATE TABLE activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    description TEXT,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Tabela de notas
CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    activity_id INT NOT NULL,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);

-- Tabela de uploads de mídia
CREATE TABLE media_uploads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    activity_id INT NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    media_type ENUM('image', 'video') NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);
```

### 4. Configurar o ficheiro .env:

Crie um ficheiro .env na raiz do projeto e adicione as variáveis:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=<sua_password>
DB_NAME=time_manager
JWT_SECRET=supersecretkey
```

### 5. Iniciar aplicação:

```
npx nodemon src/app.js
```

## Como testar a API com o Postman

###  Registar um utilizador.
- Método: **POST**
- URL: ``http://localhost:3000/api/auth/register``
- Corpo (Body):
- - ``{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
}``

### Fazer login.
- Método: **POST**
- URL: ``http://localhost:3000/api/auth/login``
- Corpo (Body):
- - ``{
    "email": "john.doe@example.com",
    "password": "password123"
}``

- Resposta esperada:
- - `` {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}``

### Criar uma atividade.
- Método: **POST**
- URL: ``http://localhost:3000/api/activities``
- Cabeçalho (Headers):
- - Authorization: Bearer ``<token>``
- Corpo (Body):
- - `` {
    "userId": 1,
    "categoryId": 1,
    "description": "Trabalhar no projeto",
    "startTime": "2025-02-04 09:00:00",
    "endTime": "2025-02-04 11:00:00"}``

### Listar Atividades de um Utilizador.
- Método: **GET**
- URL: ``http://localhost:3000/api/activities/1``
- Cabeçalho (Headers):
- - Authorization: Bearer ``<token>``

### Fazer upload de um ficheiro.
- Método: **POST**
- URL: ``http://localhost:3000/api/media``
- Cabeçalho (Headers):
- - Authorization: Bearer ``<token>``
- Corpo (Body - Form Data):
- - ``Key: activityId -> 1``
- - ``Key: file -> <seleciona um ficheiro>``

## Listar ficheiros de uma atividade.
- Método: **GET**
- URL: ``http://localhost:3000/api/media/1``
- Cabeçalho (Headers):
- - Authorization: Bearer ``<token>``

## Nota importante
*Este projeto foi criado apenas como um exemplo de backend e não está pronto para produção. Antes de usar num ambiente real, é necessário:*

- Adicionar validações robustas
- Melhorar a segurança (ex.: proteção contra injeção de SQL)
- Configurar logs de erros adequados

## 🙌 Agradecimentos

*Obrigado por experimentares este projeto! 😊*

