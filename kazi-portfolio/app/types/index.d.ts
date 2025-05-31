/// <reference types="node" />

declare module "*.png" {
  const content: string;
  export default content;
}

interface Project {
  title: string;
  description: string;
  image: string;
}

type LoadedImages = Set<number>;
