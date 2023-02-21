<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-model
[_metadata_:tag]:- #status-tool
[_metadata_:tag]:- #language-java
[_metadata_:tag]:- #tool-available

<!-- deno-fmt-ignore-end -->

# [A Model-Driven Approach Towards Automatic Migration to Microservices](https://doi.org/10.1007/978-3-030-39306-9_2)

## Abstract

Microservices have received and are still receiving an increasing attention,
both from academia and the industrial world. To guarantee scalability and
availability while developing modern software systems, microservices allow
developers to realize complex systems as a set of small services that operate
independently and that are easy to maintain and evolve. Migration from
monolithic applications to microservices-based application is a challenging task
that very often it is done manually by the developers taking into account the
main business functionalities of the input application and without a supporting
tool. In this paper, we present a model-driven approach for the automatic
migration to microservices. The approach is implemented by means of JetBrains
MPS, a text-based metamodelling framework, and validated using a first migration
example from a Java-based application to Jolie - a programming language for
defining microservices.

## Tool Notes

https://github.com/antbucc/Migration

Input: #source-code 
Output: #microservice (jolies files and docker)

