+++
title = "Testing AWS Lambdas locally and during CI with CDK and SAM"
date = "2021-05-26T02:09:40+02:00"
author = ""
cover = ""
tags = ["aws", "lambda", "cdk", "sam"]
keywords = ["", ""]
description = ""
showFullContent = false
+++

I've been using Lambda in side projects for almost 3 years now, and I have to admit up until
recently my workflow was `cdk deploy` wait 2-3 minutes and test manually. In order to speed up
my development workflow and increase my test coverage I set out to improve my workflow, and
now I'm sharing my learnings.

Testing and local development in lambda is fundamentally different from testing a monolith backed
by a relational database. Even though, simple setups like ApiGateway + Lambda + DynamoDB can be
run locally. Most serverless application also rely on services like S3, SQS, SNS, Step Functions 
etc. These services don't have an AWS supported way to be run locally. There are offerings
that try to simulate some services, but they will always lack in features and in the worst
case might, not act exactly like the cloud version, resulting in tests that work locally, but not
in production. The recommended way is to only simulate the compute part of our infrastructure 
locally, in our case that would be lambda. 

In practice that means we deploy all of our resources to a dev account and point our local
lambdas to real resources in AWS. CDK is responsible for provisioning our infrastructure, and we
use SAM to locally test our lambdas. You could also drop CDK and use SAM to provision your 
infrastructure, but I'm sick of messing around with yaml files, YMMV.