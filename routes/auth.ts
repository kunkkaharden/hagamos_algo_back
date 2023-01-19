import { Router } from 'express';
import { check } from 'express-validator';
import { validator } from '../middlewares/validator';
import { login, register, renew } from '../controllers/auth';
import { validateJWT } from '../middlewares/validate-jwt';
const router: Router = Router();

router.post('/register',[
    check('email', "Email is required").isEmail(),
    check('name', "Name is required").isLength({min: 3}),
    check('password', "Password is required. min:4").isLength({min: 4}),
    check('permits', "Permits is required. min:4").isLength({min: 4}),
    validator,
], register );

router.post('/login', [
    check('email', "Email is required").isEmail(),
    check('password', "Password is required. min:4").isLength({min: 4}),
    validator,
] ,login);

router.get('/renew',[validateJWT], renew );

export default router;