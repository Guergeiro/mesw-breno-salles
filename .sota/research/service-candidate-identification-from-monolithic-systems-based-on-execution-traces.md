<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-feature
[_metadata_:tag]:- #status-method
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [Service Candidate Identification from Monolithic Systems Based on Execution Traces](https://doi.org/10.1109/TSE.2019.2910531)

## Abstract

Monolithic systems increasingly suffer from maintainability and scalability
issues as they grow in functionality, size, and complexity. It is widely
believed that (micro)service-based architectures can alleviate these problems as
each service is supposed to have the following characteristics: clearly defined
functionality, sufficient modularity, and the ability to evolve independently.
Industrial practices show that service extraction from a legacy monolithic
system is labor-intensive and complex. Existing work on service candidate
identification aims to group entities of a monolithic system into potential
service candidates, but this process has two major challenges: first, it is
difficult to extract service candidates with consistent quality; second, it is
hard to evaluate the identified service candidates regarding the above three
characteristics. To address these challenges, this paper proposes the
Functionality-oriented Service Candidate Identification (FoSCI) framework to
identify service candidates from a monolithic system. Our approach is to record
the monolith's execution traces, and extract services candidates using a
search-based functional atom grouping algorithm. We also contribute a
comprehensive service candidate evaluation suite that uses interface
information, structural/conceptual dependency, and commit history. This
evaluation system consists of 8 metrics, measuring functionality, modularity,
and evolvability respectively of identified service candidates. We compare FoSCI
with three existing methods, using 6 widely-used open-source projects as our
evaluation subjects. Our results show that FoSCI outperforms existing methods in
most measures.

## References

- [Functionality-Oriented Microservice Extraction Based on Execution Trace Clustering](./functionality-oriented-microservice-extraction-based-on-execution-trace-clustering.md)

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)

- [Towards a Technique for Extracting Microservices from Monolithic Enterprise Systems](./towards-a-technique-for-extracting-microservices-from-monolithic-enterprise-systems.md)

- [From Monolith to Microservices: A Dataflow-Driven Approach](./from-monolith-to-microservices-a-dataflow-driven-approach.md)

- [Service Cutter: A Systematic Approach to Service Decomposition](./service-cutter-a-systematic-approach-to-service-decomposition.md)
