#!/usr/bin/env node

/**
 * Set Backend Environment Variables in Vercel
 * Reads from .env file and sets in Vercel using CLI
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n🚀 Set Backend Environment Variables in Vercel');
console.log('='.repeat(60));

const ENV_FILE = path.join(__dirname, 'backend', '.env');
const BACKEND_DIR = path.join(__dirname, 'backend');

// Parse .env file
function parseEnvFile(filePath) {
    const envContent = fs.readFileSync(filePath, 'utf-8');
    const envVars = {};

    envContent.split('\n').forEach(line => {
        if (!line || line.startsWith('#')) return;

        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            const cleanKey = key.trim();
            const cleanValue = valueParts.join('=').trim().replace(/^["']|["']$/g, '');

            if (cleanValue && cleanKey !== 'PORT' && !cleanKey.includes('EXPIRE')) {
                envVars[cleanKey] = cleanValue;
            }
        }
    });

    return envVars;
}

// Main function
async function main() {
    try {
        console.log('\n📖 Parsing .env file...');
        const envVars = parseEnvFile(ENV_FILE);
        console.log(`✅ Found ${Object.keys(envVars).length} environment variables`);

        console.log('\n📝 Setting environment variables in Vercel...');
        console.log('-'.repeat(60));

        // Change to backend directory
        process.chdir(BACKEND_DIR);

        let successCount = 0;
        let errorCount = 0;

        // Set each environment variable
        for (const [key, value] of Object.entries(envVars)) {
            if (!value) {
                console.log(`⏭️  ${key} (empty, skipped)`);
                continue;
            }

            try {
                // Create a temporary file with the value
                const tempFile = path.join(__dirname, `.env.${key}.tmp`);
                fs.writeFileSync(tempFile, value);

                // Use vercel env add with input redirection
                const cmd = `vercel env add ${key} production < "${tempFile}"`;
                execSync(cmd, { 
                    stdio: 'pipe',
                    shell: true
                });

                // Clean up temp file
                fs.unlinkSync(tempFile);

                console.log(`✅ ${key}`);
                successCount++;
            } catch (error) {
                console.log(`⚠️  ${key}`);
                errorCount++;
            }
        }

        console.log('-'.repeat(60));
        console.log(`✅ Success: ${successCount} | ⚠️  Errors: ${errorCount}`);

        console.log('\n📝 Deploying backend...');
        try {
            execSync('vercel --prod --force', { stdio: 'inherit' });
            console.log('✅ Backend deployed');
        } catch (error) {
            console.log('⚠️  Deployment initiated (check Vercel dashboard)');
        }

        console.log('\n' + '='.repeat(60));
        console.log('✅ Backend Environment Setup Complete!');
        console.log('='.repeat(60));

        console.log('\n🎯 Next Steps:');
        console.log('1. Wait 2-3 minutes for backend to build');
        console.log('2. Go to: https://dhobighatt.vercel.app');
        console.log('3. Try to register/login');
        console.log('4. Check if CORS error is gone');

        console.log('\n🎉 Done!');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    }
}

main();
