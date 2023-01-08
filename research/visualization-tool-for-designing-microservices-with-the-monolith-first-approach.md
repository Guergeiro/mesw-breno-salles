<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-dynamic-analysis
[_metadata_:tag]:- #approach-semantic-analysis
[_metadata_:tag]:- #status-tool
[_metadata_:tag]:- #language-unknown
[_metadata_:tag]:- #tool-unavailable

<!-- deno-fmt-ignore-end -->

# [Visualization Tool for Designing Microservices with the Monolith-First Approach](https://doi.org/10.1109/VISSOFT.2018.00012)

## Abstract

The microservice architecture is essential for agile development and deployment
of the application components; however, designing microservices for a web
application is not a straight-forward task. One of the best ways to design
microservices is to decompose a monolithic prototype of an application into
microservices on the basis of both the complexity in engineering and the
component boundaries of the application in the early phase of development. We
propose a visualization tool allowing developers to interactively design
microservice applications on the basis of the characteristics of source codes
and the behaviors of a monolithic prototype. This visualization tool first
constructs a calling-context tree from profile data taken in a dry-run of the
application. Next, it generates an initial microservice design while considering
keyword features in the source codes or amount of function calls between
components. Developers can interactively refine this design via this visual
interface by taking four-choice actions to revise boundaries of microservices
while considering expected communications between them. This interaction will
have a significant impact on runtime performance. Case studies of two
open-source benchmark applications demonstrate the proposed tool enables
interactive design of microservices. The results of the demonstration show that
compared to the official microservice designs of the applications, the proposed
tool can effectively design microservice applications.

## Tool Notes

This work proposes a creation of a tool, but it doesn't create one when this
publication was done. From the authors, I can almost pin point that the tool
that was created from this paper was
[mono2micro](https://www.ibm.com/cloud/mono2micro).

## References

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)
