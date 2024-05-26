const express = require('express');
const router = express.Router();
const { getModel, verifyRequestDataForUpdate } = require("../../config/utils")

const service = "RESTAURANT"
const hms = getModel()

router.get('/', async (req, res) => {
    return res.json(service)
})

router.put('/:key', async (req, res) => {
    const key = req.params.key;
    const updateData = req.body;

    try {

        const allowed = ["name", "adresse", "description", "numero", "email", "heure_ouverture", "heure_fermeture", "localisation"]
        const verify = verifyRequestDataForUpdate(updateData, allowed)
    
        if(!verify.isValid){
            return res.status(400).json({ error: "Champs non allouée", missingFields: verify.invalidFields });
        }

        const passKey = await hms.PassKey.findOne({ where: { key } });
  
        if (!passKey) {
          // Si aucune PassKey correspondante n'est trouvée
          return res.status(404).json({ message: "PassKey non trouvée." });
        }

        if (passKey.enable == 0) {
            // Si aucune PassKey correspondante n'est trouvée
            return res.status(404).json({ message: "PassKey non valide !." });
        }

        // Rechercher le restaurant par sa clé
        const restaurant = await hms.Restaurant.findOne({ where: { key } });

        if (!restaurant) {
            // Si aucun restaurant correspondant n'est trouvé
            return res.status(404).json({ message: "Restaurant non trouvé." });
        }

        // Mettre à jour le restaurant avec les données fournies
        await restaurant.update(updateData);

        return res.json({ message: "Restaurant mis à jour avec succès.", restaurant: restaurant });
    } catch (error) {
        // Gestion des erreurs
        console.error("Erreur lors de la mise à jour du restaurant :", error);
        return res.status(500).json({ message: "Erreur lors de la mise à jour du restaurant" });
    }
});

module.exports = router;
