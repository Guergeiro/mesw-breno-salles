<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-control-flow
[_metadata_:tag]:- #status-method
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [Migrating production monolithic systems to microservices using aspect oriented programming](https://doi.org/10.1002/spe.2956)

## Abstract

Several organizations need to address the challenge to migrate current
traditional monolithic applications in production to microservices, preferably,
without having to schedule maintenances to take the application offline. This
article presents an approach for migrating to microservices with almost zero
downtime and minimal changes in the monolithic code. The approach is based on
the concepts of aspect-oriented programming (AOP) and reflection to enable to
intercept calls inside the monolith and transform them into service requests
invoking the newly built microservices using the concept of around advices. The
aspects do the “dirty work” of decoupling what will be refactored and which
service to call and practically “zero” code changes need to be done in the
original monolithic code. This enables one key novel contribution of our
migration approach which is the ability to revert code and data changes without
having to take the system offline. Two applications are used as proofs of
concept to demonstrate that the proposed approach enables to go “forward” or
“backward” among different versions of the application with minimal code or data
changes. An evaluation performed in the cloud demonstrates that this work does
not introduce significant performance or cost overhead when compared to the
current state of the art and to the original monolith.
