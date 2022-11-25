<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-cohesion
[_metadata_:tag]:- #approach-coupling
[_metadata_:tag]:- #status-method
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [Improving microservices extraction using evolutionary search](https://doi.org/10.1016/j.infsof.2022.106996)

## Abstract

Context: Microservices constitute a modern style of building software
applications as collections of small, cohesive, and loosely coupled services,
i.e., modules, that are developed, deployed, and scaled independently.

Objective: The migration from legacy systems towards the microservice-based
architecture is not a trivial task. It is still manual, time-consuming,
error-prone and subsequently costly. The most critical and challenging issue is
the cost-effective identification of microservices boundaries that ensure
adequate granularity and cohesiveness.

Method: To address this problem, we introduce in this paper a novel approach,
named MSExtractor , that formulates microservices identification as a
multi-objective optimization problem. The proposed solution aims at decomposing
a legacy application into a set of cohesive, loosely-coupled and coarse-grained
services. We employ the Indicator-Based Evolutionary Algorithm (IBEA) to drive a
search process towards optimal microservices identification while considering
structural and semantic dependencies in the source code.

Results: We conduct an empirical evaluation on a benchmark of seven software
systems to assess the efficiency of our approach. Results show that MSExtractor
is able to carry out an effective identification of relevant microservice
candidates and outperforms three other existing approaches.

Conclusion: In this paper, we show that MSExtractor is able to extract cohesive
and loosely coupled services with higher performance than three other considered
methods. However, we advocate that while automated microservices identification
approaches are very helpful, the role of the human experts remains crucial to
validate and calibrate the extracted microservices.

## References

- [Identification of microservices from monolithic applications through topic modelling](./identification-of-microservices-from-monolithic-applications-through-topic-modelling.md)

- [Refactoring Java Monoliths into Executable Microservice-Based Applications](./refactoring-java-monoliths-into-executable-microservice-based-applications.md)

- [Mono2Micro: a practical and effective tool for decomposing monolithic Java applications to microservices](./mono2micro-a-practical-and-effective-tool-for-decomposing-monolithic-java-applications-to-microservices.md)

- [Microservices Identification Through Interface Analysis](./microservices-identification-through-interface-analysis.md)

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)
