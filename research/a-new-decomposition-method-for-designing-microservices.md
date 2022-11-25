<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-model
[_metadata_:tag]:- #status-tool
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [A New Decomposition Method for Designing Microservices](https://doi.org/10.3311/PPee.13925)

## Abstract

Many companies are migrating from monolithic architectures to microservice
architectures, and they need to decompose their applications in order to create
a microservices application. Therefore, the need comes for an approach that
helps software architects in the decomposition process. This paper presents a
new approach for decomposing monolithic application to a microservices
application through analyzing the application programming interface. Our
proposed decomposition methodology uses word embedding models to obtain word
representations using operation names, as well as, using a hierarchical
clustering algorithm to group similar operation names together in order to get
suitable microservices. Also, using grid search method to find the optimal
parameter values for Affinity Propagation algorithm, which was used for
clustering, as well as using silhouette coefficient score to compare the
performance of the clustering parameters. The decomposition approach that was
introduced in this research consists of the OpenAPI specifications as an input,
then extracts the operation names from the specifications and converts them into
average word embedding using fastText model. Lastly the decomposition approach
is grouping these operation names using Affinity Propagation algorithm. The
proposed methodology presented promising results with a precision of 0.84,
recall of 0.78 and F-Measure of 0.81.

## Tool Notes

Tool not available.

## References

- [Microservices Identification Through Interface Analysis](./microservices-identification-through-interface-analysis.md)

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)
