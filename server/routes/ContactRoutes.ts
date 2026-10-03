import { Router } from 'express';
import { sendContactEmail } from '../services/email.service.js';

const ContactRouter = Router();

ContactRouter.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                message: 'Please fill all fields',
            });
        }

        await sendContactEmail(name, email, message);

        res.json({
            message: 'Message sent successfully',
        });
    } catch (error: any) {
        console.error('Contact form error:', error);

        res.status(500).json({
            message: 'Failed to send message',
        });
    }
});

export default ContactRouter;