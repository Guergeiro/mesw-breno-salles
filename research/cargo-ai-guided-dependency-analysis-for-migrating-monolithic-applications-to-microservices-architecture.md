<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-dependency
[_metadata_:tag]:- #approach-data-flow
[_metadata_:tag]:- #status-tool
[_metadata_:tag]:- #language-java

<!-- deno-fmt-ignore-end -->

# [CARGO: AI-Guided Dependency Analysis for Migrating Monolithic Applications to Microservices Architecture](https://doi.org/10.48550/arXiv.2207.11784)

## Abstract

Microservices Architecture (MSA) has become a de-facto standard for designing
cloud-native enterprise applications due to its efficient infrastructure setup,
service availability, elastic scalability, dependability, and better security.
Existing (monolithic) systems must be decomposed into microservices to harness
these characteristics. Since manual decomposition of large scale applications
can be laborious and error-prone, AI-based systems to detect decomposition
strategies are gaining popularity. However, the usefulness of these approaches
is limited by the expressiveness of the program representation and their
inability to model the application's dependency on critical external resources
such as databases. Consequently, partitioning recommendations offered by current
tools result in architectures that result in (a) distributed monoliths, and/or
(b) force the use of (often criticized) distributed transactions. This work
attempts to overcome these challenges by introducing CARGO({short for
[C]ontext-sensitive l[A]bel p[R]opa[G]ati[O]n})-a novel un-/semi-supervised
partition refinement technique that uses a context- and flow-sensitive system
dependency graph of the monolithic application to refine and thereby enrich the
partitioning quality of the current state-of-the-art algorithms. CARGO was used
to augment four state-of-the-art microservice partitioning techniques that were
applied on five Java EE applications (including one industrial scale proprietary
project). Experiments demostrate that CARGO can improve the partition quality of
all modern microservice partitioning techniques. Further, CARGO substantially
reduces distributed transactions and a real-world performance evaluation of a
benchmark application (deployed under varying loads) shows that CARGO also
lowers the overall the latency of the deployed microservice application by 11%
and increases throughput by 120% on average.

## Tool Notes

https://github.com/wala/WALA
https://github.com/konveyor/tackle-data-gravity-insights

## References

- [Mono2Micro: a practical and effective tool for decomposing monolithic Java applications to microservices](./mono2micro-a-practical-and-effective-tool-for-decomposing-monolithic-java-applications-to-microservices.md)

- [Mono2Micro: an AI-based toolchain for evolving monolithic enterprise applications to a microservice architecture](./mono2micro-an-ai-based-toolchain-for-evolving-monolithic-enterprise-applications-to-a-microservice-architecture.md)

- [Microservices Identification Through Interface Analysis](./microservices-identification-through-interface-analysis.md)

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)
