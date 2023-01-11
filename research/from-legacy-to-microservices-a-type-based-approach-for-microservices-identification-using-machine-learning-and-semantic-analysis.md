<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-static-analysis
[_metadata_:tag]:- #approach-dependencies
[_metadata_:tag]:- #status-tool
[_metadata_:tag]:- #language-agnostic
[_metadata_:tag]:- #tool-available

<!-- deno-fmt-ignore-end -->

# [From legacy to microservices: A type-based approach for microservices identification using machine learning and semantic analysis](https://doi.org/10.1002/smr.2503)

## Abstract

The microservices architecture (MSA) style has been gaining interest in recent
years because of its high scalability, ability to be deployed in the cloud, and
suitability for DevOps practices. While new applications can adopt MSA from
their inception, many legacy monolithic systems must be migrated to an MSA to
benefit from the advantages of this architectural style. To support the
migration process, we propose MicroMiner, a microservices identification
approach that is based on static-relationship analyses between code elements as
well as semantic analyses of the source code. Our approach relies on machine
learning (ML) techniques and uses service types to guide the identification of
microservices from legacy monolithic systems. We evaluate the efficiency of our
approach on four systems and compare our results to ground-truths and to those
of two state-of-the-art approaches. We perform a qualitative evaluation of the
resulted microservices by analyzing the business capabilities of the identified
microservices. Also a quantitative analysis using the state-of-the-art metrics
on independence of functionality and modularity of services was conducted. Our
results show the effectiveness of our approach to automate one of the most
time-consuming steps in the migration of legacy systems to microservices. The
proposed approach identifies architecturally significant microservices with a
68.15% precision and 77% recall.

## Tool Notes

No tool available.

Input: #source-code 
Output: #other 

## References

- [Identification of microservices from monolithic applications through topic modelling](./identification-of-microservices-from-monolithic-applications-through-topic-modelling.md)

- [Microservices Identification Through Interface Analysis](./microservices-identification-through-interface-analysis.md)
