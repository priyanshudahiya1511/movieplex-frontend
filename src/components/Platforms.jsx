import { Tv, Radio, MonitorPlay, ShoppingBag, BookOpen } from "lucide-react";

const PLATFORMS = [
  {
    name: "YouTube Movies",
    Icon: MonitorPlay,
    link: "https://www.youtube.com",
    description: "Free movies and trailers",
  },
  {
    name: "Tubi",
    Icon: Tv,
    link: "https://tubitv.com",
    description: "Free movies with minimal ads",
  },
  {
    name: "Pluto TV",
    Icon: Radio,
    link: "https://pluto.tv",
    description: "Free live TV and on-demand",
  },
  {
    name: "Freevee",
    Icon: ShoppingBag,
    link: "https://www.amazon.com/adlp/freevee",
    description: "Amazon's free service",
  },
  {
    name: "Kanopy",
    Icon: BookOpen,
    link: "https://kanopy.com",
    description: "Free with a library card",
  },
];

export default function Platforms() {
  return (
    <section className="mb-16 px-5 md:px-12">
      <h2 className="mb-4 text-xl font-semibold">Free streaming platforms</h2>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
        {PLATFORMS.map(({ name, Icon, link, description }) => (
          <div key={name} className="rounded bg-card p-5 text-center">
            <Icon size={34} className="mx-auto mb-3 text-brand" />
            <h3 className="mb-2 font-semibold">{name}</h3>
            <p className="mb-3 text-xs text-muted">{description}</p>
            <button
              onClick={() => window.open(link, "_blank")}
              className="rounded bg-brand px-4 py-2 text-sm hover:bg-brand-dark"
            >
              Visit platform
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
