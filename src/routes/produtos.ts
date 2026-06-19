import express from "express";

const router = express.Router();

// Vetor em memória para os produtos
let produtos = [
    { id: 1, nome: "Mouse", preco: 50 },
    { id: 2, nome: "Teclado", preco: 100 }
];

// GET /produtos
router.get("/", (req, res) => {
    res.json(produtos);
});

// GET /produtos/:id
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ erro: "ID deve ser um número válido." });
        return;
    }

    const produto = produtos.find(p => p.id === id);
    if (!produto) {
        res.status(404).json({ erro: "Produto não encontrado." });
        return;
    }

    res.json(produto);
});

// POST /produtos
router.post("/", (req, res) => {
    const { nome, preco } = req.body;

    if (!nome || preco === undefined) {
        res.status(400).json({ erro: "Os campos nome e preco são obrigatórios." });
        return;
    }

    const newId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
    const newProduto = {
        id: newId,
        nome,
        preco: parseFloat(preco)
    };

    produtos.push(newProduto);
    res.status(201).json(newProduto);
});

// PUT /produtos/:id
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ erro: "ID deve ser um número válido." });
        return;
    }

    const { nome, preco } = req.body;
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        res.status(404).json({ erro: "Produto não encontrado." });
        return;
    }

    if (nome !== undefined) {
        produto.nome = nome;
    }
    if (preco !== undefined) {
        produto.preco = parseFloat(preco);
    }

    res.json(produto);
});

// DELETE /produtos/:id
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ erro: "ID deve ser um número válido." });
        return;
    }

    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
        res.status(404).json({ erro: "Produto não encontrado." });
        return;
    }

    const deletado = produtos.splice(index, 1);
    res.json({ mensagem: "Produto excluído com sucesso.", produto: deletado[0] });
});

export default router;