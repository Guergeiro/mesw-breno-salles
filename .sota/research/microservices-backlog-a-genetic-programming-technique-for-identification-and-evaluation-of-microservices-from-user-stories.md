<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-business
[_metadata_:tag]:- #approach-domain
[_metadata_:tag]:- #status-method
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [Microservices Backlog–A Genetic Programming Technique for Identification and Evaluation of Microservices From User Stories](https://doi.org/10.1109/ACCESS.2021.3106342)

## Abstract

The microservice granularity directly affects the quality attributes and usage
of computational resources of the system, determining optimal microservice
granularity is an open research topic. Microservices granularity is defined by
the number of operations exposed by the microservice, the number of
microservices that compose the whole application, and its complexity and
dependencies. This paper describes “Microservice Backlog (MB)”, a semiautomatic
model for defining and evaluating the granularity of microservice-based
applications; MB uses genetic programming technique to calculate at design time
the granularity of each microservice from the user stories in the “product
backlog” or release planning; the genetic algorithm combined coupling, cohesion,
granularity, semantic similarity, and complexity metrics to define the number of
microservices, and the user stories associated with each microservice. MB
decomposes the candidate microservices, allowing to analyze graphically the size
of each microservice, as well as its complexity, dependencies, coupling,
cohesion metrics, and the number of calls or requests between microservices. The
resulting decomposition (number of microservices and their granularity)
performed by MB shows less coupling, higher cohesion, less complexity, fewer
user stories associated with each microservice, and fewer calls among
microservices. MB was validated against three existing methods, using two
state-of-the-art applications (Cargo Tracking and JPet-Store), and one real-life
application (Foristom Conferences). The development team and/or architect can
use metrics to identify the critical points of the system and determine at
design time how the microservice-based application will be implemented.

## References

- [Migrating Web Applications from Monolithic Structure to Microservices Architecture](./migrating-web-applications-from-monolithic-structure-to-microservices-architecture.md)

- [A logical architecture design method for microservices architectures](./a-logical-architecture-design-method-for-microservices-architectures.md)

- [Microservices Identification Through Interface Analysis](./microservices-identification-through-interface-analysis.md)

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)
