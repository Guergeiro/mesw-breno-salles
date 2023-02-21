<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-rest
[_metadata_:tag]:- #status-algorithm
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [Extracting Microservices’ Candidates from Monolithic Applications: Interface Analysis and Evaluation Metrics Approach](https://doi.org/10.1109/SoSE50414.2020.9130466)

## Abstract

There is a migration trend toward microservices architecture coming from the
monolithic applications. This research proposes a decomposition method that
extracts microservices’ candidates through analyzing the application programming
interface in order to extract the operations and the parameters. Then the
operation names are converted into word representations using word embedding
models. Next, semantically similar operations are clustered together to provide
a microservice’ candidate. Additional step is to evaluate the proposed candidate
using cohesion and complexity metrics. The proposed algorithm improved the
decomposition approach for big applications but did not affect the decomposition
of smaller applications.

## References

- [Microservices Identification Through Interface Analysis](./microservices-identification-through-interface-analysis.md)
