// import express from 'express';
// import { deleteThumbnail, generateThumbnail } from '../controllers/ThumbnailController.js';
// import protect from '../middlewares/auth.js';

// const ThumbnailRouter = express.Router();

// ThumbnailRouter.post('/generate', protect, generateThumbnail);
// ThumbnailRouter.delete('/delete/:id', protect, deleteThumbnail);

// export default ThumbnailRouter;
import express from 'express';

import {
    deleteThumbnail,
    generateThumbnail,
    toggleFavorite,
} from '../controllers/ThumbnailController.js';

import protect from '../middlewares/auth.js';

const ThumbnailRouter = express.Router();

ThumbnailRouter.post('/generate', protect, generateThumbnail);

ThumbnailRouter.delete('/delete/:id', protect, deleteThumbnail);

ThumbnailRouter.patch('/favorite/:id', protect, toggleFavorite);

export default ThumbnailRouter;