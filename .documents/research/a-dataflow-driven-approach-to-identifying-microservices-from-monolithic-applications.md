<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-data-flow
[_metadata_:tag]:- #status-algorithm
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [A dataflow-driven approach to identifying microservices from monolithic applications](https://doi.org/10.1016/j.jss.2019.07.008)

## Abstract

Microservices architecture emphasizes employing multiple small-scale and
independently deployable microservices, rather than encapsulating all function
capabilities into one monolith. Correspondingly, microservice-oriented
decomposition, which has been identified to be an extremely challenging task,
plays a crucial and prerequisite role in developing microservice-based systems.
To address the challenges in such a task, we propose a dataflow-driven
semi-automatic decomposition approach. In particular, a four-step decomposition
procedure is defined: (1) conduct the business requirement analysis to generate
use case and business logic specification; (2) construct the fine-grained Data
Flow Diagrams (DFD) and the process-datastore version of DFD (DFDPS)
representing the business logics; (3) extract the dependencies between processes
and datastores into decomposable sentence sets; and (4) identify candidate
microservices by clustering processes and their closely related datastores into
individual modules from the decomposable sentence sets. To validate this
microservice-oriented decomposition approach, we performed a case study on Cargo
Tracking System that is a typical case decomposed by other microservices
identification methods (Service Cutter and API Analysis), and made comparisons
in terms of specific coupling and cohesion metrics. The results show that the
proposed dataflow-driven decomposition approach can recommend microservice
candidates with sound coupling and cohesion through a rigorous and
easy-to-operate implementation with semi-automatic support.

## References

- [Microservices Identification Through Interface Analysis](./microservices-identification-through-interface-analysis.md)

- [From Monolith to Microservices: A Dataflow-Driven Approach](./from-monolith-to-microservices-a-dataflow-driven-approach.md)

- [Service Cutter: A Systematic Approach to Service Decomposition](./service-cutter-a-systematic-approach-to-service-decomposition.md)

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)
