import { Router } from 'express';
import { auth } from '../util/auth';
import { ValidRoles } from '../enums/ValidRoles';
import { payments, reset } from '../controllers/manage';
const router: Router = Router();
router.post('/reset',[
    ...auth(ValidRoles.reset),
],  reset );

router.get('/payments', [
    // ...auth(ValidRoles.payments),
] , payments );


export default router;