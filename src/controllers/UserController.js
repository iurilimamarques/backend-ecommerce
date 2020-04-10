const connection = require('../connection');

module.exports = {
    async createUser(req, res) {
        const { nome, email, senha } = req.body;

        const sql = `SELECT * FROM usuarios WHERE email='${email}'`;

        connection.query(sql, function (error, results){
            if(error) {
                return console.log(error);
            } else{
                if (results!='') {
                    res.json({response: 'usuario_existente'});
                }else{
                    const sql = `INSERT INTO usuarios(nome, email, senha, dt_sistema, status) VALUES ('${nome}', '${email}', '${senha}', NOW(), 'A')`;
        
                    connection.query(sql, function (error, results){
                        if(error) {
                            return console.log(error);
                        } else{
                            res.json({response: 'usuario_salvo'});
                        }
                    });
                }
            }
        });
    }
}