<!-- deno-fmt-ignore-start -->

<!-- TODO: Importante ler -->

[_metadata_:tag]:- #other-case-study

<!-- deno-fmt-ignore-end -->

# [Refactoring Monoliths to Microservices](https://repositorio-aberto.up.pt/bitstream/10216/122620/2/355627.pdf)

## Abstract

The introduction of cloud computing has forever changed the way software is
built. Due to innate characteristics of the cloud paradigm such as, for example,
high-availability, resilience, or elasticity, traditional ways of building
software (e.g., monoliths) have been replaced by more sophisticated cloud-native
architectures that can fully leverage the power of cloud computing, such as
microservices. Additionally, the adoption of the *aaS delivery models, more
specifically SaaS, has propelled the industry to adopt this model in favour of
approaches considered more traditional such as the deployment of software
on-premises or managing different deployment strategies for different clients.
These new models, paired up with the possibility of having just one platform
that can serve multiple clients (multi-tenancy), has pushed the mass adoption of
these new architectures. This has motivated companies and businesses to spend
time and money transforming existing monolithic software into software that can
fit the paradigm of cloud computing. Due to the inherent differences and
complexities associated with both architectural paradigms, this process often
takes a long time and can be very error-prone and awkward to perform, many times
resulting in a trial and error approach until the end result has been reached.
In order to address the difficulties associated with this complex problem, this
thesis proposes that the systematisation of existing knowledge about common
refactorings that are used to migrate monoliths to microservices, in a catalogue
of refactorings can mitigate many of the difficulties that engineers are faced
with when applying this process. The catalogue has been built by analysing and
performing a literature review on the current state of the art regarding the
refactoring of monoliths to microservices. It contains information on how to
apply the refactorings, when to apply them, examples that detail possible
implementations, and additional knowledge that can aid in that process.
Furthermore, this thesis also documents the development of a tool that is
capable of automating the application of one of those refactorings, with the aim
of facilitating the refactoring process and making it more efficient. The
catalogue and the tool act as a base framework that can be expanded in the
future to include other refactorings, refine existing ones and remove
refactorings that are no longer relevant. These two main contributions have been
validated with the aid of a survey and a case study which have both yielded
positive results. The majority of participants stated that the refactorings
present in the catalogue represent useful and common activities that occur when
performing the transformation of monoliths to microservices, and that the
catalogue of refactorings and the refactoring tool would be a valuable help
during that process.

## References

- [Microservices Identification Through Interface Analysis](./microservices-identification-through-interface-analysis.md)
