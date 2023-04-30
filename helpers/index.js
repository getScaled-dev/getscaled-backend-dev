const jwt = require('jsonwebtoken');
const SECERET_KEY = "NOTESAPT"
const auth = async (req, res, next) => {
    try {
        console.log('middleware is running....');
        //get token from header
        let token = req.headers.authorization;
        console.log(token, '____________________')
        token = token.split(" ");
        const decodeedToken = jwt.verify(token[1], SECERET_KEY);
        console.log(decodeedToken, 'decoded token')
        //verify
        if (1 == 2) {
            next()
        }
        return res.status(401).send('Invalid token');
    } catch (err) {
        console.log(err)
    }
}

module.exports = auth