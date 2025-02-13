const https = require('https');
const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const dirs = ['public/products', 'public/categories', 'public/banners'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Function to download image with retries
async function downloadImage(url, filepath, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        
        const request = https.get(url, response => {
          if (response.statusCode === 301 || response.statusCode === 302) {
            file.close();
            fs.unlink(filepath, () => {});
            downloadImage(response.headers.location, filepath)
              .then(resolve)
              .catch(reject);
            return;
          }

          if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => {
              file.close();
              resolve(filepath);
            });
          } else {
            file.close();
            fs.unlink(filepath, () => {});
            reject(new Error(`Server responded with ${response.statusCode}: ${response.statusMessage}`));
          }
        });

        request.on('error', error => {
          file.close();
          fs.unlink(filepath, () => {});
          reject(error);
        });

        request.setTimeout(10000, () => {
          request.destroy();
          reject(new Error('Request timeout'));
        });
      });
      
      return filepath;
    } catch (error) {
      if (attempt === retries) throw error;
      console.log(`Attempt ${attempt} failed, retrying...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
}

// High-quality product images from Unsplash
const productImages = {
  'fruits-vegetables': [
    'https://images.unsplash.com/photo-1610832958506-aa56368176cf',
    'https://images.unsplash.com/photo-1518843875459-f738682238a6',
    'https://images.unsplash.com/photo-1610348725531-843dff563e2c',
    'https://images.unsplash.com/photo-1597362925123-77861d3fbac7',
    'https://images.unsplash.com/photo-1610832958506-aa56368176cf',
    'https://images.unsplash.com/photo-1518843875459-f738682238a6',
    'https://images.unsplash.com/photo-1610348725531-843dff563e2c',
    'https://images.unsplash.com/photo-1597362925123-77861d3fbac7',
    'https://images.unsplash.com/photo-1610832958506-aa56368176cf',
    'https://images.unsplash.com/photo-1518843875459-f738682238a6'
  ],
  'dairy': [
    'https://images.unsplash.com/photo-1628088062854-d1870b4553da',
    'https://images.unsplash.com/photo-1550583724-b2692b85b150',
    'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d',
    'https://images.unsplash.com/photo-1628088062854-d1870b4553da',
    'https://images.unsplash.com/photo-1550583724-b2692b85b150',
    'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d',
    'https://images.unsplash.com/photo-1628088062854-d1870b4553da',
    'https://images.unsplash.com/photo-1550583724-b2692b85b150'
  ],
  'meat': [
    'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f',
    'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6',
    'https://images.unsplash.com/photo-1603048297172-c92544798d5a',
    'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f',
    'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6',
    'https://images.unsplash.com/photo-1603048297172-c92544798d5a',
    'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f',
    'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6'
  ],
  'bakery': [
    'https://images.unsplash.com/photo-1509440159596-0249088772ff',
    'https://images.unsplash.com/photo-1517433670267-08bbd4be890f',
    'https://images.unsplash.com/photo-1586444248902-2f64eddc13df',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff',
    'https://images.unsplash.com/photo-1517433670267-08bbd4be890f',
    'https://images.unsplash.com/photo-1586444248902-2f64eddc13df',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff',
    'https://images.unsplash.com/photo-1517433670267-08bbd4be890f'
  ],
  'pantry': [
    'https://images.unsplash.com/photo-1584473457406-6240486418e9',
    'https://images.unsplash.com/photo-1518110925495-7f6a146e0364',
    'https://images.unsplash.com/photo-1506368249639-73a05d6f6488',
    'https://images.unsplash.com/photo-1584473457406-6240486418e9',
    'https://images.unsplash.com/photo-1518110925495-7f6a146e0364',
    'https://images.unsplash.com/photo-1506368249639-73a05d6f6488',
    'https://images.unsplash.com/photo-1584473457406-6240486418e9',
    'https://images.unsplash.com/photo-1518110925495-7f6a146e0364'
  ]
};

// Category banner images
const categoryImages = [
  {
    name: 'fruits-vegetables',
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e'
  },
  {
    name: 'dairy-eggs',
    url: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da'
  },
  {
    name: 'meat-seafood',
    url: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f'
  },
  {
    name: 'bakery',
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff'
  },
  {
    name: 'pantry',
    url: 'https://images.unsplash.com/photo-1584473457406-6240486418e9'
  },
  {
    name: 'beverages',
    url: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d'
  },
  {
    name: 'snacks',
    url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087'
  },
  {
    name: 'household',
    url: 'https://images.unsplash.com/photo-1584473457406-6240486418e9'
  }
];

// Banner images
const bannerImages = [
  {
    name: 'hero',
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e'
  },
  {
    name: 'featured',
    url: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818'
  },
  {
    name: 'sale',
    url: 'https://images.unsplash.com/photo-1553546895-531931aa1aa8'
  },
  {
    name: 'organic',
    url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5'
  }
];

async function downloadAllImages() {
  console.log('Starting image downloads...');

  try {
    // Download product images
    console.log('\nDownloading product images...');
    for (const [category, images] of Object.entries(productImages)) {
      console.log(`\nDownloading ${category} images...`);
      for (let i = 0; i < images.length; i++) {
        const url = `${images[i]}?auto=format&fit=crop&w=800&h=800&q=80`;
        const filepath = path.join('public/products', `${category}-${i + 1}.jpg`);
        try {
          await downloadImage(url, filepath);
          console.log(`Downloaded ${category}-${i + 1}.jpg`);
        } catch (error) {
          console.error(`Error downloading ${category}-${i + 1}.jpg:`, error.message);
        }
      }
    }

    // Download category images
    console.log('\nDownloading category images...');
    for (const category of categoryImages) {
      try {
        const url = `${category.url}?auto=format&fit=crop&w=1200&h=400&q=80`;
        const filepath = path.join('public/categories', `${category.name}.jpg`);
        await downloadImage(url, filepath);
        console.log(`Downloaded ${category.name}.jpg`);
      } catch (error) {
        console.error(`Error downloading ${category.name}.jpg:`, error.message);
      }
    }

    // Download banner images
    console.log('\nDownloading banner images...');
    for (const banner of bannerImages) {
      try {
        const url = `${banner.url}?auto=format&fit=crop&w=1920&h=1080&q=80`;
        const filepath = path.join('public/banners', `${banner.name}.jpg`);
        await downloadImage(url, filepath);
        console.log(`Downloaded ${banner.name}.jpg`);
      } catch (error) {
        console.error(`Error downloading ${banner.name}.jpg:`, error.message);
      }
    }

    console.log('\nAll images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
    process.exit(1);
  }
}

downloadAllImages(); 