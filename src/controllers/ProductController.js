const connection = require('../connection.js');

module.exports = {
    async createProduct(req, res) {
        let { nome, descricao, preco, i_vendedor, status, quantidade } = req.body;

        const sql = `INSERT INTO produtos(nome, quantidade, descricao, preco, status, dt_sistema, i_vendedor) VALUES('${nome}', ${quantidade}, '${descricao}', ${preco}, '${status}', NOW(), ${i_vendedor})`;
        
        connection.query(sql, function (error, results){
            if(error) {
                res.status(403).json({response: 'Ocorreu um erro desconhecido'}); 
                console.log(error);
            } else{
                res.json({response: 'produto_salvo'});
            }
        });
    },

    async getProducts(req, res) {
        const sql = `SELECT * FROM produtos`;

        connection.query(sql, function (error, results){
            if(error) {
                res.status(403).json({response: 'Ocorreu um erro desconhecido'}); 
                console.log(error);
            } else{
                res.json({response: results});
            }
        });
    },


    async getProduct(req, res) {
        const { i_produto } = req.params;

        const sql = `SELECT * FROM produtos WHERE i_produto=${i_produto}` 
    }
}
