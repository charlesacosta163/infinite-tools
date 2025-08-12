import { toolsData } from "./tools-data";

export function getToolCategoryAmounts() {
    // Convert all tags to lowercase when counting
    const categories = toolsData.map(tool => 
        tool.tags.map(tag => tag.toLowerCase())
    ).flat();
    
    // Count occurrences of each category
    const categoryCounts = categories.reduce((acc, category) => {
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return categoryCounts;
}