<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-domain
[_metadata_:tag]:- #approach-neural
[_metadata_:tag]:- #status-tool
[_metadata_:tag]:- #language-agnostic
[_metadata_:tag]:- #tool-unavailable

<!-- deno-fmt-ignore-end -->

# [Microservices identification methods and quality metrics](https://repozitorium.omikk.bme.hu/bitstream/handle/10890/16951/ertekezes.pdf)

## Abstract

The dissertation presents different methods for decomposing monolithic
applications into microservices ones based on different objectives. These
objectives are maintain ability, evolution, and scalability. Also, it presents a
set of evaluation metrics for measuring the overall design quality of a
microservices application. Three microservices identification methods were
presented in this dissertation. Two methods focus on maintainability and
scalability, while the other method is focusing on evolution. Evolution can be
defined as the continuous process of changing the application throughout its
life cycle for various reasons. The first method uses the application
programming interface as an input for analysis. The proposed decomposition
methodology uses word embedding models to obtain word representations using
operation names, as well as, using a hierarchical clustering algorithm to group
similar operation names together in order to get suitable microservices. This
method is suitable for less complex applications and it is utilized for the
purposes of maintainability and scalability. The second algorithm is a novel
decomposition method for refactoring monolithic applications into microservices
applications using a neural network model (code2vec) for creating code
embeddings from the monolithic application source code. As a result,
semantically similar code embeddings are clustered through a hierarchical
clustering algorithm to produce microservices candidates to resemble the domain
model more efficiently. This method is utilized for the purpose of evolution.
The third method consists of two parts, the first part is representing the
source code of the monolithic application as a class dependency graph. This
graph represents the structure of the monolithic application and the
relationships between the classes of the application. The second part of the
method is a graph clustering algorithm to identify the microservices through
analyzing the dependencies between the classes of the monolithic application and
cluster classes with solid relationships to generate microservice candidates.
This method is suitable for complex applications and it is utilized for the
purposes of maintainability and scalability. In this dissertation a set of
metrics for microservices architecture applications was introduced. The proposed
metrics are the Service Granularity Metric (SGM), the Lack of Cohesion Metric
(LCOM), and the Number of Operations (NOO). The proposed metrics measure the
granularity, cohesion, and complexity of individual microservices through
analyzing the application programming interface. Two points influenced the
introduction of these metrics. First point, the lack of empirical research on
the evaluation metrics for microservices design. The second point is the need
for a new approach to analyze the quality of a microservices design through
utilizing the APIs which can provide a different layer of analysis for quality
metrics.

## Tool Notes

https://github.com/eventuate-examples/es-kanban-board
https://github.com/arun-gupta/microservices

## References

- [Microservices Identification Through Interface Analysis](./microservices-identification-through-interface-analysis.md)
