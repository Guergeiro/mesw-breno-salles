<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-data
[_metadata_:tag]:- #status-method
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [Towards Migrating Legacy Software Systems to Microservice-based Architectures: a Data-Centric Process for Microservice Identification](https://doi.org/10.1109/ICSA-C54293.2022.00010)

## Abstract

"Microservice-based architecture" is an architectural style exploited to develop
software systems with the main concern of independent maintainability,
deployability and scalability. These important capabilities in modern software
development and operation settings led many companies to migrate their existing
(legacy) monolithic software systems towards microservice-based architectures.
The migration process is a challenging task. It requires splitting the system
into consistent parts that represent the set of microservices. Existing works
focus mainly on functional aspects in this splitting. We argue in this work that
it would be beneficial to start this splitting by decomposing the database into
clusters, where the data in each cluster is associated to a microservice’s own
independent database. This is commonly known as the "database-per-service"
pattern in microservice architectures. This paper proposes our preliminary work
on a data-centric process to identify microservices. This process performs
database schema analysis and clustering in order to make topic identification.
It aims at identifying a set of topics which correspond to potential
microservices.

## References

- [Identification of microservices from monolithic applications through topic modelling](./identification-of-microservices-from-monolithic-applications-through-topic-modelling.md)

- [Mono2Micro: a practical and effective tool for decomposing monolithic Java applications to microservices](./mono2micro-a-practical-and-effective-tool-for-decomposing-monolithic-java-applications-to-microservices.md)
