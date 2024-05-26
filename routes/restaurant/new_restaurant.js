const express = require('express');
const router = express.Router();
const { getModel, verifyRequestData } = require("../../config/utils")

const service = "RESTAURANT"
const hms = getModel()

router.get('/', async (req, res) =>{
    return res.json(service)
})

router.post('/', async (req, res) => {


    const required = ["key", "name", "adresse", "description", "numero", "email", "heure_ouverture", "heure_fermeture", "localisation"];
    const verify = verifyRequestData(req.body, required)

    if(!verify.isValid){
        return res.status(400).json({ error: "Champs requis manquants", missingFields: verify.missingFields });
    }

    const { key, name, adresse, description, numero, email, heure_ouverture, heure_fermeture, localisation } = req.body;

    try {
        // Vérifier si un restaurant avec la même clé existe déjà


        const existingRestaurant = await hms.Restaurant.findOne({ where: { key } });
        if (existingRestaurant) {
            return res.status(409).json({ message: "Un restaurant avec cette clé existe déjà." });
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
    
        // Mettre à jour le champ 'statut' pour désactiver la PassKey
        await passKey.update({ statut: 1 });

        // Créer un nouveau restaurant
        const newRestaurant = await hms.Restaurant.create({
            key,
            name,
            adresse,
            description,
            numero,
            email,
            heure_ouverture,
            heure_fermeture,
            localisation,
            enable: 1, // Activer par défaut
            delete: 0  // Non supprimé par défaut
        });

        return res.status(201).json({ message: "Restaurant enregistré avec succès.", restaurant: newRestaurant });
    } catch (error) {
        console.error("Erreur lors de l'enregistrement du restaurant :", error);
        return res.status(500).json({ message: "Erreur lors de l'enregistrement du restaurant" });
    }
});

module.exports = router;

