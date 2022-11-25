<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-dependency
[_metadata_:tag]:- #status-method
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [A Hierarchical DBSCAN Method for Extracting Microservices from Monolithic Applications](https://doi.org/10.1145/3530019.3530040)

## Abstract

The microservices architectural style offers many advantages such as
scalability, reusability and ease of maintainability. As such microservices has
become a common architectural choice when developing new applications. Hence, to
benefit from these advantages, monolithic applications need to be redesigned in
order to migrate to a microservice based architecture. Due to the inherent
complexity and high costs related to this process, it is crucial to automate
this task. In this paper, we propose a method that can identify potential
microservices from a given monolithic application. Our method takes as input the
source code of the source application in order to measure the similarities and
dependencies between all of the classes in the system using their interactions
and the domain terminology employed within the code. These similarity values are
then used with a variant of a density-based clustering algorithm to generate a
hierarchical structure of the recommended microservices while identifying
potential outlier classes. We provide an empirical evaluation of our approach
through different experimental settings including a comparison with existing
human-designed microservices and a comparison with 5 baselines. The results show
that our method succeeds in generating microservices that are overall more
cohesive and that have fewer interactions in-between them with up to 0.9 of
precision score when compared to human-designed microservices.

## References

- [A Microservice Decomposition Method Through Using Distributed Representation of Source Code](./a-microservice-decomposition-method-through-using-distributed-representation-of-source-code.md)

- [Graph Neural Network to Dilute Outliers for Refactoring Monolith Application](./graph-neural-network-to-dilute-outliers-for-refactoring-monolith-application.md)

- [Migrating to Microservices](./migrating-to-microservices.md)

- [Service Candidate Identification from Monolithic Systems Based on Execution Traces](./service-candidate-identification-from-monolithic-systems-based-on-execution-traces.md)

- [Mono2Micro: a practical and effective tool for decomposing monolithic Java applications to microservices](./mono2micro-a-practical-and-effective-tool-for-decomposing-monolithic-java-applications-to-microservices.md)

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)

- [Towards Automated Microservices Extraction Using Muti-objective Evolutionary Search](./towards-automated-microservices-extraction-using-muti-objective-evolutionary-search.md)
