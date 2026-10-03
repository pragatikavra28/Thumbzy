// import { Request, Response } from 'express';
// import Thumbnail from '../models/Thumbnail.js';
// import { generateAIImage } from '../services/ai.service.js';
// import { v2 as cloudinary } from 'cloudinary';
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const stylePrompts = {
//     'Bold & Graphic':
//         'eye-catching thumbnail, bold typography, vibrant colors, expressive facial reaction, dramatic lighting, high contrast, click-worthy composition, professional style',

//     'Tech/Futuristic':
//         'futuristic thumbnail, sleek modern design, digital UI elements, glowing accents, holographic effects, cyber-tech aesthetic, sharp lighting, high-tech atmosphere',

//     Minimalist:
//         'minimalist thumbnail, clean layout, simple shapes, limited color palette, plenty of negative space, modern flat design, clear focal point',

//     Photorealistic:
//         'photorealistic thumbnail, ultra-realistic lighting, natural skin tones, candid moment, DSLR-style photography, lifestyle realism, shallow depth of field',

//     Illustrated:
//         'illustrated thumbnail, custom digital illustration, stylized characters, bold outlines, vibrant colors, creative cartoon or vector art style',
// };

// const colorSchemeDescriptions = {
//     vibrant:
//         'vibrant and energetic colors, high saturation, bold contrasts, eye-catching palette',

//     sunset:
//         'warm sunset tones, orange pink and purple hues, soft gradients, cinematic glow',

//     forest:
//         'natural green tones, earthy colors, calm and organic palette, fresh atmosphere',

//     neon:
//         'neon glow effects, electric blues and pinks, cyberpunk lighting, high contrast glow',

//     purple:
//         'purple-dominant color palette, magenta and violet tones, modern and stylish mood',

//     monochrome:
//         'black and white color scheme, high contrast, dramatic lighting, timeless aesthetic',

//     ocean:
//         'cool blue and teal tones, aquatic color palette, fresh and clean atmosphere',

//     pastel:
//         'soft pastel colors, low saturation, gentle tones, calm and friendly aesthetic',
// };

// export const generateThumbnail = async (req: Request, res: Response) => {
//     try {
//         const { userId } = req.session;

//         const {
//             title,
//             prompt: user_prompt,
//             style,
//             aspect_ratio,
//             color_scheme,
//             text_overlay,
//         } = req.body;

//         const thumbnail = await Thumbnail.create({
//             userId,
//             title,
//             prompt_used: user_prompt,
//             user_prompt,
//             style,
//             aspect_ratio,
//             color_scheme,
//             text_overlay,
//             isGenerating: true,
//         });

//         let prompt = `Create a ${
//             stylePrompts[style as keyof typeof stylePrompts]
//         } for: "${title}"`;

//         if (color_scheme) {
//             prompt += ` Use a ${
//                 colorSchemeDescriptions[
//                     color_scheme as keyof typeof colorSchemeDescriptions
//                 ]
//             } color scheme.`;
//         }

//         if (user_prompt) {
//             prompt += ` Additional details: ${user_prompt}.`;
//         }

//         prompt += `
//             The thumbnail should be visually stunning and designed to maximize click-through rate.
//             Make it bold, professional, and impossible to ignore.
//             Create a high-quality YouTube-style thumbnail.
//             Use strong visual hierarchy, dramatic lighting, high contrast,
//             clear subject separation, and an engaging composition.
//         `;

//         // Generate image using Hugging Face
//         const finalBuffer = await generateAIImage(prompt);

//         // Upload the image Buffer directly to Cloudinary
//         const uploadResult = await new Promise<any>((resolve, reject) => {
//             cloudinary.uploader
//                 .upload_stream(
//                     {
//                         resource_type: 'image',
//                         format: 'png',
//                     },
//                     (error, result) => {
//                         if (error) {
//                             reject(error);
//                         } else {
//                             resolve(result);
//                         }
//                     }
//                 )
//                 .end(finalBuffer);
//         });

//         thumbnail.image_url = uploadResult.secure_url;
//         thumbnail.isGenerating = false;

//         await thumbnail.save();

//         res.json({
//             message: 'Thumbnail Generated',
//             thumbnail,
//         });
//     } catch (error: any) {
//         console.log('Thumbnail generation error:', error);

//         res.status(500).json({
//             message: error.message,
//         });
//     }
// };

// // Controller for Thumbnail Deletion
// export const deleteThumbnail = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const { userId } = req.session;

//         await Thumbnail.findOneAndDelete({
//             _id: id,
//             userId,
//         });

//         res.json({
//             message: 'Thumbnail deleted successfully',
//         });
//     } catch (error: any) {
//         console.log(error);

//         res.status(500).json({
//             message: error.message,
//         });
//     }
// };

import { Request, Response } from 'express';
import Thumbnail from '../models/Thumbnail.js';
import { generateAIImage } from '../services/ai.service.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const stylePrompts = {
    'Bold & Graphic':
        'eye-catching thumbnail, bold typography, vibrant colors, expressive facial reaction, dramatic lighting, high contrast, click-worthy composition, professional style',

    'Tech/Futuristic':
        'futuristic thumbnail, sleek modern design, digital UI elements, glowing accents, holographic effects, cyber-tech aesthetic, sharp lighting, high-tech atmosphere',

    Minimalist:
        'minimalist thumbnail, clean layout, simple shapes, limited color palette, plenty of negative space, modern flat design, clear focal point',

    Photorealistic:
        'photorealistic thumbnail, ultra-realistic lighting, natural skin tones, candid moment, DSLR-style photography, lifestyle realism, shallow depth of field',

    Illustrated:
        'illustrated thumbnail, custom digital illustration, stylized characters, bold outlines, vibrant colors, creative cartoon or vector art style',
};

const colorSchemeDescriptions = {
    vibrant:
        'vibrant and energetic colors, high saturation, bold contrasts, eye-catching palette',

    sunset:
        'warm sunset tones, orange pink and purple hues, soft gradients, cinematic glow',

    forest:
        'natural green tones, earthy colors, calm and organic palette, fresh atmosphere',

    neon:
        'neon glow effects, electric blues and pinks, cyberpunk lighting, high contrast glow',

    purple:
        'purple-dominant color palette, magenta and violet tones, modern and stylish mood',

    monochrome:
        'black and white color scheme, high contrast, dramatic lighting, timeless aesthetic',

    ocean:
        'cool blue and teal tones, aquatic color palette, fresh and clean atmosphere',

    pastel:
        'soft pastel colors, low saturation, gentle tones, calm and friendly aesthetic',
};

export const generateThumbnail = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;

        const {
            title,
            prompt: user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay,
        } = req.body;

        const thumbnail = await Thumbnail.create({
            userId,
            title,
            prompt_used: user_prompt,
            user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay,
            isGenerating: true,
        });

        let prompt = `Create a ${
            stylePrompts[style as keyof typeof stylePrompts]
        } for: "${title}"`;

        if (color_scheme) {
            prompt += ` Use a ${
                colorSchemeDescriptions[
                    color_scheme as keyof typeof colorSchemeDescriptions
                ]
            } color scheme.`;
        }

        if (user_prompt) {
            prompt += ` Additional details: ${user_prompt}.`;
        }

        prompt += `
            The thumbnail should be visually stunning and designed to maximize click-through rate.
            Make it bold, professional, and impossible to ignore.
            Create a high-quality YouTube-style thumbnail.
            Use strong visual hierarchy, dramatic lighting, high contrast,
            clear subject separation, and an engaging composition.
        `;

        // Generate image using Hugging Face
        const finalBuffer = await generateAIImage(prompt);

        // Upload the image Buffer directly to Cloudinary
        const uploadResult = await new Promise<any>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        resource_type: 'image',
                        format: 'png',
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                )
                .end(finalBuffer);
        });

        thumbnail.image_url = uploadResult.secure_url;
        thumbnail.isGenerating = false;

        await thumbnail.save();

        res.json({
            message: 'Thumbnail Generated',
            thumbnail,
        });
    } catch (error: any) {
        console.log('Thumbnail generation error:', error);

        res.status(500).json({
            message: error.message,
        });
    }
};

// Controller for Thumbnail Deletion
export const deleteThumbnail = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.session;

        await Thumbnail.findOneAndDelete({
            _id: id,
            userId,
        });

        res.json({
            message: 'Thumbnail deleted successfully',
        });
    } catch (error: any) {
        console.log(error);

        res.status(500).json({
            message: error.message,
        });
    }
};

// Controller for Favorite / Unfavorite
export const toggleFavorite = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.session;

        const thumbnail = await Thumbnail.findOne({
            _id: id,
            userId,
        });

        if (!thumbnail) {
            return res.status(404).json({
                message: 'Thumbnail not found',
            });
        }

        thumbnail.isFavorite = !thumbnail.isFavorite;

        await thumbnail.save();

        res.json({
            message: thumbnail.isFavorite
                ? 'Added to favorites'
                : 'Removed from favorites',
            isFavorite: thumbnail.isFavorite,
        });
    } catch (error: any) {
        console.log(error);

        res.status(500).json({
            message: error.message,
        });
    }
};