const express = require('express');
const router = express.Router();
const { getModel, verifyRequestData, compareWithBcrypt } = require("../../config/utils")

const service = "CLIENT"
const hms = getModel()

router.get('/', async (req, res) =>{
    return res.json(service)
})

router.post('/', async (req, res) => {
    try {
        const required = ["email", "password"];
        const verify = verifyRequestData(req.body, required);

        if (!verify.isValid) {
            return res.status(400).json({ error: "Champs requis manquants", missingFields: verify.missingFields });
        }

        const { email, password } = req.body;
        const user = await hms.Utilisateur.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé." });
        }

        const isMatch = await compareWithBcrypt(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Mot de passe incorrect." });
        }

        // Générer un token ou gérer la session ici
        return res.json({ message: "Connexion réussie.", user });
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router;
