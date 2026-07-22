import { skills } from "@/data/skills";
import Chip from "@/components/ui/Chip";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";

/** Categorized skill chips grouped by category, staggered in on view. */
export default function SkillsGrid() {
  return (
    <StaggerGroup className="grid gap-6 sm:grid-cols-2">
      {skills.map((group) => (
        <StaggerItem
          key={group.category}
          className="rounded-xl border border-line bg-surface/50 p-5 transition-colors duration-300 hover:border-blueprint/50"
        >
          <h4 className="font-mono text-xs uppercase tracking-wider text-blueprint">
            {group.category}
          </h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li key={item}>
                <Chip>{item}</Chip>
              </li>
            ))}
          </ul>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
