<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-data-flow
[_metadata_:tag]:- #approach-dependency
[_metadata_:tag]:- #status-method
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [Extracting Candidates of Microservices from Monolithic Application Code](https://doi.org/10.1109/APSEC.2018.00072)

## Abstract

Technology that facilitates rapid modification of existing business applications
is necessary and it has been reported that making the system more adaptable to
change is the strongest driver for legacy system modernization. There has been
considerable interest in service-oriented architectures or microservices which
enables the system to be quickly changed. Refactoring and, in particular,
re-modularization operations can be performed to repair the design of a software
system. Various approaches have been proposed to support developers during the
re-modularization of a software system. The common problem in these efforts is
to identify from monolithic applications the candidates of microservices, i.e.,
the programs or data that can be turned into cohesive, standalone services; this
is a tedious manual effort that requires analyzing many dimensions of software
architecture views and often heavily relies on the experience and expertise of
the expert performing the extraction. To solve this problem, we developed a
method that identifies the candidates of microservices from the source code by
using software clustering algorithm SArF with the relation of "program groups"
and "data" which we defined. Our method also visualizes the extracted candidates
to show the relationship between extracted candidates and the whole structure.
The candidates and visualization help the developers to capture the overview of
the whole system and facilitated a dialogue with customers. We report two case
studies to evaluate our results in which we applied our method to an open source
application and an industrial application with our results reviewed by
developers.

## References

- [Service Cutter: A Systematic Approach to Service Decomposition](./service-cutter-a-systematic-approach-to-service-decomposition.md)

- [Towards a Technique for Extracting Microservices from Monolithic Enterprise Systems](./towards-a-technique-for-extracting-microservices-from-monolithic-enterprise-systems.md)

- [From Monolith to Microservices: A Dataflow-Driven Approach](./from-monolith-to-microservices-a-dataflow-driven-approach.md)
