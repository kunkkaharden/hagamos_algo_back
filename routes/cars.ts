import { Router } from 'express';
import { body } from 'express-validator';
import { validator } from '../middlewares/validator';
import { auth } from '../util/auth';
import { ValidRoles } from '../enums/ValidRoles';
import { get_all_official, register_official, register_resident } from '../controllers/cars';
const router: Router = Router();
router.post('/official',[
    ...auth(ValidRoles.create_car),
    body('car_plate', "car_plate  [4-10 caracteres]").isLength({min: 4, max: 10}),
    validator,
], register_official );

router.post('/resident', [
    ...auth(ValidRoles.create_car),
    body('car_plate', "car_plate  [4-10 caracteres]").isLength({min: 4, max: 10}),
    validator,
] , register_resident );

router.get('/official',[...auth()], get_all_official );
// router.get('/:id',[...auth()], renew );

export default router;