const connection = require('../connection');
const bcrypt = require('bcryptjs');

module.exports = {
    async createUser(req, res) {
        let { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            res.status(422).json({response: 'Necessario o preenchimento de todos os dados'});
        }

        const sql = `SELECT * FROM usuarios WHERE email='${email}'`;

        connection.query(sql, function (error, results){
            if(error) {
                return res.status(403).json({response: 'Ocorreu um erro desconhecido'}); 
                console.log(error);
            } else{
                if (results!='') {
                    res.json({response: 'usuario_existente'});
                }else{
                    const salt = bcrypt.genSaltSync(10);
                    senha = bcrypt.hashSync(senha, salt);
                    
                    const sql = `INSERT INTO usuarios(nome, email, senha, dt_sistema, status) VALUES ('${nome}', '${email}', '${senha}', NOW(), 'A')`;
        
                    connection.query(sql, function (error, results){
                        if(error) {
                            return res.status(403).json({response: 'Ocorreu um erro desconhecido'}); 
                            console.log(error);
                        } else{
                            res.json({response: 'usuario_salvo'});
                        }
                    });
                }
            }
        });
    }
}