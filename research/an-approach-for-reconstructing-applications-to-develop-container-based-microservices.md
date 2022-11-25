<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-data
[_metadata_:tag]:- #status-method
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [An Approach for Reconstructing Applications to Develop Container-Based Microservices](https://doi.org/10.1155/2020/4295937)

## Abstract

Microservices are small-scale services that can operate independently. An
application consisting of microservice units can be developed independently as a
service unit, and it can handle individual logic without being affected by other
services. In addition, it is possible to rapidly distribute the configured
microservices by a container, and a container orchestration technology that
manages the distributed multiple containers can be realized; thus, it is
possible to update and distribute the microservices separately. Therefore, many
companies are moving away from existing monolithic structures and attempting to
switch to microservices. In this paper, we present a method for reconstructing a
monolithic application into a container-based microservice unit. The
microservices of data units are derived through the collection and analysis of
monolithic design data. Furthermore, we propose a method to generate a template
script based on deployment design data so that the derived microservice and
support distribution can be implemented in a container environment. The results
of a case study conducted verified that the container-based microservices
deployed in this study work properly. In addition, for the development of
monolithic applications and the development of container-based microservices
presented in this paper, we confirmed that developing on the basis of
microservices is efficient by conducting execution time performance evaluation
for API calls at various iterations. Finally, we show that microservices
constructed using the proposed method have higher reusability than those
constructed using existing methods.

## References

- [Extraction of Microservices from Monolithic Software Architectures](./extraction-of-microservices-from-monolithic-software-architectures.md)
