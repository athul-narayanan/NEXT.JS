import { MongoClient } from 'mongodb'

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const { title, image, address, description } = data;
        const client = await MongoClient.connect('mongodb+srv://athul:791VevNlGP1C1RL5@cluster0.uoem7.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();
        const meetupCollection = db.collection('meetups');
        const result = await meetupCollection.insertOne(data);
        client.close();

        res.status(201).json({ message: 'Meetup inserted' });
    }
}

export default handler;