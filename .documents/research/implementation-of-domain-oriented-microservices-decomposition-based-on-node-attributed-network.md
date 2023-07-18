<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-static-analysis
[_metadata_:tag]:- #approach-dynamic-analysis
[_metadata_:tag]:- #approach-control-flow
[_metadata_:tag]:- #status-method
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [Implementation of Domain-oriented Microservices Decomposition based on Node-attributed Network](https://doi.org/10.1145/3524304.3524325)

## Abtract

The features of microservices, such as scalability and maintainability, have
attracted the industry to migrate monolithic projects to microservices. However,
how to decompose microservices during migration is a tricky problem. At present,
microservices decomposition mainly relies on architects or domain experts, which
is more subjective and time-consuming. Followed by semi-automated or automated
microservice decomposition, such methods produce coarse-grained results affected
by different system characteristics, which cannot make desired decomposition
according to the migration requirements of domains. Therefore, this paper
proposes a domain-oriented fine-grained microservices decomposition resolution
scheme. It uses dynamic and static analysis to obtain the invocation
relationships and invocation times between entity methods and the response time
of entity methods to represent three main system characteristics concerned
during the migration: function, inter-service communications, and performance.
And express the above information of monolith by the node-attributed network.
Then it uses the community detection algorithm and the proposed similar
hierarchical clustering algorithm to complete objective and effective
decomposition. Finally, the rationality and feasibility of the proposed approach
are verified using the JPetStore case.

## References

- [Microservice Decomposition via Static and Dynamic Analysis of the Monolith](./microservice-decomposition-via-static-and-dynamic-analysis-of-the-monolith.md)

- [Service Candidate Identification from Monolithic Systems Based on Execution Traces](./service-candidate-identification-from-monolithic-systems-based-on-execution-traces.md)

- [A Microservice Decomposition Method Through Using Distributed Representation of Source Code](./a-microservice-decomposition-method-through-using-distributed-representation-of-source-code.md)

- [An automatic extraction approach: transition to microservices architecture from monolithic application](./an-automatic-extraction-approach-transition-to-microservices-architecture-from-monolithic-application.md)

- [A New Decomposition Method for Designing Microservices](./a-new-decomposition-method-for-designing-microservices.md)

- [A dataflow-driven approach to identifying microservices from monolithic applications](./a-dataflow-driven-approach-to-identifying-microservices-from-monolithic-applications.md)
