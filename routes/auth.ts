import { Router } from 'express';
import { body } from 'express-validator';
import { validator } from '../middlewares/validator';
import { login, register, renew } from '../controllers/auth';
import { validateJWT } from '../middlewares/validate-jwt';
import { checkArray } from '../util/checkArray';
const router: Router = Router();

router.post('/register',[
    body('email', "Email is required").isEmail(),
    body('name', "Name is required").isLength({min: 3}),
    body('password', "Password is required. min:4").isLength({min: 4}),
    body('permits', "Permits is required. min:4").custom(checkArray),
    validator,
], register );

router.post('/login', [
    body('email', "Email is required").isEmail(),
    body('password', "Password is required. min:4").isLength({min: 4}),
    validator,
] ,login);

router.get('/renew',[validateJWT], renew );

export default router;