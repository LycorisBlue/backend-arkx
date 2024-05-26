const express = require('express');
const router = express.Router();
const { getModel, verifyRequestDataForUpdate } = require("../../config/utils")

const service = "CLIENT"
const hms = getModel()

router.get('/', async (req, res) => {
    return res.json(service)
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const allowed = ["name", "lastname", "numero", "adresse"]
        const verify = verifyRequestDataForUpdate(updateData, allowed)

        if(!verify.isValid){
            return res.status(400).json({ error: "Champs non allouée", missingFields: verify.invalidFields });
        }

        // Aucun champ n'est obligatoirement requis pour une mise à jour partielle
        const user = await hms.Utilisateur.update(updateData, { where: { id } });
        if(user[0] == 0){
            return res.status(404).json({ error: "Utilisateur non trouvé." });
        }
        return res.json({ message: "Utilisateur mis à jour avec succès.", data: updateData });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;