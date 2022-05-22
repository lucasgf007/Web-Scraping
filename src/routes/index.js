const Router = require('express')
const router = Router()
// export controlles
const { Rasp } = require('../controllers/Raspagem')
const { index, faq } = require('../controllers/Inicio')

// rotas
router.get('/', index)
router.post('/raspagem', Rasp)
router.get('/faq', faq)


//export
module.exports.router = router