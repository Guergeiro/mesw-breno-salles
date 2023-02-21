<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-problem-frames
[_metadata_:tag]:- #status-method
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [A Microservices Identification Approach based on Problem Frames](https://doi.org/10.1109/SEAI55746.2022.9832106)

## Abstract

As software grows in size continuously, traditional monolithic architecture is
difficult to upgrade and update. As a more flexible architecture, microservices
consist of smaller pieces or services that are loosely coupled and can be
deployed independently. More and more IT companies are adopting microservices
architecture. However, migrating to microservices is still a big challenge due
to the lack of a more systematic methodology on microservices identification.
Most existing studies on microservices identification are mainly based on
refactoring the system module rather than considering the actual functional
requirements. Therefore, we propose a microservices identification approach
based on the problem frames to address this challenge, which considers
real-world requirements. It relies on the merging process with the problem
diagram, where the problem domain is processed, and the causal chain is obtained
by searching the problem diagram. Subsequently, we calculate the correlation
degree of the domains in the problem diagram. Then, based on the calculated
correlation, we implement a clustering algorithm for the problem domains and get
the categorization result of the problem domains which is the initial
microservice candidate. The developers can consider each category of the problem
domain as a microservice by converting the problem domains into the
microservices. Finally, a case study verifies the validity of our proposed
approach.

## References

- [Mono2Micro: a practical and effective tool for decomposing monolithic Java applications to microservices](./mono2micro-a-practical-and-effective-tool-for-decomposing-monolithic-java-applications-to-microservices.md)

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)
