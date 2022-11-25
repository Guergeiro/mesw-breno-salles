<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-rest
[_metadata_:tag]:- #status-tool
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [Expert system for automatic microservices identification using API similarity graph](https://doi.org/10.1111/exsy.13158)

## Abstract

As a new software design paradigm, microservices structure an application as a
collection of services that are independently deployable and loosely coupled. A
key step of migrating non-microservices-based systems to microservices-based
systems is the identification of microservices in the target application.
Traditional approaches to identify microservices, however, usually suffer from
lack of full automation and low effectiveness. This paper puts forward an expert
system to identify microservices automatically from legacy systems by leveraging
the similarity of RESTful APIs. The system consists of three major parts. The
first part calculates the candidate topic similarity and the response message
similarity of APIs, and the overall similarity is obtained through their
combination. Afterwards, the second part constructs a graph of API similarities
with API as the node and the overall similarity as the weight. The third part
employs a graph-based clustering algorithm to identify candidate microservices
from the API similarity graph. Experiments conducted on open-source projects
demonstrate the effectiveness of our system.

## Tool Notes

https://github.com/HduDBSI/MsDecomposer
