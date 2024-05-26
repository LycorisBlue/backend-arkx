const express = require('express');
const router = express.Router();
const { getModel, verifyRequestData, cryptWithBcrypt } = require("../../config/utils")

const service = "CLIENT"
const hms = getModel()

router.get('/', async (req, res) =>{
    return res.json(service)
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await hms.Utilisateur.update({ delete: 1 }, { where: { id } });

        if(user[0] == 0){
            return res.status(404).json({ error: "Utilisateur non trouvé." });
        }
        res.json({ message: "Utilisateur supprimé (soft delete)." });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;