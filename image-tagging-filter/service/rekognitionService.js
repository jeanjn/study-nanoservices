const AWS = require('aws-sdk')
AWS.config.update({
  region: 'us-east-1'
})

const rekognition = new AWS.Rekognition();

const detectLabels = (bucket, key) => {
    return new Promise((res, rej) => {
        console.log('Bucket:' + bucket);
        console.log('Key: ' + key);
    
        rekognition.detectLabels({
          Image: {
            S3Object: {
              Bucket: bucket,
              Name: key,
            }
          },
          MinConfidence: 80,
          MaxLabels: 10
        }, (err, data) => {
          if(err){
            return (rej(err));
          }
          return res(data.Labels.map(label => label.Name));
        })
      })
}

module.exports = {
    detectLabels: detectLabels
}