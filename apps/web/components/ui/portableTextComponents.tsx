import type { PortableTextComponents } from "@portabletext/react";

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base md:text-xl md:leading-8 mb-5">{children}</p>
    ),

    h1: ({ children }) => (
      <h1 className="text-7xl font-medium mb-6 leading-tight">{children}</h1>
    ),

    h2: ({ children }) => (
      <h2 className="text-6xl font-medium mb-6 leading-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-[clamp(1.55em,2.3vw,2.5em)] mb-6 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-4xl font-medium mb-6 leading-tight">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-3xl font-medium mb-6 leading-tight">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-2xl font-medium mb-6 leading-tight">{children}</h6>
    ),

    blockquote: ({ children }) => (
      <blockquote className="text-xl leading-8 text-same/60 mb-5 border-l-4 pl-4 italic">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4">{children}</ul>
    ),

    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4">{children}</ol>
    ),
  },

  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,

    em: ({ children }) => <em className="italic">{children}</em>,
  },
};
