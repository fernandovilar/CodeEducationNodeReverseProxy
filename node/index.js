const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql');


//20
const nomes = ['Miguel',
'Arthur',
'Bernardo',
'Heitor',
'Davi',
'Lorenzo',
'Théo',
'Pedro',
'Gabriel',
'Enzo',
'Sophia',
'Helena',
'Valentina',
'Laura',
'Isabella',
'Manuela',
'Júlia',
'Heloísa',
'Luiza',
'Fernando'];

// 15
sobrenomes = ['Silva',
'Santos',
'Oliveira',
'Souza',
'Rodrigues',
'Ferreira',
'Alves',
'Pereira',
'Lima',
'Gomes',
'Costa',
'Ribeiro',
'Martins',
'Carvalho',
'Vilar'
];

getRamdom = function(max){
    return Math.floor(Math.random() * max);
}

getNewName = function(){
    return nomes[getRamdom(20)] + ' ' + sobrenomes[getRamdom(15)]
        + ' ' + sobrenomes[getRamdom(15)];
}

app.get('/', (req, res) => {
    console.log('inicio')
    const connection = mysql.createConnection(config);
    const sql = `INSERT INTO people(name) VALUES (?)`;
    connection.query(sql, [getNewName()]);
    console.log('inserido nome')
    connection.query('SELECT name FROM people ORDER BY name',
        function (err, results, fields) {
            if (err) throw err;            
            var conteudo = '<h1>Full Cycle Rocks!</h1><ul>';
            for (i = 0; i < results.length; i++) {
                conteudo += ('<li>' + results[i].name + '</li>');
                console.log('Row: ' + JSON.stringify(results[i]));
            }            
            conteudo += '</ul>';
            console.log(conteudo);
            res.send(conteudo)
            console.log('fim consulta');
        })
    console.log('fim')
    connection.end();

})

app.listen(port, () => {
    console.log('Servidor na porta: ' + port)
})

