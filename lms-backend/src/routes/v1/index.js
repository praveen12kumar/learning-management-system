import express from 'express';
import {upload} from "../../middlewares/multer-middleware.js";


// auth
import { 
    signUp,
    signIn

} from '../../controllers/auth-controller.js';

// user
import {
    getProfile 
} from "../../controllers/user-controller.js";



import {authenticate} from "../../middlewares/authenticate.js";


const router = express.Router();


// auth

router.post('/signup', upload.single("avatar"),  signUp);
router.post('/signin', signIn);


// user

router.get('/profile', authenticate, getProfile);

export default router;