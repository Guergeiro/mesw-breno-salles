<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-static-analysis
[_metadata_:tag]:- #approach-dynamic-analysis
[_metadata_:tag]:- #approach-dependency
[_metadata_:tag]:- #approach-data-flow
[_metadata_:tag]:- #approach-feature
[_metadata_:tag]:- #status-method
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [Migrating Web Applications from Monolithic Structure to Microservices Architecture](https://doi.org/10.1145/3275219.3275230)

## Abstract

In the traditional software development and deployment, the centralized
monolithic is always adopted, as the modules are tightly coupled, which caused
many inconvenience in software DevOps. The modules with bottlenecks in
monolithic application cannot be extend separately as the application is an
integral part, and different module cannot use different technology stack. To
prolong the lifecycle of the monolithic applications, its need to migrated it to
microservice architecture. Due to the complex logic and large number of third
party framework libraries depended, get an accurate comprehensive of the
application characteristics is challenging. The existing research mostly based
on the static characteristics, lack of consideration of the runtime dynamic
characteristics, and the completeness and accuracy of the static analysis is
inadequate. To resolve above problems, we combined static and dynamic analysis
to get static structure and runtime behavior characteristics of monolithic
application. We employed the coupling among functions to evaluate the degree of
dependence, and through function clustering to achieve the migration of legacy
monolithic applications and its data to microservices architecture. Through the
empirical study of migrate the typical legacy project to microservices, it is
proved that we proposed method can offer precise guidance and assistance in the
migration procedure. Experiments show that the method has high accuracy and low
performance cost.

## References

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)

- [Towards a Technique for Extracting Microservices from Monolithic Enterprise Systems](./towards-a-technique-for-extracting-microservices-from-monolithic-enterprise-systems.md)

- [From Monolith to Microservices: A Dataflow-Driven Approach](./from-monolith-to-microservices-a-dataflow-driven-approach.md)

- [Service Cutter: A Systematic Approach to Service Decomposition](./service-cutter-a-systematic-approach-to-service-decomposition.md)
