const express = require('express');
const {Sequelize} = require("sequelize")
const router = express.Router();
const { getModel, verifyRequestDataForUpdate } = require("../../config/utils")

const service = "PLAT"
const hms = getModel()

router.get('/', async (req, res) => {
    return res.json(service)
})

router.put('/:id_restaurant/:platId', async (req, res) => {

    const key = req.headers.idkey

    if (!key) {
        // Si aucune PassKey correspondante n'est trouvée
        return res.status(404).json({ message: "Aucune clé liée !" });
    }

    const passKey = await hms.PassKey.findOne({ where: { key } });

    if (!passKey) {
        // Si aucune PassKey correspondante n'est trouvée
        return res.status(404).json({ message: "PassKey non trouvée." });
    }

    if (passKey.enable == 0) {
        return res.status(404).json({ message: "PassKey non valide !." });
    }


    const allowed = ["name", "description", "price", "category"]
    const updateData = req.body;
    const verify = verifyRequestDataForUpdate(updateData, allowed)

    if (!verify.isValid) {
        return res.status(400).json({ error: "Champs non allouée", missingFields: verify.invalidFields });
    }


    const { platId, id_restaurant } = req.params; // Assumant que l'ID du plat à mettre à jour est passé dans l'URL
    const { name, description, price, category } = req.body;

    try {
        const restaurant = await hms.Restaurant.findOne({ where: { id: id_restaurant, enable: 1, delete: 0 } });
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant non trouvé ou non actif." });
        }

        if (restaurant.key != key) {
            return res.status(409).json({ message: "La clé utiliser ne correspond pas au restaurant !" });
        }

        const existingPlat = await hms.Plat.findOne({ where: { id: platId, id_restaurant } });
        if (!existingPlat) {
            return res.status(404).json({ message: "Plat non trouvé." });
        }


        const duplicateNamePlat = await hms.Plat.findOne({ where: { name, id_restaurant, id: { [Sequelize.Op.ne]: platId } } });
        if (duplicateNamePlat) {
            return res.status(409).json({ message: "Un autre plat avec ce nom existe déjà dans ce restaurant." });
        }

        await existingPlat.update({ name, description, price, category });
        return res.json({ message: "Plat mis à jour avec succès.", plat: existingPlat });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du plat :", error);
        return res.status(500).json({ message: "Erreur lors de la mise à jour du plat" });
    }
}
);

module.exports = router;