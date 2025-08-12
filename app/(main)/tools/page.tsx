import TagSelector from "@/components/tools/tag-selector";
import { toolsData } from "@/lib/tools-data";
import { ToolCard } from "@/components/tools/tool-card";

export default async function Home({searchParams}: {searchParams: Promise<{category: string}>}) {
  const { category } = await searchParams

  const filteredTools = category?.toLowerCase() === "all" || !category
    ? toolsData
    : toolsData.filter(tool => 
        tool.tags.some(tag => tag.toLowerCase() === category?.toLowerCase())
      )

  return (
    <div className="px-4 py-8 md:p-8 bg-secondaryOriginal rounded-4xl font-medium flex flex-col gap-4 h-full">
        <TagSelector />

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {
            filteredTools.map((tool, index) => <ToolCard key={index} id={index} name={tool.name} creator={tool.creator} description={tool.description || ""} imageUrl={tool.imageUrl} tags={tool.tags} link={tool.link} isBeta={tool.isBeta || false}/>)
          }
        </section>
    </div>

  );
}