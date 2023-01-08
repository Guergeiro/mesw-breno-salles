<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-static-analysis
[_metadata_:tag]:- #approach-semantic-analysis
[_metadata_:tag]:- #status-tool
[_metadata_:tag]:- #language-java
[_metadata_:tag]:- #tool-unavailable

<!-- deno-fmt-ignore-end -->

# [Tool Support for the Migration to Microservice Architecture: An Industrial Case Study](https://doi.org/10.1007/978-3-030-29983-5_17)

## Abstract

With the introduction of microservice architecture, many investigate how to
migrate their legacy systems into this architectural paradigm. The migration
process requires the recovery of the project architecture to be migrated
together with the knowledge necessary to understand how to decompose the code
and obtain new microservices. At the moment, this process is realized mostly
manually. This paper introduces an approach to identify candidate microservices
in monolithic Java projects, implemented in a tool named Arcan and the
validation of the approach in an industrial setting. The approach involves
static analysis of the system architecture, architectural smell detection and
topic detection, a text mining method used here to model software domains
starting from code analysis. We report the feedbacks we get from an experienced
industrial developer who carried out the migration described in the case study.
From this collaboration with industry we collected useful information to enhance
the approach, improve the tool and replicate the study.

## Tool Notes

This tool doesn't "spit" out microservices. The paper used this tool to help
them identify microservices.

https://essere.disco.unimib.it/wiki/arcan/

## References

- [Microservices Identification Through Interface Analysis](./microservices-identification-through-interface-analysis.md)

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)
