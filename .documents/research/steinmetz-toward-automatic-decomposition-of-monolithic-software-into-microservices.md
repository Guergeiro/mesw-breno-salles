<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-static-analysis
[_metadata_:tag]:- #approach-semantic-analysis
[_metadata_:tag]:- #status-method
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [Steinmetz: Toward automatic decomposition of monolithic software into microservices](http://sattose.wdfiles.com/local--files/2020/sattose2020_paper_12.pdf)

## Abstract

Industry is adopting the microservices paradigm for greenfield development as
well as for migrating monolithic software. However, the latter approach involves
significant manual work, specifically in the early stages of the decomposition
process, when determining boundaries between the services. We devise a
methodology to automatically generate microservice candidate recommendations for
any given monolithic software. We leverage three coupling dimensions: static,
semantic, and evolutionary. For each dimension, we calculate a weighted graph.
We aggregate the three dimensions into a single graph that we cluster into
microservice candidate recommendations. We evaluate our methodology using
several established metrics as well as our PoC implementation, Steinmetz 1 .
Preliminary results are encouraging: the methodology works as expected, there
are clear results regarding feasibility of metrics to assess the quality of
microservice candidate recommendations, and we are able to identify the best
suitable graph clustering algorithm.

## References

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)
