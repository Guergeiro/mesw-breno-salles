<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-data-flow
[_metadata_:tag]:- #approach-control-flow
[_metadata_:tag]:- #status-method
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [An Approach for Identifying Microservices using Clustering on Control Flow and Data Flow](https://www.researchgate.net/profile/Niko-Benkler/publication/332590138_An_Approach_for_Identifying_Microservices_using_Clustering_on_Control_Flow_and_Data_Flow/links/5cbf273b299bf1209779a9af/An-Approach-for-Identifying-Microservices-using-Clustering-on-Control-Flow-and-Data-Flow.pdf)

## Abstract

Powered by the rise of cloud computing, agile development, DevOps and continuous
deployment strategies, the microservice architectural pattern emerged as an
alternative to monolithic software design. Microservices, as a suite of
independent, highly cohesive and loosely coupled services, overcome the
shortcoming of centralized monolithic architectures. Therefore, prominent
companies recently (re-)designed their applications using the microservice
architecture. The key challenge is to nd an appropriate partition of the
(legacy) application - namely microservice identication. So far, the
identication process is done intuitively based on the experience of system
architects and software engineers, mainly by virtue of missing formal approaches
and a lack of automated tool support. However, when applications grow in size
and become progressively complex, it is quite demanding to decompose the system
in appropriate microservices. To tackle this challenge, the thesis provides a
graph-based identication approach using clustering techniques. Starting with
business processes, the approach uses control ow and data ow dependencies to
build two weighted graphs. From that, clustering techniques identify high
cohesive sets of activity clusters on the one hand and data object clusters on
the other. Finally, those sets are matched to generate compound clusters of
activities and corresponding data objects. Each compound cluster corresponds to
a microservice candidate. An evaluation demonstrates that the (semi-)automated
approach identies adequate microservice candidates which are similar to a manual
decomposition but identied with less expertise.

## References

- [Microservices Identification Through Interface Analysis](./microservices-identification-through-interface-analysis.md)

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)
