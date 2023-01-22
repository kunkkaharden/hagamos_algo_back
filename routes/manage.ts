import { Router } from 'express';
import { auth } from '../util/auth';
import { ValidRoles } from '../enums/ValidRoles';
import { query } from 'express-validator';
import { validator } from '../middlewares/validator';
import { payments, reset } from '../controllers/manage';
const router: Router = Router();
router.post('/reset',[
    ...auth(ValidRoles.reset),
],  reset );

router.get('/payments', [
    ...auth(ValidRoles.payments),
    query('name', "name  [1-40 caracteres]").isLength({min: 1, max: 40}),
    validator
] , payments );


export default router;