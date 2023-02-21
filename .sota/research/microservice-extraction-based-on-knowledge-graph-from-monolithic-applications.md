<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-dependency
[_metadata_:tag]:- #approach-domain
[_metadata_:tag]:- #status-method
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [Microservice extraction based on knowledge graph from monolithic applications](https://doi.org/10.1016/j.infsof.2022.106992)

## Abstract

Context Re-architecting monolithic systems with microservice architecture is a
common trend. However, determining the "optimal" size of individual services
during microservice extraction has been a challenge in software engineering.
Common limitations of the literature include not being reasonable enough to be
put into practical application; relying too much on human experience; neglection
of the impact of hardware environment on the performance.

Objective To address these problems, this paper proposes a novel method based on
knowledge-graph to support the extraction of microservices during the initial
phases of re-architecting existing applications.

Method According to the microservice extraction method based on the AKF
principle which is a widely practiced microservice design principle in the
industry, four kinds of entities and four types of entity-entity relationships
are designed and automatically extracted from specification and design artifacts
of the monolithic application to build the knowledge graph. A constrained
Louvain algorithm is proposed to identify microservice candidates.

Results Our approach is tested based on two open-source projects with the other
three typical methods: the domain-driven design-based method, the similarity
calculation-based method, and the graph clustering-based method . Conducted
experiments show that our method performs well concerning all the evaluation
metrics.

## References

- [Microservices Identification Through Interface Analysis](./microservices-identification-through-interface-analysis.md)

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)
