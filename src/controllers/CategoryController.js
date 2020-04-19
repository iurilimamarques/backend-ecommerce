const connection = require('../connection.js');

module.exports = {
    async createCategory(req, res) {
        const { nome, status } = req.body;

        const sql = `INSERT INTO categorias(nome, status, dt_sistema) VALUES('${nome}', '${status}', NOW())`;
        
        connection.query(sql, function (error, results){
            if(error) {
                res.status(403).json({response: 'Ocorreu um erro desconhecido'}); 
                console.log(error);
            } else{
                res.json({response: 'categoria_salva'});
            }
        });
    },

    async getCategories(req, res) {
        const sql = `SELECT a.i_categoria,
                            a.nome,
	                        COUNT(b.i_produto) AS count
                     FROM categorias AS a
                     INNER JOIN produtos AS b ON b.i_categoria=a.i_categoria
                     GROUP BY a.nome`;

        connection.query(sql, function (error, results){
            if(error) {
                res.status(403).json({response: 'Ocorreu um erro desconhecido'}); 
                console.log(error);
            } else{
                results = JSON.parse(JSON.stringify(results));
                res.json({response: results});
            }
        });
    }
}

