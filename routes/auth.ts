import { Router } from 'express';
import { body, param } from 'express-validator';
import { validator } from '../middlewares/validator';
import { activeUser, deleteUser, findAll, findOne,
         login, register, renew, resetPassword, updateUser } from '../controllers/auth';
import { checkArray } from '../util/checkArray';
import { auth } from '../util/auth';
import { ValidRoles } from '../enums/ValidRoles';
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

router.get('/:id',[
    ...auth(),
    param('id', 'Id is required and has to be a MongoID').isMongoId(),
    validator,
], findOne );

router.get('/',[...auth()], findAll );

router.delete('/:id',[
    ...auth(ValidRoles.create_user),
    param('id', 'Id is required and has to be a MongoID').isMongoId(),
    validator,
], deleteUser );

router.patch('/active/:id',[
    ...auth(ValidRoles.create_user),
    param('id', 'Id is required and has to be a MongoID').isMongoId(),
    validator,
], activeUser );

router.patch('/reset-password/:id', [
    ...auth(ValidRoles.create_user),
    param('id', 'Id is required and has to be a MongoID').isMongoId(),
    body('password', "Password is required. min:4").isLength({min: 4}),
    validator,
], resetPassword);

router.patch('/:id', [
    ...auth(ValidRoles.create_user),
    param('id', 'Id is required and has to be a MongoID').isMongoId(),
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Email is required').isEmail(),
    body('permits').custom(checkArray),
    validator,
], updateUser);

export default router;