<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-unknown
[_metadata_:tag]:- #status-unknown
[_metadata_:tag]:- #language-unknown

<!-- deno-fmt-ignore-end -->

# [Materializing Microservice-oriented Architecture from Monolithic Object-oriented Source Code](https://doi.org/10.1007/978-3-031-11513-4_7)

## Abstract

Following the evolution of Cloud Computing and Service-Oriented Architecture
(SOA), microservices (MS) have naturally emerged as the next trend due to the
advantages they provide. These advantages include increased maintainability,
better scalability, and an overall better synergy with DevOps techniques. This
makes migrating legacy software towards a microservice-oriented architecture
(MSA) an attractive prospect for organizations. The migration process is a
complex and consequently risky endeavor that can be decomposed into two phases
(1) the microservice-based architecture recovery phase and (2) the
transformation (i.e. materialization) phase. Several studies have been done to
automate the microservice architecture recovery phase. However, to the best of
our knowledge, no work has been completed to automate the transformation phase.
In this paper, we propose a systematic approach to refactor the existing code of
an object-oriented monolithic application towards an MS-oriented one by using
the target architecture from the recovery phase as a guide. By defining and
applying a set of transformation patterns, we are able to generate a set of
deployable microservices. Finally, we validate our approach by automating it
through our tool MonoToMicro, and we apply it to a set of monolithic Java
applications to generate a set of MSAs.

## References

- [Microservices Identification Through Interface Analysis](./microservices-identification-through-interface-analysis.md)

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)
