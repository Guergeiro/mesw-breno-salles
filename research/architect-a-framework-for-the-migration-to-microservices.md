<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #other-framework

<!-- deno-fmt-ignore-end -->

# [Architect: A Framework for the Migration to Microservices](https://doi.org/10.1109/iCCECE55162.2022.9875096)

## Abstract

The migration from a monolithic to a microservice architecture is a recurring
step in many software projects. With the increasing distributed nature of the
transformed system, new challenges for data consistency and deployment arise,
which can be counteracted by the integration of microservices patterns. However,
the use of such patterns is complex and time-consuming. In this paper, we
describe a case study of a migration process of the learning management system
Artemis which consists of two phases. The first phase shows the transformation
from a monolithic architecture to a microservice architecture with a shared
database. It sets as a goal the identification of microservice boundaries, the
decomposition of the monolith application into multiple distributed entities, as
well as their orchestration in a cloud-ready environment. The second phase
migrates the shared database into multiple databases based on the
database-per-microservice pattern. While analyzing the current Artemis
architecture, we describe a gradual refactoring of an existing application to
decompose Artemis into multiple subsystems. We developed Architect, a framework
which is based on a domain-specific language for building dependable distributed
systems as a template to ensure the data consistency of the distributed
transactions using the Saga pattern. We decomposed Artemis into 3 microservices
and provided the migration concept from shared-database to
database-per-microservice using Architect. The framework helped to reduce the
complexity of using the Saga pattern. It introduced the eventual consistency in
a distributed database system and decreased the coupling of the data storage.
The migration to a microservice architecture solves many problems of a monolith
application, but introduces new challenges and increases the complexity of the
overall system. Architect focuses on greenfield project, but currently does not
provide a software evolution approach. We will add support for reengineering
projects, which can facilitate the migration process of existing system.
