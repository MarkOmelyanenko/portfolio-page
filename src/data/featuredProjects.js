import { assetUrl } from "./paths";

const marketplaceArchitecture = {
  caption:
    "Six backend services · Kafka event flows · isolated PostgreSQL databases",
  note: "Payments Service ⇄ Provider Simulator via signed webhooks",
  groups: [
    {
      label: "User applications",
      items: [
        { title: "Partner Portal" },
        { title: "Buyer Portal" },
        { title: "Ops Dashboard" },
      ],
    },
    {
      label: "Entry",
      items: [
        {
          title: "API Gateway",
          hint: "routing · CORS · rate limits · correlation IDs",
        },
      ],
    },
    {
      label: "Core domain",
      items: [
        { title: "Offer Service", hint: "offer_db" },
        { title: "Orders Service", hint: "order_db" },
        { title: "Payments Service", hint: "payment_db" },
      ],
    },
    {
      label: "Async",
      accent: true,
      items: [
        {
          title: "Kafka",
          hint: "offer.created · offer.enriched · payment.captured / failed",
        },
      ],
    },
    {
      label: "Support & external",
      items: [
        { title: "Enrichment Service", hint: "offer.created → offer.enriched" },
        { title: "Provider Simulator", hint: "signed webhooks" },
      ],
    },
  ],
};

export const featuredProjects = [
  {
    id: "marketplace",
    number: "01",
    title: "Marketplace Platform",
    positioning:
      "A microservices-based marketplace with six backend services, three role-specific portals and event-driven order and payment processing.",
    technologies: [
      "Java 21",
      "Spring Boot",
      "Spring Cloud Gateway",
      "Kafka",
      "Spring Data JPA",
      "PostgreSQL",
      "Flyway",
      "React",
      "Docker",
      "Maven",
      "Actuator",
      "Prometheus",
      "Swagger/OpenAPI",
      "GCP",
    ],
    highlights: [
      "Six backend services and three role-specific portals behind Spring Cloud Gateway, with routing, rate limiting, CORS and correlation IDs.",
      "Kafka-based asynchronous workflows with transactional outbox processing for offer enrichment and payment events.",
      "Idempotent payment creation, signed provider webhooks, dedicated PostgreSQL databases and Flyway migrations.",
      "Cross-service observability using structured/correlated logs, Actuator and Prometheus. Deployed on GCP.",
    ],
    github: "https://github.com/MarkOmelyanenko/marketplace",
    demo: "https://coalition-scholar-elect-tone.trycloudflare.com/",
    layout: "image-right",
    visual: {
      defaultOption: "product",
      options: [
        {
          id: "product",
          label: "Product",
          type: "image",
          src: assetUrl("projects/marketplace.png"),
          alt: "Marketplace platform interface showing one of the Partner, Buyer or Operations portals",
        },
        {
          id: "architecture",
          label: "Architecture",
          type: "architecture",
          architecture: marketplaceArchitecture,
        },
      ],
    },
  },
  {
    id: "crypto-exchange",
    number: "02",
    title: "Crypto Exchange Simulator",
    positioning:
      "Full-stack crypto exchange simulator with authentication, wallet management, order execution and real-time market data.",
    technologies: [
      "Java 21",
      "Spring Boot",
      "Spring Security (JWT)",
      "Spring Data JPA",
      "PostgreSQL",
      "WhiteBIT API",
      "Redis",
      "Kafka",
      "React",
      "SSE",
      "Docker",
      "Maven",
      "Jenkins",
      "AWS",
    ],
    highlights: [
      "JWT authentication, wallet management and market BUY/SELL execution.",
      "WhiteBIT market-data integration with scheduled refreshes, Redis caching and SSE live updates.",
      "Redis-backed rate limiting plus idempotent deposit/order operations.",
      "Dockerized deployment pipeline using Jenkins and AWS.",
    ],
    github: "https://github.com/MarkOmelyanenko/crypto-exchange-platfrom",
    demo: null,
    layout: "image-left",
    visual: {
      options: [
        {
          id: "product",
          label: "Product",
          type: "image",
          src: assetUrl("projects/cryptoapp.png"),
          alt: "Crypto exchange simulator showing live prices and trading UI",
        },
      ],
    },
  },
  {
    id: "tournament",
    number: "03",
    title: "Tournament Management Platform",
    positioning:
      "Built as a bachelor's thesis project and actively tested by the Greater Poland Table Tennis Association.",
    badge: "Testing by Greater Poland Table Tennis Association",
    technologies: ["FastAPI", "React", "PostgreSQL", "WebSockets"],
    highlights: [
      "Built in a 3-person team and iterated with real user feedback.",
      "Owned user management, RBAC and security logic.",
      "Contributed to automated bracket generation and tournament management.",
      "WebSocket live match updates, tested under real tournament conditions.",
    ],
    github: null,
    demo: null,
    layout: "image-right",
    visual: {
      defaultOption: "creation",
      options: [
        {
          id: "creation",
          label: "Tournament creation",
          type: "video",
          src: assetUrl("projects/tournament-creation.mp4"),
        },
        {
          id: "judge",
          label: "Match judge",
          type: "video",
          src: assetUrl("projects/match-judge.mp4"),
        },
      ],
    },
  },
];
