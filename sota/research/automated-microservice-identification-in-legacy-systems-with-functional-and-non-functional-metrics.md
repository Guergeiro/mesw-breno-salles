<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-logsteam
[_metadata_:tag]:- #status-method
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [Automated Microservice Identification in Legacy Systems with Functional and Non-Functional Metrics](https://doi.org/10.1109/ICSA47634.2020.00021)

## Abstract

Since microservice has merged as a promising architectural style with advantages
in maintainability, scalability, evolvability, etc., increasing companies choose
to restructure their legacy monolithic software systems as the microservice
architecture. However, it is quite a challenge to properly partitioning the
systems into suitable parts as microservices. Most approaches perform
microservices identification from a function-splitting perspective and with
sufficient legacy software artifacts. That may be not realistic in industrial
practices and possibly results in generating unexpected microservices. To
address this, we proposed an automated microservice identification (AMI)
approach that extracts microservices from the execution and performance logs
without providing documentation, models or source codes, while taking both
functional and non-functional metrics into considerations. Our work firstly
collects logs from the executable legacy system. Then, controller objects (COs)
are identified as the key objects to converge strongly related subordinate
objects (SOs). Subsequently, the relation between each pair of CO and SO is
evaluated by a relation matrix from both the functional and non-functional
perspective. We ultimately cluster classes(objects) into the microservices by
optimizing the multi-objective of high-cohesion-low-coupling and load balance.
The usefulness of the proposed approach is illustrated by applying to a case
study.

## References

- [An automatic extraction approach: transition to microservices architecture from monolithic application](./an-automatic-extraction-approach-transition-to-microservices-architecture-from-monolithic-application.md)

- [Microservices Identification Through Interface Analysis](./microservices-identification-through-interface-analysis.md)

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)
