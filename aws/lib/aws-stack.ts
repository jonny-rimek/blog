import cdk = require('@aws-cdk/core');
import s3deploy = require('@aws-cdk/aws-s3-deployment');
import s3 = require('@aws-cdk/aws-s3');
import cloudfront = require('@aws-cdk/aws-cloudfront');


export class AwsStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
	super(scope, id, props);

	// The code that defines your stack goes here
	const BlogBucket = new s3.Bucket(this, 'Blog', {
		websiteIndexDocument: 'index.html',
		publicReadAccess: true
		});	


	const distribution = new cloudfront.CloudFrontWebDistribution(this, 'Distribution', {
		originConfigs: [
			{
			s3OriginSource: {
				s3BucketSource: BlogBucket
			},
			behaviors : [ {isDefaultBehavior: true}]
			}
		],
		errorConfigurations: [
			{
				errorCode: 403,
				responseCode: 200,
				responsePagePath: '/index.html'
			},
			{
				errorCode: 404,
				responseCode: 200,
				responsePagePath: '/index.html'
			},
		]
	});


	new s3deploy.BucketDeployment(this, 'DeployWebsite', {
		source: s3deploy.Source.asset('../public'),
		destinationBucket: BlogBucket,
		distribution,
		// destinationKeyPrefix: 'web/static' // optional prefix in destination bucket
	});

	}
}
