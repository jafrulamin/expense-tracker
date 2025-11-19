const { S3Client, CreateBucketCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
  endpoint: 'http://localhost:4566',
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'test',
    secretAccessKey: 'test',
  },
  forcePathStyle: true,
});

const BUCKET_NAME = 'expense-receipts';

async function createBucket() {
  try {
    const command = new CreateBucketCommand({ Bucket: BUCKET_NAME });
    await s3Client.send(command);
    console.log(`✅ Bucket "${BUCKET_NAME}" created successfully`);
  } catch (error) {
    if (error.name === 'BucketAlreadyOwnedByYou' || error.Code === 'BucketAlreadyExists') {
      console.log(`✅ Bucket "${BUCKET_NAME}" already exists`);
    } else {
      console.error('❌ Error creating bucket:', error);
      process.exit(1);
    }
  }
}

createBucket();

