<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-data-flow
[_metadata_:tag]:- #status-algorithm
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [From Monolith to Microservices: A Dataflow-Driven Approach](https://doi.org/10.1109/APSEC.2017.53)

## Abstract

Emerging from the agile practitioner communities, the microservice-oriented
architecture emphasizes implementing and employing multiple small-scale and
independently deployable microservices, rather than encapsulating all function
capabilities into one monolithic application. Correspondingly,
microservice-oriented decomposition, which has been identified to be an
extremely challenging and complex task, plays a crucial and prerequisite role in
developing microservice-based software systems. To address this challenge and
reduce the complexity, we proposed a top-down analysis approach and developed a
dataflow-driven decomposition algorithm. In brief, a three-step process is
defined: first, engineers together with users conduct business requirement
analysis and construct a purified while detailed dataflow diagram of the
business logic; then, our algorithm combines the same operations with the same
type of output data into a virtual abstract dataflow; finally, the algorithm
extracts individual modules of "operation and its output data" from the virtual
abstract dataflow to represent the identified microservice candidates. We have
employed two use cases to demonstrate our microservice identification mechanism,
as well as making comparisons with an existing microservice identification tool.
The comparison and evaluation show that, our dataflow-driven identification
mechanism is able to deliver more rational, objective, understandable and
consistent microservice candidates, through a more rigorous and practical
implementation procedure.

## References

- [The ENTICE approach to decompose monolithic services into microservices](./the-entice-approach-to-decompose-monolithic-services-into-microservices.md)

- [Service Cutter: A Systematic Approach to Service Decomposition](./service-cutter-a-systematic-approach-to-service-decomposition.md)
