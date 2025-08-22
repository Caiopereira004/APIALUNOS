// importa a biblioteca
const express = require("express"); // express = framework web

// cria a aplicação express
const app = express();

app.use(express.json()); // json = 

const PORT = 3000

const ALUNOS = [
    {
        id: 1, nome: "Caio Pereira", cor: "Azul", idade: 16
    },
    {
        id: 2,nome: "Yasmin Letícia", cor: "Roxo", idade: 16
    },
    {
        id: 3, nome: "Yago Murilo", cor: "Preto", idade: 16
    }
]

app.get("/", (req, res)=>{
    res.json({
        msg: "Hello world"
    })
})

app.get("/alunos",(req, res) =>{
    res.json(ALUNOS);
})

app.get("/alunos/:id", (req, res)=>{

    const id = Number(req.params.id)
    console.log(`Valor recebido${id}`);

    const aluno = ALUNOS.filter( (aluno) => aluno.id === id )
    if(aluno.length >= 1){
        res.status(200).json(aluno)
    }else{
        res.status(404).json({ msg: "Aluno não encontrado"})
    }
    })

app.get("/alunos/:cor", (req, res) =>{
    const cor = req.params.cor.toLowerCase();
    console.log(`Cor recebida: ${cor}`);
    const alunosFiltrados = ALUNOS.filter(
        (aluno) => aluno.cor.toLowerCase() === cor
    );
    if (alunosFiltrados.lenght > 0){
        res.status(200).json(alunosFiltrados);
    }else[
        res.status(404).json({ msg: "Nenhum aluno encontrado com essa cor"})
    ]
});



app.listen(PORT, ()=> {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
}) // => = function

app.post("/alunos", (req, res)=>{
    const {nome, cor, idade} = req.body;

    if(!nome || !cor || !idade){
        return res.status(400).json({msg : "Nome cor e idade são obrigatórios"})
    }
    const novoAluno = {
        nome, cor, idade
    }

    const id = ALUNOS.lenght > 0 ? ALUNOS[ALUNOS.lenght - 1].id + 1 : 1

    console.log(novoAluno)
    ALUNOS.push(novoAluno)
    res.status(201).json({mensagem: "Aluno criado com sucesso"})
})

app.delete("/alunos/:id", (req, res)=>{
    const id = Number(req.params.id);
    const indice = ALUNOS.findIndex(aluno => aluno.id === id)

    if (indice === -1){
        return res.status(404).json({
            msg: "Aluno não encontrado ou já foi deletado"
        })
    }
    console.log(indice);
    ALUNOS.splice(indice, 1);
    res.status(204).json({msg: "Deletado com sucesso"});
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
