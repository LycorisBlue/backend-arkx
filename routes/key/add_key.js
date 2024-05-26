const express = require('express');
const router = express.Router();
const { getModel, generateCode } = require("../../config/utils")

const service = "PASSKEY"
const hms = getModel()

router.get('/', async (req, res) =>{
    return res.json(service)
})

router.post('/', async (req, res) => {
    try {
      // Définissez la clé par défaut et les autres champs requis
      const defaultKey = generateCode();
      const newPassKey = await hms.PassKey.create({
        key: defaultKey,
        statut: 0, // Supposons que 1 est le statut actif, ajustez selon votre logique
        enable: 1  // Supposons que 1 signifie "activé", ajustez selon votre logique
      });
  
      // Réponse de succès avec l'objet PassKey créé
      res.status(201).json(newPassKey);
    } catch (error) {
      // Gestion des erreurs
      console.error("Erreur lors de la création de la PassKey :", error);
      res.status(500).json({ message: "Erreur lors de la création de la PassKey" });
    }
  }
);

module.exports = router;
