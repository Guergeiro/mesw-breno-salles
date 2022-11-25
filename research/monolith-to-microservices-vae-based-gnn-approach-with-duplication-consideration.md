<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-feature
[_metadata_:tag]:- #status-method
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [Monolith to Microservices: VAE-Based GNN Approach with Duplication Consideration](https://doi.org/10.1109/SOSE55356.2022.00007)

## Abstract

With the rise of cloud computing, many applications have been implemented into
microservices to fully utilize cloud computing for scalability and
maintainability purposes. However, there are some traditional monolith
applications that developers would like to partition into microservices.
Unfortunately, it is difficult to find a solution when considering multiple
factors (i.e., the strong dependency in each cluster and how often different
microservices communicate with each other). Further, because we allow
duplications of classes in multiple microservices to reduce the communications
between them, the number of duplicated classes is also another important factor
for maintainability. Therefore, we need to use machine learning algorithms to
approximate a good solution due to the infeasibility of finding the optimal
solution. We apply the variational autoencoder to extract features of classes
and use the fuzzy c means to group the classes into microservices according to
their extracted features. As a result, our approach outperforms the other
baselines in some significant metrics. Also, when we allow duplication, we find
that it is helpful in terms of reducing the overhead of communications between
microservices.

## References

- [An automatic extraction approach: transition to microservices architecture from monolithic application](./an-automatic-extraction-approach-transition-to-microservices-architecture-from-monolithic-application.md)

- [Mono2Micro: an AI-based toolchain for evolving monolithic enterprise applications to a microservice architecture](./mono2micro-an-ai-based-toolchain-for-evolving-monolithic-enterprise-applications-to-a-microservice-architecture.md)
