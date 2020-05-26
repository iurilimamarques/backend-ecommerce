const connection = require('../connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv-safe');

dotenv.config();

module.exports = {
    async createUser(req, res) {
        let { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(422).json({response: 'Necessario o preenchimento de todos os dados'});
        }

        const sql = `SELECT * FROM usuarios WHERE email='${email}'`;

        connection.query(sql, function (error, results){
            if(error) {
                res.status(403).json({response: 'Ocorreu um erro desconhecido'}); 
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
                            res.status(403).json({response: 'Ocorreu um erro desconhecido'}); 
                            console.log(error);
                        } else{
                            res.json({response: 'usuario_salvo'});
                        }
                    });
                }
            }
        });
    },

    async loginUser(req, res) {
        let { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(422).json({ response: 'Necessario o preenchimento de todos os dados' });
        }

        const sql = `SELECT * FROM usuarios WHERE email='${email}'`;

        connection.query(sql, function (error, results){
            if(error) {
                res.status(403).json({response: 'Ocorreu um erro desconhecido'}); 
                console.log(error);
            } else{
                if (results!='') {
                    results = results[0];              
                                    
                    if(bcrypt.compareSync(senha, results.senha)) {
                        const { nome, email } = results;
                        const token = jwt.sign({ nome, email }, process.env.SECRET, {
                            expiresIn: 1200 // expires in 20min
                        });

                        res.status(200).send({ auth: true, token: token });
                    }else{
                        res.status(422).json({ response: 'credenciais_incorreta' });
                    }
                }else{
                    res.status(422).json({ response: 'usuario_inexistente'});
                }
            }
        });
    }
}