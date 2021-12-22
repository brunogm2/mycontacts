const { Router } = require('express');

const ContactController = require('./app/controllers/ContactController');

const router = Router();

// router.use();
router.get(
    '/contacts',
    (request, response, next) => {
        request.appId = 'MeuAppID';
        next();
    },
    ContactController.index,
    );
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', ContactController.store);
router.put('/contacts/:id', ContactController.update);


module.exports = router; 