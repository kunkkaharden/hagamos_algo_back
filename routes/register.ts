import { Router } from 'express';
import { param } from 'express-validator';
import { validator } from '../middlewares/validator';
import { end, findAll, findOne, start } from '../controllers/stay';
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

router.get('/:id',[
    ...auth(),
    param('id', 'Id is required and has to be a MongoID').isMongoId(),
    validator,
], findOne );

router.get('/',[...auth()], findAll );

export default router;