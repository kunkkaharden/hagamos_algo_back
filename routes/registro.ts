import { Router } from 'express';
import { body, query } from 'express-validator';
import { validator } from '../middlewares/validator';
import { addRegistro, deleteRegistro, findAll,  } from '../controllers/registro';
import { jwtStrategy } from '../middlewares/jwt-strategy';
import { checkCategorias } from '../util/checkCategorias';
import { sendLogs } from '../middlewares/send-logs';
const router: Router = Router();
router.post('/add',[
    jwtStrategy,
    body('enlace', "enlace  [4-10 caracteres]").isLength({min: 4, max: 30}),
    body('categoria').custom(checkCategorias),
    body('temporal', "temporal  boolean").isBoolean(),
    validator,
],  addRegistro );


router.get('/',[sendLogs] ,findAll );
router.delete('/',[
    jwtStrategy,
    query('enlace', "enlace  [4-10 caracteres]").isLength({min: 4, max: 30}),
    validator,
], deleteRegistro );

export default router;