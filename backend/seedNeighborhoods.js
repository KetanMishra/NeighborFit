const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/neighborfit';

const neighborhoodSchema = new mongoose.Schema({
  id: String,
  name: String,
  city: String,
  state: String,
  coordinates: Object,
  demographics: Object,
  housing: Object,
  amenities: Object,
  safety: Object,
  quality: Object,
});

const Neighborhood = mongoose.model('Neighborhood', neighborhoodSchema);

// Read static data from the new JSON file
const staticDataPath = path.join(__dirname, './seed/neighborhoods.json');
const sampleNeighborhoods = JSON.parse(fs.readFileSync(staticDataPath, 'utf-8'));

async function seed() {
  await mongoose.connect(MONGODB_URI);
  await Neighborhood.deleteMany({});
  await Neighborhood.insertMany(sampleNeighborhoods);
  console.log('Neighborhoods seeded from static data!');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
}); 