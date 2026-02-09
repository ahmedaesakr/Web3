const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'C:/Users/Administrator/Desktop/Render';
const outputDir = 'a:/Repos/WEB DES/public/sequence';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png')).sort();

async function optimize() {
    console.log(`Optimizing ${files.length} images...`);

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const inputPath = path.join(inputDir, file);
        const outputName = `frame_${String(i).padStart(4, '0')}.webp`;
        const outputPath = path.join(outputDir, outputName);

        await sharp(inputPath)
            .resize(1920) // Ensure 1080p
            .webp({ quality: 75 })
            .toFile(outputPath);

        if (i % 20 === 0) {
            console.log(`Processed ${i}/${files.length}...`);
        }
    }

    console.log('Optimization complete!');
}

optimize().catch(console.error);
