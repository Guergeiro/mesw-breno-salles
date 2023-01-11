<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-static-analysis
[_metadata_:tag]:- #approach-dynamic-analysis
[_metadata_:tag]:- #status-tool
[_metadata_:tag]:- #language-java
[_metadata_:tag]:- #tool-unavailable

<!-- deno-fmt-ignore-end -->

# [Mono2Micro: a practical and effective tool for decomposing monolithic Java applications to microservices](https://doi.org/10.1145/3468264.3473915)

## Abstract

In migrating production workloads to cloud, enterprises often face the daunting
task of evolving monolithic applications toward a microservice architecture. At
IBM, we developed a tool called Mono2Micro to assist with this challenging task.
Mono2Micro performs spatio-temporal decomposition, leveraging well-defined
business use cases and runtime call relations to create functionally cohesive
partitioning of application classes. Our preliminary evaluation of Mono2Micro
showed promising results.

How well does Mono2Micro perform against other decomposition techniques, and how
do practitioners perceive the tool? This paper describes the technical
foundations of Mono2Micro and presents results to answer these two questions. To
answer the first question, we evaluated Mono2Micro against four existing
techniques on a set of open-source and proprietary Java applications and using
different metrics to assess the quality of decomposition and tool’s efficiency.
Our results show that Mono2Micro significantly outperforms state-of-the-art
baselines in specific metrics well-defined for the problem domain. To answer the
second question, we conducted a survey of twenty-one practitioners in various
industry roles who have used Mono2Micro. This study highlights several benefits
of the tool, interesting practitioner perceptions, and scope for further
improvements. Overall, these results show that Mono2Micro can provide a valuable
aid to practitioners in creating functionally cohesive and explainable
microservice decompositions.

## Tool Notes

https://www.ibm.com/cloud/mono2micro

Input: #source-code 
Output: #list-candidates 

## References

- [Microservices Identification Through Interface Analysis](./microservices-identification-through-interface-analysis.md)

- [From Monolith to Microservices: A Dataflow-Driven Approach](./from-monolith-to-microservices-a-dataflow-driven-approach.md)

- [Function-Splitting Heuristics for Discovery of Microservices in Enterprise Systems](./function-splitting-heuristics-for-discovery-of-microservices-in-enterprise-systems.md)

- [Graph Neural Network to Dilute Outliers for Refactoring Monolith Application](./graph-neural-network-to-dilute-outliers-for-refactoring-monolith-application.md)

- [Microservices Migration in Industry: Intentions, Strategies, and Challenges](./microservices-migration-in-industry-intentions-strategies-and-challenges.md)

- [From Monolith to Microservices: A Classification of Refactoring Approaches](./from-monolith-to-microservices-a-classification-of-refactoring-approaches.md)

- [Service Cutter: A Systematic Approach to Service Decomposition](./service-cutter-a-systematic-approach-to-service-decomposition.md)

- [Service Candidate Identification from Monolithic Systems Based on Execution Traces](./service-candidate-identification-from-monolithic-systems-based-on-execution-traces.md)

- [Functionality-Oriented Microservice Extraction Based on Execution Trace Clustering](./functionality-oriented-microservice-extraction-based-on-execution-trace-clustering.md)

- [Mono2Micro: an AI-based toolchain for evolving monolithic enterprise applications to a microservice architecture](./mono2micro-an-ai-based-toolchain-for-evolving-monolithic-enterprise-applications-to-a-microservice-architecture.md)

- [Towards a Technique for Extracting Microservices from Monolithic Enterprise Systems](./towards-a-technique-for-extracting-microservices-from-monolithic-enterprise-systems.md)

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)

- [Migrating Monolithic Mobile Application to Microservice Architecture: An Experiment Report](./migrating-monolithic-mobile-application-to-microservice-architecture-an-experiment-report.md)
