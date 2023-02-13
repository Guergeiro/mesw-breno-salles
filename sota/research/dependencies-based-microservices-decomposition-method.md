<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-dependency
[_metadata_:tag]:- #status-method
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [Dependencies-based microservices decomposition method](https://doi.org/10.1080/1206212X.2021.1915444)

## Abstract

A microservices identification method was proposed by this research paper. The
proposed method consists of two parts; the first part is representing the source
code of the monolithic application as a class dependency graph. This graph
represents the structure of the monolithic application and the relationships
between the classes of the application. The second part of the method is a graph
clustering algorithm to identify the microservices through analyzing the
dependencies between the classes of the monolithic application and cluster
classes with solid relationships to generate microservice candidates. The method
was tested with 8 different applications and 11 clustering algorithms were
examined to find the most accurate and efficient algorithm. The proposed method
produced promising results when compared to other methods in the literature with
0.8 averaged F-Measure ‘F1’ score and 0.44 averaged NGM score. The F1 score
shows that the proposed method has good accuracy in detecting microservices
candidates. Newman Girvan Modularity metric ‘NGM’ score shows that the generated
microservices candidates are properly structured and that there are well-defined
relationships among the clustered classes of the generated microservices.

## References

- [Microservices Identification Through Interface Analysis](./microservices-identification-through-interface-analysis.md)
