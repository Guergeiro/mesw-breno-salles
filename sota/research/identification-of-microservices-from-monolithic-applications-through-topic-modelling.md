<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-model
[_metadata_:tag]:- #status-tool
[_metadata_:tag]:- #language-java
[_metadata_:tag]:- #tool-available

<!-- deno-fmt-ignore-end -->

# [Identification of microservices from monolithic applications through topic modelling](https://doi.org/10.1145/3412841.3442016)

## Abtract

Microservices emerged as one of the most popular architectural patterns in the
recent years given the increased need to scale, grow and flexibilize software
projects accompanied by the growth in cloud computing and DevOps. Many software
applications are being submitted to a process of migration from its monolithic
architecture to a more modular, scalable and flexible architecture of
microservices. This process is slow and, depending on the project's complexity,
it may take months or even years to complete.

This paper proposes a new approach on microservice identification by resorting
to topic modelling in order to identify services according to domain terms. This
approach in combination with clustering techniques produces a set of services
based on the original software. The proposed methodology is implemented as an
open-source tool for exploration of monolithic architectures and identification
of microservices. A quantitative analysis using the state of the art metrics on
independence of functionality and modularity of services was conducted on 200
open-source projects collected from GitHub. Cohesion at message and domain level
metrics' showed medians of roughly 0.6. Interfaces per service exhibited a
median of 1.5 with a compact interquartile range. Structural and conceptual
modularity revealed medians of 0.2 and 0.4 respectively.

Our first results are positive demonstrating beneficial identification of
services due to overall metrics' results.

## Tool Notes

https://github.com/miguelfbrito/microservice-identification

Input: #source-code 
Output: #list-candidates 

## References

- [Microservices migration patterns](./microservices-migration-patterns.md)

- [From Monolith to Microservices: A Dataflow-Driven Approach](./from-monolith-to-microservices-a-dataflow-driven-approach.md)

- [Microservices Migration in Industry: Intentions, Strategies, and Challenges](./microservices-migration-in-industry-intentions-strategies-and-challenges.md)

- [Service Cutter: A Systematic Approach to Service Decomposition](./service-cutter-a-systematic-approach-to-service-decomposition.md)
- [Service Candidate Identification from Monolithic Systems Based on Execution Traces](./service-candidate-identification-from-monolithic-systems-based-on-execution-traces.md)
- [Functionality-Oriented Microservice Extraction Based on Execution Trace Clustering](./functionality-oriented-microservice-extraction-based-on-execution-trace-clustering.md)

- [Extracting Candidates of Microservices from Monolithic Application Code](./extracting-candidates-of-microservices-from-monolithic-application-code.md)

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)
