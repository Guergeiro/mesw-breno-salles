<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-feature
[_metadata_:tag]:- #status-tool
[_metadata_:tag]:- #language-java 
[_metadata_:tag]:- #tool-unavailable

<!-- deno-fmt-ignore-end -->

# [A Feature Table approach to decomposing monolithic applications into microservices](https://doi.org/10.1145/3457913.3457939)

## Abstract

Microservice architecture refers to the use of numerous small-scale and
independently deployed services, instead of encapsulating all functions into one
monolith. It has been a challenge in software engineering to decompose a
monolithic system into smaller parts. In this paper, we propose the Feature
Table approach, a structured approach to service decomposition based on the
correlation between functional features and microservices: (1) we defined the
concept of Feature Cards and 12 instances of such cards; (2) we formulated
Decomposition Rules to decompose monolithic applications; (3) we designed the
Feature Table Analysis Tool to provide semi-automatic analysis for
identification of microservices; and (4) we formulated Mapping Rules to help
developers implement microservice candidates. We performed a case study on Cargo
Tracking System to validate our microservice-oriented decomposition approach.
Cargo Tracking System is a typical case that has been decomposed by other
related methods (dataflow-driven approach, Service Cutter, and API Analysis).
Through comparison with the related methods in terms of specific coupling and
cohesion metrics, the results show that the proposed Feature Table approach can
deliver more reasonable microservice candidates, which are feasible in
implementation with semi-automatic support.

## Tool Notes

The tool provided is impossible to understand how it works as no explanation is
provided.

https://github.com/RLLDLBF/FeatureTable

Input: #source-code logic adapted to their requirements using Spring.
Output: Correlation weight between the modules #other

## References

- [Microservices Identification Through Interface Analysis](./microservices-identification-through-interface-analysis.md)
- [From Monolith to Microservices: A Dataflow-Driven Approach](./from-monolith-to-microservices-a-dataflow-driven-approach.md)
- [From Monolith to Microservices: A Classification of Refactoring Approaches](./from-monolith-to-microservices-a-classification-of-refactoring-approaches.md)
- [Service Cutter: A Systematic Approach to Service Decomposition](./service-cutter-a-systematic-approach-to-service-decomposition.md)
- [The ENTICE approach to decompose monolithic services into microservices](./the-entice-approach-to-decompose-monolithic-services-into-microservices.md)
- [A dataflow-driven approach to identifying microservices from monolithic applications](./a-dataflow-driven-approach-to-identifying-microservices-from-monolithic-applications.md)
