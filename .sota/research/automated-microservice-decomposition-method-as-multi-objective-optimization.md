<!-- deno-fmt-ignore-start -->

[_metadata_:tag]:- #approach-mult-objective
[_metadata_:tag]:- #status-method
[_metadata_:tag]:- #language-agnostic

<!-- deno-fmt-ignore-end -->

# [Automated Microservice Decomposition Method as Multi-Objective Optimization](https://doi.org/10.1109/ICSA-C54293.2022.00028)

## Abstract

IT architects expend a great deal of effort to manually decompose a current
system into microservices (MSD) to improve the system maintainability. There are
several methods that decompose the current system by automatically generating
MSD candidates (MSDCs). These MSDCs are evaluated by de-fined evaluation
functions, and the weighted sum of the evaluation is used to determine the best
MSDC. However, it is difficult for IT architects to define the weighting on the
spot. In this research, we propose an automated MSD method to generate a number
of MSDCs by executing MSD as a multi-objective optimization problem. In the
proposed method, a sufficient number of MSDCs is generated without weighting by
using predefined MSD policies and fix operations. The generated MSDCs are mapped
to a vector space that consists of basis vectors formulated in accordance with
the evaluation functions defined by the MSD policies. Pareto-optimal solutions
are then extracted from the mapped MSDCs by using a non-dominated sorting
algorithm. We also extract MSDCs that are closest to the reference lines, which
are defined to divide the vector space evenly, as distinctive MSDCs. We applied
our method to two cases and found that it can automatically generate a
sufficient number of distinctive MSDCs, thus enabling IT architects to
efficiently find the best MSDC and rapidly execute MSD.
