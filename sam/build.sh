#!/usr/bin/env bash
aws cloudformation package --template-file ./template.yml --output-template-file template-output.yml --s3-bucket $S3_BUCKET
aws cloudformation deploy \
 --template-file ./template-output.yml --stack-name lambda-layer --region $AWS_REGION
aws cloudformation describe-stack-resources  --stack-name lambda-layer