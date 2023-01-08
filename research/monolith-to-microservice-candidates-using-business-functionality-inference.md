<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-static-analysis
[_metadata_:tag]:- #approach-control-flow
[_metadata_:tag]:- #status-tool
[_metadata_:tag]:- #language-java
[_metadata_:tag]:- #tool-available

<!-- deno-fmt-ignore-end -->

# [Monolith to Microservice Candidates using Business Functionality Inference](https://doi.org/10.1109/ICWS53863.2021.00104)

## Abstract

In this paper, we propose a novel approach for monolith decomposition, that maps
the implementation structure of a monolith application to a functional structure
that in turn can be mapped to business functionality. First, we infer the
classes in the monolith application that are distinctively representative of the
business functionality in the application domain. This is done using formal
concept analysis on statically determined code flow structures in a completely
automated manner. Then, we apply a clustering technique, guided by the inferred
representatives, on the classes belonging to the monolith to group them into
different types of partitions, mainly: 1) functional groups representing
microservice candidates, 2) a utility class group, and 3) a group of classes
that require significant refactoring to enable a clean microservice
architecture. This results in microservice candidates that are naturally aligned
with the different business functions exposed by the application. A detailed
evaluation on four publicly available applications show that our approach is
able to determine better quality microservice candidates when compared to other
existing state of the art techniques. We also conclusively show that clustering
quality metrics like modularity are not reliable indicators of microservice
candidate goodness.

## Tool Notes

https://github.com/gmazlami/microserviceExtraction-backend

## References

- [Mono2Micro: an AI-based toolchain for evolving monolithic enterprise applications to a microservice architecture](./mono2micro-an-ai-based-toolchain-for-evolving-monolithic-enterprise-applications-to-a-microservice-architecture.md)

- [Microservices Identification Through Interface Analysis](./microservices-identification-through-interface-analysis.md)

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)
