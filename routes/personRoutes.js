const Person = require('../models/Person')

const router = require('express').Router()

// Create - criação de dados
router.post('/', async (req, res) => {
    
    // req.body
    const {name, salary, approved} = req.body

    if(!name) {
        res.status(422).json({message: 'Não foi possível cadastrar o usuário'})
        return
    }

    const person = {
        name,
        salary,
        approved
    }

    // create
    try {
        
        // criando dados
        await Person.create(person)

        res.status(201).json({message: "Pessoa inserida no sistema com sucesso!"})

    } catch (error) {
        res.status(500).json({error: error})
    }

})

// Read - Leitura de dados
router.get('/person', async (req, res) => {
    try {
        
        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {

    // extrair o dado da requisição, pela url = req.params

    const id = req.params.id

    try {
        
        const person = await Person.findOne({_id: id})

        if (!person) {
            res.status(422).json({message: "O usuário não foi encontrado"})
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error})
    }

})

// Update - atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved
    }

    try {

        const udpatedPerson = await Person.updateOne({_id: id}, person)

        if(udpatedPerson.matchedCount === 0) {
            res.status(422).json({message: "Usuário não foi encontrado"})
            return
        }

        res.status(200).json(person)

    } catch(error) {
        res.status(500).json({error: error})
    }

})

// Delete - deletar dados

router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const person = await Person.findOne({_id: id})

            if (!person) {
                res.status(422).json({message: 'O usuário não foi encontrado'})
                return
            }
})

module.exports = router