<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-static-analysis
[_metadata_:tag]:- #approach-dynamic-analysis
[_metadata_:tag]:- #status-tool
[_metadata_:tag]:- #language-java

<!-- deno-fmt-ignore-end -->

# [Mono2Micro: an AI-based toolchain for evolving monolithic enterprise applications to a microservice architecture](https://doi.org/10.1145/3368089.3417933)

## Abstract

Mono2Micro is an AI-based toolchain that provides recommendations for
decomposing legacy web applications into microservice partitions. Mono2Micro
consists of a set of tools that collect static and runtime information from a
monolithic application and process the information using an AI-based technique
to generate recommendations for partitioning the application classes. Each
partition represents a candidate microservice or a grouping of classes with
similar business functionalities. Mono2Micro takes a temporo-spatial clustering
approach to compute meaningful and explainable partitions. It generates two
types of partition recommendations. First, it computes
business-logic-seams-based partitions that represent a desired encapsulation of
business functionalities. However, such a recommendation may cut across data
dependencies between classes, accommodating which could require significant
application updates. To address this, Mono2Micro computes natural-seams-based
partitions, which respect data dependencies. We describe the set of tools that
comprise Mono2Micro and illustrate them using a well-known open-source JEE
application.

## Tool Notes

https://www.ibm.com/cloud/mono2micro

## References

- [From Monolith to Microservices: A Dataflow-Driven Approach](./from-monolith-to-microservices-a-dataflow-driven-approach.md)

- [Function-Splitting Heuristics for Discovery of Microservices in Enterprise Systems](./function-splitting-heuristics-for-discovery-of-microservices-in-enterprise-systems.md)

- [Service Candidate Identification from Monolithic Systems Based on Execution Traces](./service-candidate-identification-from-monolithic-systems-based-on-execution-traces.md)

- [Towards a Technique for Extracting Microservices from Monolithic Enterprise Systems](./towards-a-technique-for-extracting-microservices-from-monolithic-enterprise-systems.md)

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)

- [Migrating Web Applications from Monolithic Structure to Microservices Architecture](./migrating-web-applications-from-monolithic-structure-to-microservices-architecture.md)
