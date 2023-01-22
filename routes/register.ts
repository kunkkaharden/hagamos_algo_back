import { Router } from 'express';
import { param } from 'express-validator';
import { validator } from '../middlewares/validator';
import { end, start } from '../controllers/stay';
import { auth } from '../util/auth';
import { ValidRoles } from '../enums/ValidRoles';
const router: Router = Router();
router.post('/start/:car_plate',[
    ...auth(ValidRoles.create_stay),
    param('car_plate', "car_plate  [4-10 caracteres]").isLength({min: 4, max: 10}),
    validator,
],  start );

router.post('/end/:car_plate', [
    ...auth(ValidRoles.create_stay),
    param('car_plate', "car_plate  [4-10 caracteres]").isLength({min: 4, max: 10}),
    validator,
] , end );


export default router;