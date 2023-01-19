import { Router } from 'express';
import { check } from 'express-validator';
import { validator } from '../middlewares/validator';
import { login, register, renew } from '../controllers/auth';
const router: Router = Router();

router.post('/register',[
    check('email', "Email is required").isEmail(),
    check('name', "Name is required").isLength({min: 3}),
    check('password', "Password is required. min:4").isLength({min: 4}),
    validator,
], register );

router.post('/', [
    check('email', "Email is required").isEmail(),
    check('password', "Password is required. min:4").isLength({min: 4}),
    validator,
] ,login);

router.get('/renew', renew );

export default router;