import express from 'express';
import { addBulkFoodItems, addFoodItem, deleteAllFoodItems, deleteFoodItem, getFoodItems } from '../controllers/foodController.js';
import multer from 'multer';
import { debuggerLog } from '../middleware/auth.js';
const foodRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${file.originalname}`);
    }
});
  
const upload = multer({ storage });


foodRouter.post('/add', upload.single("image"), addFoodItem);
foodRouter.get('/all', debuggerLog, getFoodItems);
foodRouter.post('/delete/:id', deleteFoodItem);
foodRouter.post('/bulk-add', upload.array('images'), addBulkFoodItems);
foodRouter.post('/bulk-delete', deleteAllFoodItems);



export default foodRouter;