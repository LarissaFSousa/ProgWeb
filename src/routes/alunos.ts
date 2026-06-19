import express from "express";

const router = express.Router();

// Vetor em memória para os alunos
let alunos = [
    { id: 1, nome: "João", curso: "Informática" }
];

// GET /alunos
router.get("/", (req, res) => {
    res.json(alunos);
});

// GET /alunos/:id
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ erro: "ID deve ser um número válido." });
        return;
    }

    const aluno = alunos.find(a => a.id === id);
    if (!aluno) {
        res.status(404).json({ erro: "Aluno não encontrado." });
        return;
    }

    res.json(aluno);
});

// POST /alunos
router.post("/", (req, res) => {
    const { nome, curso } = req.body;

    if (!nome || !curso) {
        res.status(400).json({ erro: "Os campos nome e curso são obrigatórios." });
        return;
    }

    const newId = alunos.length > 0 ? Math.max(...alunos.map(a => a.id)) + 1 : 1;
    const newAluno = {
        id: newId,
        nome,
        curso
    };

    alunos.push(newAluno);
    res.status(201).json(newAluno);
});

// Função auxiliar para atualizar aluno por ID
const updateAlunoById = (id: number, nome: string | undefined, curso: string | undefined, res: any) => {
    const aluno = alunos.find(a => a.id === id);
    if (!aluno) {
        res.status(404).json({ erro: "Aluno não encontrado." });
        return;
    }

    if (nome !== undefined) {
        aluno.nome = nome;
    }
    if (curso !== undefined) {
        aluno.curso = curso;
    }

    res.json(aluno);
};

// PUT /alunos/:id (Padrão REST)
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ erro: "ID deve ser um número válido." });
        return;
    }

    const { nome, curso } = req.body;
    updateAlunoById(id, nome, curso, res);
});

// PUT /alunos (Com ID no corpo da requisição)
router.put("/", (req, res) => {
    const { id, nome, curso } = req.body;
    const parsedId = parseInt(id, 10);

    if (id === undefined || isNaN(parsedId)) {
        res.status(400).json({ erro: "ID é obrigatório no corpo da requisição para atualizar o aluno." });
        return;
    }

    updateAlunoById(parsedId, nome, curso, res);
});

// Função auxiliar para excluir aluno por ID
const deleteAlunoById = (id: number, res: any) => {
    const index = alunos.findIndex(a => a.id === id);
    if (index === -1) {
        res.status(404).json({ erro: "Aluno não encontrado." });
        return;
    }

    const deletado = alunos.splice(index, 1);
    res.json({ mensagem: "Aluno excluído com sucesso.", aluno: deletado[0] });
};

// DELETE /alunos/:id (Padrão REST)
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ erro: "ID deve ser um número válido." });
        return;
    }

    deleteAlunoById(id, res);
});

// DELETE /alunos (Com ID no corpo ou na query)
router.delete("/", (req, res) => {
    const bodyId = req.body.id;
    const queryId = req.query.id;
    const id = bodyId !== undefined ? bodyId : queryId;
    const parsedId = parseInt(id, 10);

    if (id === undefined || isNaN(parsedId)) {
        res.status(400).json({ erro: "ID é obrigatório no corpo ou query da requisição para excluir o aluno." });
        return;
    }

    deleteAlunoById(parsedId, res);
});

export default router;
