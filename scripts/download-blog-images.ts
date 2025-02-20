import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';

// Create blog images directory if it doesn't exist
const blogDir = 'public/blog';
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

const blogImages = [
  {
    filename: 'organic-produce.jpg',
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e'
  },
  {
    filename: 'seasonal-cooking.jpg',
    url: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f'
  },
  {
    filename: 'sustainable-shopping.jpg',
    url: 'https://images.unsplash.com/photo-1584385002340-d886f3a0f097'
  },
  {
    filename: 'food-labels.jpg',
    url: 'https://images.unsplash.com/photo-1625650484478-113df4bfc370'
  },
  {
    filename: 'meal-prep.jpg',
    url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352'
  },
  {
    filename: 'farm-to-table.jpg',
    url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854'
  }
];

const downloadImage = (url: string, filepath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const fullUrl = `${url}?auto=format&fit=crop&w=1200&h=800&q=80`;
    https.get(fullUrl, (response) => {
      if (response.statusCode === 200) {
        response
          .pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve());
      } else {
        response.resume();
        reject(new Error(`Request Failed With a Status Code: ${response.statusCode}`));
      }
    });
  });
};

async function downloadAllBlogImages() {
  console.log('Starting blog image downloads...');
  
  for (const image of blogImages) {
    const filepath = path.join(blogDir, image.filename);
    try {
      await downloadImage(image.url, filepath);
      console.log(`Downloaded ${image.filename}`);
    } catch (error) {
      console.error(`Error downloading ${image.filename}:`, error);
    }
  }
  
  console.log('Finished downloading blog images!');
}

downloadAllBlogImages(); 