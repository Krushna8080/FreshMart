const https = require('https');
const fs = require('fs');
const path = require('path');
const { IncomingMessage } = require('http');

// Create directories if they don't exist
const dirs = [
  'public/products/fruits-vegetables',
  'public/products/meat-seafood',
  'public/products/dairy-eggs',
  'public/products/bakery',
  'public/products/pantry',
  'public/banners',
  'public/categories'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Function to download image with retries
async function downloadImage(url: string, filepath: string, retries = 3): Promise<string> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        
        const request = https.get(url, (response: typeof IncomingMessage.prototype) => {
          if (response.statusCode === 301 || response.statusCode === 302) {
            file.close();
            fs.unlink(filepath, () => {});
            downloadImage(response.headers.location || url, filepath)
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

        request.on('error', (error: Error) => {
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
  return filepath;
}

async function downloadAllImages() {
  console.log('Starting image downloads...');

  const categories: Record<string, string[]> = {
    'fruits-vegetables': [
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf',
      'https://images.unsplash.com/photo-1518843875459-f738682238a6',
      'https://images.unsplash.com/photo-1557844352-761f2565b576',
      'https://images.unsplash.com/photo-1566842600175-97dca489844f',
      'https://images.unsplash.com/photo-1597362925123-77861d3fbac7'
    ],
    'meat-seafood': [
      'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f',
      'https://images.unsplash.com/photo-1510130387422-82bed34b37e9',
      'https://images.unsplash.com/photo-1595356161904-6708c97be89c',
      'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62',
      'https://images.unsplash.com/photo-1553659971-f01207815908'
    ],
    'dairy-eggs': [
      'https://images.unsplash.com/photo-1550583724-b2692b85b150',
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d',
      'https://images.unsplash.com/photo-1563636619-e9143da7973b',
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6',
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04'
    ],
    'bakery': [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff',
      'https://images.unsplash.com/photo-1517433670267-08bbd4be890f',
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35',
      'https://images.unsplash.com/photo-1534620808146-d33bb39128b2',
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587'
    ],
    'pantry': [
      'https://images.unsplash.com/photo-1584473457406-6240486418e9',
      'https://images.unsplash.com/photo-1506368249639-73a05d6f6488',
      'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906',
      'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086',
      'https://images.unsplash.com/photo-1590779033100-9f60a05a013d'
    ]
  };

  const bannerImages = [
    {
      url: 'https://images.unsplash.com/photo-1542838132-92c53300491e',
      filename: 'hero.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca',
      filename: 'fresh-produce.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d',
      filename: 'meat-seafood.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1528711832838-2107f98c9f1c',
      filename: 'dairy-eggs.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086',
      filename: 'bakery.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58',
      filename: 'pantry.jpg'
    }
  ];

  try {
    // Download category images
    for (const [category, urls] of Object.entries(categories)) {
      console.log(`\nDownloading ${category} images...`);
      for (let i = 0; i < urls.length; i++) {
        const url = `${urls[i]}?auto=format&fit=crop&w=800&h=800&q=80`;
        const filepath = path.join('public/products', category, `${i + 1}.jpg`);
        try {
          await downloadImage(url, filepath);
          console.log(`Downloaded ${category}/${i + 1}.jpg`);
        } catch (error: any) {
          console.error(`Error downloading ${category}/${i + 1}.jpg:`, error?.message || 'Unknown error');
        }
      }
    }

    // Download banner images
    console.log('\nDownloading banner images...');
    for (const banner of bannerImages) {
      try {
        const url = `${banner.url}?auto=format&fit=crop&w=1920&h=1080&q=80`;
        const filepath = path.join('public/banners', banner.filename);
        await downloadImage(url, filepath);
        console.log(`Downloaded ${banner.filename}`);
      } catch (error: any) {
        console.error(`Error downloading ${banner.filename}:`, error?.message || 'Unknown error');
      }
    }

    console.log('\nAll images downloaded successfully!');
  } catch (error: any) {
    console.error('Error downloading images:', error?.message || 'Unknown error');
    process.exit(1);
  }
}

downloadAllImages(); 