import { Router } from 'express';
import { body, param } from 'express-validator';
import { validator } from '../middlewares/validator';
import { auth } from '../util/auth';
import { ValidRoles } from '../enums/ValidRoles';
import { createCar, deleteCar, findAll, findOne } from '../controllers/cars';
import { checkTypeCars } from '../util/checkTypeCars';
const router: Router = Router();
router.post('/',[
    ...auth(ValidRoles.create_car),
    body('car_plate', "car_plate  [4-10 caracteres]").isLength({min: 4, max: 10}),
    body('type').custom(checkTypeCars),
    validator,
], createCar );

router.delete('/:id',[
    ...auth(ValidRoles.create_car),
    param('id', 'Id is required and has to be a MongoID').isMongoId(),
    validator,
], deleteCar );

router.get('/:id',[
    ...auth(),
    param('id', 'Id is required and has to be a MongoID').isMongoId(),
    validator,
], findOne );

router.get('/',[...auth()], findAll );
router.patch('/:id',[
    ...auth(ValidRoles.create_car),
    param('id', 'Id is required and has to be a MongoID').isMongoId(),
    body('car_plate', "car_plate  [4-10 caracteres]").isLength({min: 4, max: 10}),
    validator,
], findAll );



export default router;