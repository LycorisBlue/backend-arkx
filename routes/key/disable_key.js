const express = require('express');
const router = express.Router();
const { getModel, generateCode } = require("../../config/utils")

const service = "PASSKEY"
const hms = getModel()

router.get('/', async (req, res) =>{
    return res.json(service)
})

router.put('/:key', async (req, res) => {
    const key = req.params.key;
  
    try {
      // Rechercher la PassKey par sa clé
      const passKey = await hms.PassKey.findOne({ where: { key } });
  
      if (!passKey) {
        // Si aucune PassKey correspondante n'est trouvée
        return res.status(404).json({ message: "PassKey non trouvée." });
      }
  
      // Mettre à jour le champ 'enable' pour désactiver la PassKey
      await passKey.update({ enable: 0 });
  
      return res.json({ message: "PassKey désactivée avec succès.", id: passKey.key });
    } catch (error) {
      // Gestion des erreurs
      console.error("Erreur lors de la désactivation de la PassKey :", error);
      return res.status(500).json({ message: "Erreur lors de la désactivation de la PassKey" });
    }
  }
);

module.exports = router;
