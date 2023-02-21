<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #other-framework

<!-- deno-fmt-ignore-end -->

# [Service Cutter: A Systematic Approach to Service Decomposition](https://doi.org/10.1007/978-3-319-44482-6_12)

## Abstract

Decomposing a software system into smaller parts always has been a challenge in
software engineering. It is particularly important to split distributed systems
into loosely coupled and highly cohesive units. Service-oriented architectures
and their microservices deployments tackle many related problems, but remain
vague on how to cut a system into discrete, autonomous, network-accessible
services. In this paper, we propose a structured, repeatable approach to service
decomposition based on 16 coupling criteria distilled from the literature and
industry experience. These coupling criteria form the base of Service Cutter,
our method and tool framework for service decomposition. In the Service Cutter
approach, coupling information is extracted from software engineering artifacts
such as domain models and use cases and represented as an undirected, weighted
graph to find and score densely connected clusters. The resulting candidate
service cuts promise to reduce coupling between and promote high cohesion within
services. In our validation activities, which included prototyping, action
research and case studies, we successfully decomposed two sample applications
with acceptable performance; most (but not all) test scenarios resulted in
appropriate service cuts. These results as well as early feedback from members
of the target audience in industry and academia suggest that our coupling
criteria catalog and tool-supported service decomposition approach have the
potential to assist a service architect’s design decisions in a viable and
practical manner.

## References
