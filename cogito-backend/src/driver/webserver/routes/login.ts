// @ts-ignore
import * as express from 'express';
const router = express.Router();
router.get('/github', (req: express.Request, res: express.Response, next: any) => {
    // @ts-ignore
    res.redirect('https://github.com/login/oauth/authorize?scope=read:user,read:repo&client_id=' + process.env.CLIENT_ID)
});
export {router}