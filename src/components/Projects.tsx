import { projects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Projects grid. The featured project (RepSay) spans the full width;
 * the rest fill a two-column grid below it.
 */
export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const standard = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-line/60 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="projects"
            title="Products I've built and shipped"
          />
        </Reveal>

        <div className="mt-12 grid gap-6">
          {featured.map((project) => (
            <Reveal key={project.name} className="lg:col-span-2">
              <ProjectCard project={project} />
            </Reveal>
          ))}

          <StaggerGroup
            className={cn(
              "grid gap-6",
              standard.length > 1 && "sm:grid-cols-2"
            )}
          >
            {standard.map((project) => (
              <StaggerItem key={project.name} className="h-full">
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
