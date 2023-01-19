import { Router } from 'express';
import { body } from 'express-validator';
import { validator } from '../middlewares/validator';
import { login, register, renew } from '../controllers/auth';
import { checkArray } from '../util/checkArray';
import { auth } from '../util/auth';
import { ValidRoles } from '../util/ValidRoles';
const router: Router = Router();
router.post('/register',[
    ...auth(ValidRoles.create_user),
    body('email', "Email is required").isEmail(),
    body('name', "Name is required").isLength({min: 3}),
    body('password', "Password is required. min:4").isLength({min: 4}),
    body('permits').custom(checkArray),
    validator,
], register );

router.post('/login', [
    body('email', "Email is required").isEmail(),
    body('password', "Password is required. min:4").isLength({min: 4}),
    validator,
] ,login);

router.get('/renew',[...auth()], renew );

export default router;