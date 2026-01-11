// pages/api/waitlist.js
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email invalide' });
  }

  try {
    const client = await clientPromise;
    // Remplace "photoswipe_db" par le nom de ta base si besoin
    const db = client.db("codinghubstudio"); 

    await db.collection("waitlist").updateOne(
      { email: email }, // On cherche si cet email existe
      { 
        $set: { email: email, platform: 'ios', app: 'photoswipe', updatedAt: new Date() },
        $setOnInsert: { createdAt: new Date() } 
      },
      { upsert: true } // Si n'existe pas, on crée. Si existe, on update.
    );

    res.status(200).json({ success: true, message: 'Inscrit !' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}