const https = require('https');
const fs = require('fs');
const path = require('path');

// Create new arrivals directory if it doesn't exist
const newArrivalsDir = 'public/products/new-arrivals';
if (!fs.existsSync(newArrivalsDir)) {
  fs.mkdirSync(newArrivalsDir, { recursive: true });
}

const newArrivalImages = [
  {
    filename: 'product-1.jpg',
    url: 'https://images.unsplash.com/photo-1584385002340-d886f3a0f097'
  },
  {
    filename: 'product-2.jpg',
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd'
  },
  {
    filename: 'product-3.jpg',
    url: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7'
  },
  {
    filename: 'product-4.jpg',
    url: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2'
  },
  {
    filename: 'product-5.jpg',
    url: 'https://images.unsplash.com/photo-1573246123716-6b1782bfc499'
  },
  {
    filename: 'product-6.jpg',
    url: 'https://images.unsplash.com/photo-1616684000067-36952fde56ec'
  },
  {
    filename: 'product-7.jpg',
    url: 'https://images.unsplash.com/photo-1598449356475-b9f71db7d847'
  },
  {
    filename: 'product-8.jpg',
    url: 'https://images.unsplash.com/photo-1621956838261-2be26433017e'
  }
];

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const fullUrl = `${url}?auto=format&fit=crop&w=800&h=800&q=80`;
    https.get(fullUrl, (response) => {
      if (response.statusCode === 200) {
        const writeStream = fs.createWriteStream(filepath);
        response.pipe(writeStream);
        writeStream.on('finish', () => {
          writeStream.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function downloadAllNewArrivalImages() {
  console.log('Starting new arrival image downloads...');
  
  for (const image of newArrivalImages) {
    const filepath = path.join(newArrivalsDir, image.filename);
    try {
      await downloadImage(image.url, filepath);
      console.log(`Downloaded ${image.filename}`);
    } catch (error) {
      console.error(`Error downloading ${image.filename}:`, error);
    }
  }
  
  console.log('Finished downloading new arrival images!');
}

downloadAllNewArrivalImages(); 