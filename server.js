const mysql = require('mysql2');
const express = require('express');

const app = express();

//configuração do banco de dados

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'mae85903007',
    database: 'mysql',
    
});

//conectar ao banco de daos

connection.connect((err) => {
    if(err){
        console.log('Erro ao conectar ao banco de dados', err);
    }else{
        console.log('Conexão bem sucessida ao banco de dados');
    }
});

// //Operação DDL: criar uma tabela

const creteTableQuery = ` 
    CREATE TABLE IF NOT EXISTS usuários ( 
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL
    )
`;

connection.query(creteTableQuery, (err) => {
    if(err){
        console.log('Erro ao criar tabela:, err');
    }else{
        console.log('Tabela criada com sucesso.');
    }
});

// //Operação DML: inserir um registro

const insertQuery = `
    INSERT INTO usuários (nome, email)
    VALUES ('João', 'joão@teste.com' )
`;

connection.query(insertQuery, (err) => {
    if(err){
        console.log('Erro ao inserir registro:', err);
    }else{
        console.log('Registro inserido com sucesso.')
    }
});

app.get('/usuários', (req, res) =>{
    // Operação DML: Selecionar todos os registros
    const selectQuery = 'SELECT * FROM usuários'

    connection.query (selectQuery, (err, results) => {
        if(err){
            console.error('Erro ao buscar registros:',  err);
                res.status(500).json({error: 'Erro ao buscar registros.'});
        }else{
           res.json(results);
        }
    });
});

app.listen(3306, ()=>{
    console.log('Servidor iniciado na porta 3000,');
});