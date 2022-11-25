<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-static-analysis
[_metadata_:tag]:- #approach-dynamic-analysis
[_metadata_:tag]:- #approach-dependency
[_metadata_:tag]:- #approach-control-flow
[_metadata_:tag]:- #status-method
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [Microservice Decomposition via Static and Dynamic Analysis of the Monolith](https://doi.org/10.1109/ICSA-C50368.2020.00011)

## Abstract

Migrating monolithic software systems into microservices requires the
application of decomposition techniques to find and select appropriate service
boundaries. These techniques are often based on domain knowledge, static code
analysis, and non-functional requirements such as maintainability. In this
paper, we present our experience with an approach that extends static analysis
with dynamic analysis of a legacy software system's runtime behavior, including
the live trace visualization to support the decomposition into microservices.
Overall, our approach combines established analysis techniques for microservice
decomposition, such as the bounded context pattern of domain-driven design, and
enriches the collected information via dynamic software visualization to
identify appropriate microservice boundaries. In collaboration with the German
IT service provider adesso SE, we applied our approach to their real-word,
legacy lottery application in|FOCUS to identify good microservice decompositions
for this layered monolithic Enterprise Java system.

## References

- [Microservices Identification Through Interface Analysis](./microservices-identification-through-interface-analysis.md)
