const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
        return res.status(500).json({
            error: 'Server config missing',
            hasApiKey: !!process.env.NOTION_API_KEY,
            hasDbId: !!process.env.NOTION_DATABASE_ID
        });
    }

    const { name, phone, message } = req.body;

    if (!name || !phone || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        await notion.pages.create({
            parent: { database_id: DATABASE_ID },
            properties: {
                Name: {
                    title: [{ text: { content: name } }]
                },
                Phone: {
                    phone_number: phone
                },
                Message: {
                    rich_text: [{ text: { content: message } }]
                },
                Date: {
                    date: { start: new Date().toISOString() }
                }
            }
        });

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('Notion API error:', err);
        return res.status(500).json({
            error: 'Failed to save to Notion',
            detail: err.message
        });
    }
};
