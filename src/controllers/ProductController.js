const connection = require('../connection.js');

const separar = (base, max) => {    
    let idx = 0;
    result = [];

    while (idx < base.length) {
        if (idx % max === 0) result.push([]);
        result[result.length - 1].push(base[idx++]);
    }

    return result;
}

module.exports = {
    async createProduct(req, res) {
        let { nome, descricao, preco, i_vendedor, status, quantidade, i_categoria } = req.body;

        const sql = `INSERT INTO produtos(nome, quantidade, descricao, preco, status, dt_sistema, i_vendedor, i_categoria) VALUES('${nome}', ${quantidade}, '${descricao}', ${preco}, '${status}', NOW(), ${i_vendedor}, ${i_categoria})`;
        
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
        const { searchTerm, categorie } = req.query;        
        let filter = '';
                
        if (searchTerm!='' && searchTerm!=undefined) {            
            filter = `WHERE nome LIKE '%${searchTerm}%'`;
        }else if (categorie!=undefined && categorie!='') {            
            if (filter!='') {
                filter = filter + ` AND i_categoria=${categorie}`;
            }else{
                filter = `WHERE i_categoria=${categorie}`;
            }
        }

        sql = `SELECT * FROM produtos ${filter}`;        
        
        connection.query(sql, function (error, results){
            if(error) {
                res.status(403).json({response: 'Ocorreu um erro desconhecido'}); 
                console.log(error);
            } else{
                results = JSON.parse(JSON.stringify(results));                                
                res.json({ response: separar(results, 4) });
            }
        });
    },


    async getProduct(req, res) {
        const { i_produto } = req.params;

        const sql = `SELECT * FROM produtos WHERE i_produto=${i_produto}` 
    }
}
