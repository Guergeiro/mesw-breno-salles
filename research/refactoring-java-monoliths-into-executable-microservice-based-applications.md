<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-data
[_metadata_:tag]:- #status-tool
[_metadata_:tag]:- #language-java
[_metadata_:tag]:- #tool-available

<!-- deno-fmt-ignore-end -->

# [Refactoring Java Monoliths into Executable Microservice-Based Applications](https://doi.org/10.1145/3475061.3475086)

## Abtract

In the last few years we have been seeing a drastic change in the way software
is developed. Large-scale software projects are being assembled by a flexible
composition of many (small) components possibly written in different programming
languages and deployed anywhere in the cloud – the so-called microservice-based
applications.

The dramatic growth in popularity of microservice-based applications has pushed
several companies to apply major refactorings to their software systems.
However, this is a challenging task that may take several months or even years.

We propose a methodology to automatically evolve a Java monolithic application
into a microservice-based one. Our methodology receives the Java code and a
proposition of microservices and refactors the original classes to make each
microservice independent. Our methodology creates an API for each method call to
classes that are in other services. The database entities are also refactored to
be included in the corresponding service. The initial evaluation shows that our
tool can successfully refactor 80% of the applications tested.

## Tool Notes

https://github.com/FranciscoFreitas45/MicroRefact

## References

- [From monolithic systems to Microservices: An assessment framework](./from-monolithic-systems-to-microservices-an-assessment-framework.md)

- [Microservices migration patterns](./microservices-migration-patterns.md)

- [From Monolith to Microservices: A Dataflow-Driven Approach](./from-monolith-to-microservices-a-dataflow-driven-approach.md)

- [Service Candidate Identification from Monolithic Systems Based on Execution Traces](./service-candidate-identification-from-monolithic-systems-based-on-execution-traces.md)

- [Functionality-Oriented Microservice Extraction Based on Execution Trace Clustering](./functionality-oriented-microservice-extraction-based-on-execution-trace-clustering.md)

- [Extracting Candidates of Microservices from Monolithic Application Code](./extracting-candidates-of-microservices-from-monolithic-application-code.md)

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)
