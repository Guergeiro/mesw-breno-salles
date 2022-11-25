<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-logs
[_metadata_:tag]:- #approach-dynamic-analysis
[_metadata_:tag]:- #approach-rest
[_metadata_:tag]:- #status-algorithm
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [Unsupervised learning approach for web application auto-decomposition into microservices](https://doi.org/10.1016/j.jss.2019.02.031)

## Abstract

Nowadays, large monolithic web applications are manually decomposed into
microservices for many reasons including adopting a modern architecture to ease
maintenance and increase reusability. However, the existing approaches to
refactor a monolithic application do not inherently consider the application
scalability and performance. We devise a novel method to automatically decompose
a monolithic application into microservices to improve the application
scalability and performance. Our proposed decomposition method is based on a
black-box approach that uses the application access logs and an unsupervised
machine-learning method to auto-decompose the application into microservices
mapped to URL partitions having similar performance and resource requirements.
In particular, we propose a complete automated system to decompose an
application into microservices, deploy the microservices using appropriate
resources, and auto-scale the microservices to maintain the desired response
time. We evaluate the proposed system using real web applications on a public
cloud infrastructure. The experimental evaluation shows an improved performance
of the auto-created microservices compared with the monolithic version of the
application and the manually created microservices.

## References

- [Service Cutter: A Systematic Approach to Service Decomposition](./service-cutter-a-systematic-approach-to-service-decomposition.md)

- [Towards a Technique for Extracting Microservices from Monolithic Enterprise Systems](./towards-a-technique-for-extracting-microservices-from-monolithic-enterprise-systems.md)
