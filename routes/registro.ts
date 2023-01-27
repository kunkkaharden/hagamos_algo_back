import { Router } from 'express';
import { body } from 'express-validator';
import { validator } from '../middlewares/validator';
import { addRegistro, deleteRegistro, findAll,  } from '../controllers/registro';
import { jwtStrategy } from 'middlewares/jwt-strategy';
import { checkCategorias } from 'util/checkCategorias';
const router: Router = Router();
router.post('/add',[
    jwtStrategy,
    body('enlace', "enlace  [4-10 caracteres]").isLength({min: 4, max: 30}),
    body('categoria').custom(checkCategorias),
    body('temporal', "temporal  boolean").isBoolean(),
    validator,
],  addRegistro );


router.get('/', findAll );
router.delete('/',[jwtStrategy], deleteRegistro );

export default router;