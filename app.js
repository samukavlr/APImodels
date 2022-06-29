const express = require('express');
const app = express();
const Categories = require('./models/Categories');
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get("/", function (request, response) {
    response.send("Serviço API Rest iniciada...");
})
////// LISTA /////////
app.get("/categories", async (req, res) =>{
    await Categories.findAll({
        attributes: ['id', 'name', 'description', ],
        order:[['name', 'ASC']]
    })
    .then( (categorias) =>{
        return res.json({
            erro: false,
            categorias
        });
    }).catch( (err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err} ou Nenhuma categoria Encontrada!!!`
        })
    })

})
/////// MOSTRAR /////
app.get('/categories/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await User.findAll({ where: {id: id}})
        const categorias = await User.findByPk(id);
        if(!categorias){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum Usuário encontrado!"
            })
        }
        res.status(200).json({
            erro:false,
            categorias
        })
    } catch (err){
        res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err}`
        })
    }
})
////////Criar///////
app.post("/categories", async (req, res) =>{
    const {name, id,  description } = req.body;
    await Categories.create(req.body)
    .then( ()=>{
        return res.json({
            erro:false,
            mensagem: 'Categoria cadastrada com sucesso'
        });
    }).catch( (err)=>{
        return res.status(400).json({
            erro:true,
            mensagem: `Erro: Categoria não cadastrada... ${err}`

        })
    })
})
/////ALTERAR//////
app.put("/categories", async (req, res) => {
    const { id } = req.body;

    await Categories.update(req.body, {where: {id}})
    .then(() => {
        return res.json({
            erro:false,
            mensagem: 'Categoria alterado com sucesso!'
        })
    }).catch( (err) =>{
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: Categoria não alterado ...${err}`
        })
    })
})
app.delete("/categories/:id", async (req, res) => {
    const { id } = req.params;
    await Categories.destroy({ where: {id}})
    .then( () => {
        return res.json({
            erro: false,
            mensagem: "Categoria apagado com sucesso!"
        })
    }).catch( (err) =>{
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err} Categoria não apagado...`
        })
    })
})





app.listen(process.env.PORT,()=>{
    console.log(`Servidor inicado na porta ${process.env.PORT}http://localhost:${process.env.PORT} `)
})

