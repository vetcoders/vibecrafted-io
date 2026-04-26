// Mermaid templates for the Pipeline section.
//
// These are pipeline architecture, not redaction copy. They live here (and not
// inside the i18n markdown frontmatter) so YAML escaping does not corrupt the
// embedded JSON theme blocks. PipelineSection.astro picks the right pair based
// on `lang`. If you genuinely need to retune the diagram, edit here.

export const mermaidEn = `%%{init: {
  "theme": "base",
  "themeVariables": {
    "background": "#07111f",
    "primaryColor": "#0b1526",
    "primaryTextColor": "#f3efe7",
    "primaryBorderColor": "#24324a",
    "lineColor": "#d8894b",
    "secondaryColor": "#101b2d",
    "tertiaryColor": "#0d1728",
    "clusterBkg": "#08111f",
    "clusterBorder": "#2a3a55",
    "fontFamily": "Inter, ui-sans-serif, system-ui, sans-serif",
    "fontSize": "16px"
  },
  "flowchart": {
    "curve": "basis",
    "htmlLabels": true,
    "nodeSpacing": 34,
    "rankSpacing": 42
  }
} }%%
flowchart LR
    subgraph CRAFT["CRAFT"]
        A["Scaffold"]
        B["Init"]
        C["Workflow"]
        D["Follow-up"]
        A --> B --> C --> D
    end

    D --> M{{"Marbles Loop"}}
    M -->|reduce entropy| G["Resolve P0 / P1 / P2"]
    G --> S1

    subgraph SHIP["SHIP"]
        S1["DoU"]
        S2["Decorate"]
        S3["Hydrate"]
        S4["Release"]
        S1 --> S2 --> S3 --> S4
    end

    classDef core fill:#0d1728,stroke:#d8894b,color:#f3efe7,stroke-width:1.5px;
    classDef stage fill:#0a1322,stroke:#2b3a55,color:#f3efe7,stroke-width:1.2px;
    classDef loop fill:#1a1110,stroke:#d8894b,color:#ffd9bd,stroke-width:2px;
    class A,B,C,D,S1,S2,S3,S4 stage;
    class M,G core;
    class M loop;`;

export const mermaidPl = `%%{init: {
  "theme": "base",
  "themeVariables": {
    "background": "#07111f",
    "primaryColor": "#0b1526",
    "primaryTextColor": "#f3efe7",
    "primaryBorderColor": "#24324a",
    "lineColor": "#d8894b",
    "secondaryColor": "#101b2d",
    "tertiaryColor": "#0d1728",
    "clusterBkg": "#08111f",
    "clusterBorder": "#2a3a55",
    "fontFamily": "Inter, ui-sans-serif, system-ui, sans-serif",
    "fontSize": "16px"
  },
  "flowchart": {
    "curve": "basis",
    "htmlLabels": true,
    "nodeSpacing": 34,
    "rankSpacing": 42
  }
} }%%
flowchart LR
    subgraph CRAFT["TWÓRZ"]
        A["Scaffold"]
        B["Init"]
        C["Workflow"]
        D["Follow-up"]
        A --> B --> C --> D
    end

    D --> M{{"Pętla Marbles"}}
    M -->|redukcja entropii| G["Rozwiąż P0 / P1 / P2"]
    G --> S1

    subgraph SHIP["WYPUŚĆ"]
        S1["DoU"]
        S2["Decorate"]
        S3["Hydrate"]
        S4["Release"]
        S1 --> S2 --> S3 --> S4
    end

    classDef core fill:#0d1728,stroke:#d8894b,color:#f3efe7,stroke-width:1.5px;
    classDef stage fill:#0a1322,stroke:#2b3a55,color:#f3efe7,stroke-width:1.2px;
    classDef loop fill:#1a1110,stroke:#d8894b,color:#ffd9bd,stroke-width:2px;
    class A,B,C,D,S1,S2,S3,S4 stage;
    class M,G core;
    class M loop;`;

export const mermaidFullEn = `%%{init: {
  "theme": "base",
  "themeVariables": {
    "background": "#07111f",
    "primaryColor": "#0c1626",
    "primaryTextColor": "#f3efe7",
    "primaryBorderColor": "#2d3b56",
    "lineColor": "#d8894b",
    "secondaryColor": "#101b2d",
    "tertiaryColor": "#0d1728",
    "clusterBkg": "#08111f",
    "clusterBorder": "#344562",
    "fontFamily": "Inter, ui-sans-serif, system-ui, sans-serif",
    "fontSize": "17px"
  },
  "flowchart": {
    "curve": "basis",
    "htmlLabels": true,
    "nodeSpacing": 42,
    "rankSpacing": 56,
    "padding": 20
  }
} }%%
flowchart TB
    TITLE["Craft → Converge → Ship"]
    SUB["A founder-grade operating model for shaping, denoising, and releasing AI-built software"]

    TITLE --> SUB
    SUB --> ROW

    ROW --> CRAFT
    ROW --> CORE
    ROW --> SHIP

    subgraph CRAFT["CRAFT"]
        direction TB
        A1["Scaffold"]
        A2["Init"]
        A3["Workflow"]
        A4["Follow-up"]
        A1 --> A2 --> A3 --> A4
    end

    subgraph CORE["CONVERGE"]
        direction TB
        M{{"Marbles Loop"}}
        C1["Collapse unresolveds"]
        C2["Reduce entropy"]
        C3["Increase runtime truth"]
        M --> C1
        C1 --> C2
        C1 --> C3
    end

    subgraph SHIP["SHIP"]
        direction TB
        S1["DoU"]
        S2["Decorate"]
        S3["Hydrate"]
        S4["Release"]
        S1 --> S2 --> S3 --> S4
    end

    A4 --> M
    C3 --> S1

    T1["shape the surface"] --> A1
    T2["load context"] --> A2
    T3["execute with constraints"] --> A3
    T4["tighten the edge"] --> A4

    U1["discoverable"] --> S1
    U2["installable"] --> S2
    U3["trustable"] --> S3
    U4["shippable"] --> S4

    classDef title fill:#07111f,stroke:#07111f,color:#f3efe7,stroke-width:0px,font-size:34px,font-weight:bold;
    classDef subtitle fill:#07111f,stroke:#07111f,color:#aeb8c8,stroke-width:0px,font-size:16px;
    classDef stage fill:#0d1728,stroke:#31415d,color:#f3efe7,stroke-width:1.3px;
    classDef core fill:#1a1110,stroke:#d8894b,color:#ffd9bd,stroke-width:2.2px;
    classDef signal fill:#0b1526,stroke:#506483,color:#cfd8e8,stroke-width:1.05px;
    classDef gain fill:#102017,stroke:#7ea786,color:#edf7ef,stroke-width:1.2px;

    class TITLE title;
    class SUB subtitle;
    class A1,A2,A3,A4,S1,S2,S3,S4,C1,C2,C3 stage;
    class M core;
    class T1,T2,T3,T4 signal;
    class U1,U2,U3,U4 gain;`;

export const mermaidFullPl = `%%{init: {
  "theme": "base",
  "themeVariables": {
    "background": "#07111f",
    "primaryColor": "#0c1626",
    "primaryTextColor": "#f3efe7",
    "primaryBorderColor": "#2d3b56",
    "lineColor": "#d8894b",
    "secondaryColor": "#101b2d",
    "tertiaryColor": "#0d1728",
    "clusterBkg": "#08111f",
    "clusterBorder": "#344562",
    "fontFamily": "Inter, ui-sans-serif, system-ui, sans-serif",
    "fontSize": "17px"
  },
  "flowchart": {
    "curve": "basis",
    "htmlLabels": true,
    "nodeSpacing": 42,
    "rankSpacing": 56,
    "padding": 20
  }
} }%%
flowchart TB
    TITLE["Twórz → Konwerguj → Wypuść"]
    SUB["Model operacyjny klasy założycielskiej do kształtowania, odszumiania i wypuszczania oprogramowania budowanego z AI"]

    TITLE --> SUB
    SUB --> ROW

    ROW --> CRAFT
    ROW --> CORE
    ROW --> SHIP

    subgraph CRAFT["TWÓRZ"]
        direction TB
        A1["Scaffold"]
        A2["Init"]
        A3["Workflow"]
        A4["Follow-up"]
        A1 --> A2 --> A3 --> A4
    end

    subgraph CORE["KONWERGUJ"]
        direction TB
        M{{"Pętla Marbles"}}
        C1["Zbij nierozwiązane"]
        C2["Zredukuj entropię"]
        C3["Podnieś prawdę runtime'u"]
        M --> C1
        C1 --> C2
        C1 --> C3
    end

    subgraph SHIP["WYPUŚĆ"]
        direction TB
        S1["DoU"]
        S2["Decorate"]
        S3["Hydrate"]
        S4["Release"]
        S1 --> S2 --> S3 --> S4
    end

    A4 --> M
    C3 --> S1

    T1["ukształtuj powierzchnię"] --> A1
    T2["załaduj kontekst"] --> A2
    T3["wykonaj w ramach ograniczeń"] --> A3
    T4["dociśnij krawędź"] --> A4

    U1["odnajdywalne"] --> S1
    U2["instalowalne"] --> S2
    U3["godne zaufania"] --> S3
    U4["wypuszczalne"] --> S4

    classDef title fill:#07111f,stroke:#07111f,color:#f3efe7,stroke-width:0px,font-size:34px,font-weight:bold;
    classDef subtitle fill:#07111f,stroke:#07111f,color:#aeb8c8,stroke-width:0px,font-size:16px;
    classDef stage fill:#0d1728,stroke:#31415d,color:#f3efe7,stroke-width:1.3px;
    classDef core fill:#1a1110,stroke:#d8894b,color:#ffd9bd,stroke-width:2.2px;
    classDef signal fill:#0b1526,stroke:#506483,color:#cfd8e8,stroke-width:1.05px;
    classDef gain fill:#102017,stroke:#7ea786,color:#edf7ef,stroke-width:1.2px;

    class TITLE title;
    class SUB subtitle;
    class A1,A2,A3,A4,S1,S2,S3,S4,C1,C2,C3 stage;
    class M core;
    class T1,T2,T3,T4 signal;
    class U1,U2,U3,U4 gain;`;
