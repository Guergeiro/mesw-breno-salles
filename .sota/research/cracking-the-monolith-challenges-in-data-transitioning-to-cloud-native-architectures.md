<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-data-flow
[_metadata_:tag]:- #status-method
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [Cracking the monolith: challenges in data transitioning to cloud native architectures](https://doi.org/10.1145/3241403.3241440)

## Abstract

Application modernization is the process of transforming a monolithic
application to cloud native. This involves gradually building a new application
consisting of microservices, and running it in conjunction with the monolithic
application. Over a period of time, the functionality of the monolith shrinks
drastically or transforms into yet another microservice. Solution architects are
often faced with the task of ensuring this smooth transition - from monolith to
cloud native. For large and complex monoliths, this task is non-trivial as the
code base grows non-linearly over a period of time, thus posing multiple
challenges.

The complexity of a monolith is moved to the interconnections between
microservices, leading to multiple points of failure. This also has implications
on scalability and the need for replication. One of the biggest challenges is to
maintain data consistency and statefulness across the services and enable a
smooth transition of the data. Tracing performance issues also becomes complex
as a single transaction can encompass multiple service calls, along with
increased operational complexity due to increased demand of managing services.

In this paper, we envision an automated approach that will enable a smooth
transition from the monolith to microservices, thus alleviating the complexities
faced by a solution architect. Our system leverages the existing data schema
along with details obtained using profiling tools (in production or development
environment), to understand the data flow and access patterns and use this
information to to propose functional modules (microservices).

## References

- [Microservices Identification Through Interface Analysis](./microservices-identification-through-interface-analysis.md)

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)
