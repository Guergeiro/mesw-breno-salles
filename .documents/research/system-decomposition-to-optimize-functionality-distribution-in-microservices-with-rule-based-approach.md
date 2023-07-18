<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-dynamic-analysis
[_metadata_:tag]:- #approach-semantic-analysis
[_metadata_:tag]:- #status-method
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [System Decomposition to Optimize Functionality Distribution in Microservices with Rule Based Approach](https://doi.org/10.1109/SOSE49046.2020.00015)

## Abstract

The microservice architecture is an architecture in which a single system is
divided into small independently deployed services that are orchestrated
together with the use of a lightweight mechanism. Each microservice does not
rely much on other microservices (low coupling), but rather on its own resources
to perform its task (high cohesion). This paper proposes a novel methodology
which decomposes a monolith or other system into microservices in such a way
that each microservice will function independently of other microservices while
preserving some other key features, with the functionality distribution across
each microservice being optimized with regards to usage of the functionality.
This methodology makes use of dynamic analysis to identify resources that play a
role in enabling the microservice to fulfill its functionality. We establish a
set of rules which allows optimized distribution of the functionality. We
evaluate the approach by applying it to real systems.

## References

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)
