# AWS Shared Responsibility Model

**Company:** Amazon Web Services (AWS)  
**Sample type:** Original summary of public AWS documentation; not an AWS internal policy.  
**Source:** [AWS Shared Responsibility Model](https://aws.amazon.com/compliance/shared-responsibility-model/)

## Core idea

AWS describes security and compliance as a shared responsibility. AWS is responsible for security **of** the cloud, while customers are responsible for security **in** the cloud. The exact division depends on the AWS services selected and how they are used.

## AWS responsibilities

AWS operates and protects the underlying cloud infrastructure, including the facilities, hardware, networking, and virtualization layers that support its services.

## Customer responsibilities

Customers remain responsible for their data, identities, application configuration, and the security settings they control. For Amazon EC2, AWS identifies guest operating system updates and patches, customer-installed software, and security group configuration as customer responsibilities.

## Practical takeaway

Do not assume that moving a workload to AWS transfers every security task to AWS. Identify responsibilities service by service and configure the customer-controlled parts of the environment.

## Source note

This summary is for Atlas demonstration and training only. AWS's source page provides the authoritative, service-specific description.
