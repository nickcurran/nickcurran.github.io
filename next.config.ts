import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
    // Configure `pageExtensions` to include markdown and MDX files
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    // Optionally, add any other Next.js config below
    // turbopack: {
    //     resolveExtensions: ['.js', '.jsx', '.ts', '.tsx', '.md', '.mdx'],
    // }
};

const withMDX = createMDX({
    extension: /\.(md|mdx)$/,
    
    // Add markdown plugins here, as desired
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)