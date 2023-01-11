<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-transactional-contexts
[_metadata_:tag]:- #status-tool
[_metadata_:tag]:- #language-java
[_metadata_:tag]:- #tool-available

<!-- deno-fmt-ignore-end -->

# [From a Monolith to a Microservices Architecture: An Approach Based on Transactional Contexts](https://doi.org/10.1007/978-3-030-29983-5_3)

## Abstract

Microservices have become the software architecture of choice for business
applications. Initially originated at Netflix and Amazon, they result from the
need to partition, both, software development teams and executing components,
to, respectively, foster agile development and horizontal scalability.
Currently, there is a large number of monolith applications that are being
migrated to a microservices architecture. This article proposes the
identification of business applications transactional contexts for the design of
microservices. Therefore, the emphasis is to drive the aggregation of domain
entities by the transactional contexts where they are executed, instead of by
their domain structural inter-relationships. Additionally, we propose a complete
workflow for the identification of microservices together with a set of tools
that assist the developers on this process. The comparison of our approach with
another software architecture tool and with an expert decomposition in two case
studies revealed high precision values, which reflects that accurate service
candidates are produced, while providing visualization perspectives facilitates
the analysis of the impact of the decomposition on the application business
logic.

## Tool Notes

https://github.com/socialsoftware/mono2micro

Input: #source-code 
Output: #list-candidates 

## References

- [Microservices Identification Through Interface Analysis](./microservices-identification-through-interface-analysis.md)
