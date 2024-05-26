const express = require('express');
const router = express.Router();
const { getModel, verifyRequestData, cryptWithBcrypt } = require("../../config/utils")

const service = "CLIENT"
const hms = getModel()

router.get('/', async (req, res) =>{
    return res.json(service)
})

router.post('/', async (req, res) => {
    try {

        const required = ["name", "lastname", "password", "numero", "adresse"]
        const verify = verifyRequestData(req.body, required)

        if(!verify.isValid){
            return res.status(400).json({ error: "Champs requis manquants", missingFields: verify.missingFields });
        }


        const { name, lastname, email, password, numero, adresse } = req.body;

        const hashedPassword = await cryptWithBcrypt(password);
        console.log(hashedPassword)
        const user = await hms.Utilisateur.create({ name, lastname, email, password: hashedPassword, numero, adresse, enable: 1, delete: 0 });
        return res.status(201).json(user);
    } catch (error) {
        res.status(400).send(error);
    }
}
)

module.exports = router;
