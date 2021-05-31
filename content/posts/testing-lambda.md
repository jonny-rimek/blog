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

## Using CDK and SAM together

AWS SAM by default works with CloudFormation, which means it supports CDK out of the Box, 
but the Developer Experience is not good. To improve the local experience with CDK, the SAM
Team added native 
[support](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-cdk.html) 
for CDK. At the time of writing this it is still in public review.

## Manually invoking a lambda locally

Instead of deploying everything and waiting for it to finish and then manually testing the behaviour
the first step is to simply manually test locally. This is already a huge improvement as our feedback
loop goes from 2-3 minutes to a couple of seconds. To run a lambda locally execute the following command
`sam-beta-cdk local invoke STACKNAME/LOGICAL ID`, if you only run `sam-beta-cdk local invoke` and you have
more than one lambda, all available lambdas are listed.

## Lambda is event driven

So far testing lambda seems trivial, but we miss one important piece. Unlike an EC2 instance, lambda doesn't
exist on its own, it always runs in response to a certain event. That event can be anything from an API Call
with API Gateway or a new file in S3 and much more. In order to accurately test our lambda, we need to pass
in an event. This was the part that confused me the most when I was new to AWS, luckily SAM has our back
again. With `sam local generate-event` you can create events from 24 services. Once you created the event,
saved it to a file and updated the values to reflect your needs. You can invoke the lambda with the event
using the following command `sam-beta-cdk local invoke STACKNAME/LOGICAL ID -e FILENAME`. Things get a bit
tricky if you have nested events, e.g. a s3 event inside a sqs event. In this case you have to escape the
nested event, you can see an example 
[here](https://github.com/jonny-rimek/wowmate/blob/b28ec987940712ac626b9139e3803a42fdf35bf2/services/test/upload-integration-test/insertKeysToDynamodbEvent.json).

## Building/compiling the lambda source code

Every time you run `sam-beta-cdk local invoke`, `start-api` or `start-lambda` the cdk code is synthesized, that 
means it always reflects the latest changes in your cdk code, but it doesn't automatically mean that it contains
the latest code of your lambda code. If you use a compiled language like golang, you need to recompile the binary before
running it again locally. Luckily there is a CDK [construct](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-lambda-go-readme.html) 
that compiles the go code during the synthesizing step, which allows us to skip the extra recompiling step.
Similar constructs exist for [nodejs](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-lambda-nodejs-readme.html) 
and [python](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-lambda-python-readme.html)

## Locally testing APIs

For both API Gateway versions SAM offers the possibility to stand up the entire API with all lambda functions attached.
This allows us to call the API route in our Webbrowser or let our local frontend talk to our local API. The command is
`sam-beta-cdk local start-api`

Lambdas that are fronted by an API Gateway, I would always test by calling the API endpoint, instead of invoking the 
lambda directly and passing in the API Gateway event. Testing APIs is a well established problem with a rich eco-system
of tools.

Personally, I opted to use AWS Synthetics to continuously test my API in production and on demand during the CI.
There are two things to look out for in that approach. 

First, in order to manually invoke the canary the schedule needs to be _once_
and in production it needs to be a rate at which the canary should be invoked. It is not possible to invoke the 
canary via the SDK, when it runs every X minutes.

Second, invoking the canary is an asynchronous API call. You need to check the result of the canary in a dedicated step.

## Automatically testing your lambdas locally and in CI

We now have a way to automatically test our API lambdas and manually test the other lambdas, but in order to produce reliable
software we want automated tests for all our lambdas. This is where `sam-beta-cdk local start-lambda` comes into play.
This command simulates the API of the Lambda service locally, allowing us to invoke the lambda via the SDK and assert on the 
response of the lambda. We can also reuse the same test code in CI as we use locally, all we need to do is to tell the SDK
to use localhost:3001 as an endpoint. You can see an example python example 
[here](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-using-automated-tests.html)
and a go example [here](https://github.com/jonny-rimek/wowmate/blob/b3d7dd5ff9e40a6bda503a93c44356957a71c1f1/services/test/upload-integration-test/integration-test.go#L269).

To decide if the test is running in the CI or locally you can check if the CI environment variable exist, this works for GitHub Actions,
make sure it works for your CI provider as well.

## Conclusion

Testing your CDK lambdas locally got way better with the new sam-beta-cdk, but it's still one of the areas where serverless is
lacking, when it comes to tools and developer experience.


