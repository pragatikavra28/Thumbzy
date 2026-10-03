import 'dotenv/config';

export const generateAIImage = async (prompt: string) => {
    try {
        const response = await fetch(
            'https://router.huggingface.co/fal-ai/fal-ai/flux/schnell',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt,
                    image_size: 'landscape_16_9',
                    num_inference_steps: 4,
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Hugging Face API ${response.status}: ${errorText}`
            );
        }

        const contentType = response.headers.get('content-type') || '';

        // If HF directly returned image bytes
        if (contentType.startsWith('image/')) {
            const arrayBuffer = await response.arrayBuffer();
            return Buffer.from(arrayBuffer);
        }

        // If HF returned JSON containing image URL
        const data: any = await response.json();

        const imageUrl = data?.images?.[0]?.url;

        if (!imageUrl) {
            throw new Error(
                `Hugging Face did not return an image URL: ${JSON.stringify(data)}`
            );
        }

        const imageResponse = await fetch(imageUrl);

        if (!imageResponse.ok) {
            throw new Error(
                `Failed to download generated image: ${imageResponse.status}`
            );
        }

        const imageBuffer = await imageResponse.arrayBuffer();

        return Buffer.from(imageBuffer);
    } catch (error) {
        console.error('Hugging Face image generation error:', error);
        throw error;
    }
};