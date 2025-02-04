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

###  Registar um utilizador:
- Método: **POST**
- URL: ``http://localhost:3000/api/auth/register``
- Corpo (Body)
- - ``{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
}``
