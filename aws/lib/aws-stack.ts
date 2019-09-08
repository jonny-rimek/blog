import cdk = require('@aws-cdk/core');
import s3deploy = require('@aws-cdk/aws-s3-deployment');
import s3 = require('@aws-cdk/aws-s3');
import cloudfront = require('@aws-cdk/aws-cloudfront');
import route53 = require('@aws-cdk/aws-route53');
import alias = require('@aws-cdk/aws-route53-targets');
import { Bucket } from '@aws-cdk/aws-s3';


export class AwsStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// The code that defines your stack goes here
		const BlogBucket = new s3.Bucket(this, 'Blog', {
			websiteIndexDocument: 'index.html',
			publicReadAccess: true
		});	

		const LogBucket = Bucket.fromBucketName(this, 'LogBucket', 'cfnlogbucket-56454534');

		const distribution = new cloudfront.CloudFrontWebDistribution(this, 'Distribution', {
			originConfigs: [
				{
					s3OriginSource: {
						s3BucketSource: BlogBucket
				},
					behaviors : [ 
						{
							isDefaultBehavior: true,
							compress: true,
						}
					], 

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
			],
			loggingConfig: {
				bucket: LogBucket,
				prefix: 'jonny-rimek-blog'
			}
		});

		new s3deploy.BucketDeployment(this, 'DeployWebsite', {
			source: s3deploy.Source.asset('../public'),
			destinationBucket: BlogBucket,
			distribution,
		});

		const zone = new route53.PublicHostedZone(this, 'HostedZone', {
			zoneName: 'jonny-rimek.com'
		  });

		new route53.ARecord(this, 'AliasRecord', {
			zone,
			target: route53.RecordTarget.fromAlias(new alias.CloudFrontTarget(distribution)),
		});
	}
}
