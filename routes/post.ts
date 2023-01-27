import { loadData } from '../controllers/post';
import { Router } from 'express';
import { query } from 'express-validator';
import { validator } from '../middlewares/validator';
const router: Router = Router();
router.get('/',[
    query('enlace', "enlace  [4-10 caracteres]").isLength({min: 4, max: 30}),
    validator,
],  loadData );

export default router;