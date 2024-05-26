const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { getModel, verifyRequestData } = require("../../config/utils")

const service = "PLAT"
const hms = getModel()

// Configuration de Multer
// Définit le dossier de destination et le nom du fichier
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/') // Assurez-vous que ce dossier existe
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

router.get('/', async (req, res) =>{
    return res.json(service)
})

router.post('/', upload.single('image'), async (req, res) => { // 'image' est le nom du champ dans le formulaire

    const key = req.headers.idkey

    if (!key) {
        return res.status(404).json({ message: "Aucune clé liée !" });
    }

    // const required = ["id_restaurant", "name", "description", "price", "category"];
    // const verify = verifyRequestData(req.body, required)

    const passKey = await hms.PassKey.findOne({ where: { key } });
  
    if (!passKey) {
      return res.status(404).json({ message: "PassKey non trouvée." });
    }

    if (passKey.enable == 0) {
        return res.status(404).json({ message: "PassKey non valide !." });
    }

    // if(!verify.isValid){
    //     return res.status(400).json({ error: "Champs requis manquants", missingFields: verify.missingFields });
    // }

    const { id_restaurant, name, description, price, category } = req.body;

    try {
        const restaurant = await hms.Restaurant.findOne({ where: { id: id_restaurant, enable: 1, delete: 0 } });
        if (!restaurant) {
          return res.status(404).json({ message: "Restaurant non trouvé ou non actif." });
        }

        if(restaurant.key != key){
            return res.status(409).json({ message: "La clé utiliser ne correspond pas au restaurant !" });
        }
    
        const existingPlat = await hms.Plat.findOne({ where: { name, id_restaurant } });
        if (existingPlat) {
          return res.status(409).json({ message: "Un plat avec ce nom existe déjà dans ce restaurant." });
        }

        // Création du plat avec l'URL de l'image si l'upload a réussi
        const imageUrl = req.file ? req.file.path : ''; // Ajouter l'URL de l'image au plat
        const newPlat = await hms.Plat.create({ 
          id_restaurant, 
          name, 
          description, 
          price, 
          category, 
          imageUrl, // Assurez-vous que votre modèle Plat peut accepter ce champ
          enable: 1, 
          delete: 0 
        });
        return res.status(201).json({ message: "Plat créé avec succès.", plat: newPlat });
      } catch (error) {
        console.error("Erreur lors de la création du plat :", error);
        return res.status(500).json({ message: "Erreur lors de la création du plat" });
      }
});

module.exports = router;