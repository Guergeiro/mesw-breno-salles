<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-static-analysis
[_metadata_:tag]:- #approach-dynamic-analysis
[_metadata_:tag]:- #approach-dependency
[_metadata_:tag]:- #approach-execution-flow
[_metadata_:tag]:- #status-tool
[_metadata_:tag]:- #language-python
[_metadata_:tag]:- #tool-available

<!-- deno-fmt-ignore-end -->

# [Determining Microservice Boundaries: A Case Study Using Static and Dynamic Software Analysis](https://doi.org/10.1007/978-3-030-58923-3_21)

## Abstract

A number of approaches have been proposed to identify service boundaries when
decomposing a monolith to microservices. However, only a few use systematic
methods and have been demonstrated with replicable empirical studies. We
describe a systematic approach for refactoring systems to microservice
architectures that uses static analysis to determine the system’s structure and
dynamic analysis to understand its actual behavior. A prototype of a tool was
built using this approach (MonoBreaker) and was used to conduct a case study on
a real-world software project. The goal was to assess the feasibility and
benefits of a systematic approach to decomposition that combines static and
dynamic analysis. The three study participants regarded as positive the
decomposition proposed by our tool, and considered that it showed improvements
over approaches that rely only on static analysis.

## Tool Notes

https://github.com/tiagoCMatias/monoBreaker

Input: #source-code 
Output: #list-candidates 

## References

- [Migrating Web Applications from Monolithic Structure to Microservices Architecture](./migrating-web-applications-from-monolithic-structure-to-microservices-architecture.md)
