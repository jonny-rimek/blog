import cdk = require('@aws-cdk/core');
import s3deploy = require('@aws-cdk/aws-s3-deployment');
import s3 = require('@aws-cdk/aws-s3');
import cloudfront = require('@aws-cdk/aws-cloudfront');
import { Bucket } from '@aws-cdk/aws-s3';
import { SSLMethod, SecurityPolicyProtocol } from '@aws-cdk/aws-cloudfront';

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
			},
			aliasConfiguration: {
				names: ['jonny-rimek.com'],
				acmCertRef: 'arn:aws:acm:us-east-1:343775190103:certificate/9fbb4c96-5628-494f-97d2-def6ff87dce7',
				sslMethod: SSLMethod.SNI,
				securityPolicy: SecurityPolicyProtocol.TLS_V1_2_2018,
			}
		});

		//TODO: 
		// create cloudfront aliase in route53 for ipv4 and ipv6 in cdk
		// create acm in cdk

		new s3deploy.BucketDeployment(this, 'DeployWebsite', {
			source: s3deploy.Source.asset('../public'),
			destinationBucket: BlogBucket,
			distribution,
		});
	}
}
