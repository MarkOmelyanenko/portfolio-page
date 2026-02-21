import { Card, CardContent } from "./components/ui/card";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import ProjectModal from "./components/ProjectModal";

const projectGroups = [
  {
    title: "Full-Stack Web Applications",
    projects: [
      {
        title: "Crypto Exchange Simulator",
        image: "/portfolio-page/projects/cryptoapp.png",
        github: "https://github.com/MarkOmelyanenko/crypto-exchange-platfrom",
        demo: "https://broker-shades-confidential-veteran.trycloudflare.com/",
        description:
          "Full-stack cryptocurrency exchange simulation platform. Simulates buying/selling of cryptocurrencies with portfolio tracking and detailed transaction history.",
        features: [
          "Built a full-stack exchange simulator: JWT auth, wallet balances (USDT deposits with a rolling 24h limit), and an asset catalog with live pricing and 24h change",
          "Implemented spot trading: market BUY/SELL at live prices; persisted trades and a unified transaction history",
          "Delivered real-time UX via Server-Sent Events (SSE) for live price streaming; integrated external market data sources (WhiteBIT) with caching and scheduled price updates",
          "Improved reliability: Redis-backed per-user rate limiting (orders/deposits), health monitoring via Actuator + custom system health endpoint, and Swagger/OpenAPI documentation",
        ],
        technologies: [
          "Java 21",
          "Spring Boot",
          "Spring Security",
          "Spring Data JPA",
          "React",
          "PostgreSQL",
          "Server-Sent Events",
          "WhiteBIT API",
          "Redis",
          "Kafka",
          "Docker",
          "Docker Compose",
          "Jenkins",
          "Actuator",
          "AWS",
          "Swagger",
          "OpenAPI",
          "HTML",
          "CSS",
          "JavaScript",
        ],
      },

      {
        title: "Mini Marketplace Platform",
        image: "/portfolio-page/projects/marketplace.png",
        github: "https://github.com/MarkOmelyanenko/marketplace",
        demo: "https://todd-measurement-reflect-hardware.trycloudflare.com/",
        description:
          "Microservices-based e-commerce platform with payments and event-driven workflows.",
        features: [
          "Built a microservices marketplace with three React portals (Partner/Buyer/Ops) behind an API Gateway (routing, CORS, rate limiting, correlation IDs)",
          "Implemented offer lifecycle and publishing flow with a listing-fee payment; added optional asynchronous AI enrichment (title/description/tags) via Kafka",
          "Developed a payments service integrated with a mock provider: idempotent payment creation, signed webhook verification, and publishing payment events to Kafka",
          "Improved reliability and operability using the transactional outbox pattern, event-driven state updates (orders/refunds), and Actuator + Prometheus metrics/log correlation",
        ],
        technologies: [
          "Java 21",
          "Spring Boot",
          "Spring Data JPA",
          "React",
          "PostgreSQL",
          "Kafka",
          "Docker",
          "Docker Compose",
          "Actuator",
          "Prometheus",
          "GCP",
          "Swagger",
          "OpenAPI",
          "HTML",
          "CSS",
          "JavaScript",
        ],
      },

      {
        title: "Movie reviews and trailers",
        image: "/portfolio-page/projects/movies.png",
        githubFrontend: "https://github.com/MarkOmelyanenko/movies-frontend",
        githubBackend: "https://github.com/MarkOmelyanenko/movies-backend",
        demo: null,
        description:
          "Full-stack web application for browsing and reviewing movies with trailer integration.",
        features: [
          "Built RESTful backend with Spring Boot to serve movie data and reviews",
          "Developed interactive frontend with React to browse movies and watch trailers",
          "Enabled users to add reviews and access trailers directly through the interface",
        ],
        technologies: ["Spring Boot", "React", "MongoDB", "Java", "Maven"],
      },
    ],
  },
  {
    title: "React Projects",
    projects: [
      {
        title: "Color Picker App",
        image: "/portfolio-page/projects/color.png",
        github:
          "https://github.com/MarkOmelyanenko/portfolio-page/tree/main/public/projects/React/color-picker-app",
        demo: "/portfolio-page/projects/React/color-picker-app/index.html",
        technologies: ["React", "JavaScript", "CSS"],
      },
      {
        title: "To Do List App",
        image: "/portfolio-page/projects/todo.png",
        github:
          "https://github.com/MarkOmelyanenko/portfolio-page/tree/main/public/projects/React/color-picker-app",
        demo: "/portfolio-page/projects/React/to-do-app/index.html",
        technologies: ["React", "JavaScript", "CSS"],
      },
    ],
  },

  {
    title: "Telegram Bots",
    projects: [
      {
        title: "Crypto Telegram Bot",
        image: null,
        github: "https://github.com/MarkOmelyanenko/CryptoCreepTelegramBot",
        demo: null,
        description:
          "Java-based Telegram bot for real-time cryptocurrency prices.",
        features: [
          "Developed an interactive Telegram bot that retrieves live cryptocurrency prices from the Binance public API",
          "Implemented custom reply keyboards for intuitive user interaction and subscription-based price updates",
          "Packaged the application with a multi-stage Dockerfile for easy deployment",
        ],
        technologies: ["Java", "Telegram Bots"],
      },
    ],
  },
  {
    title: "HTML & CSS",
    projects: [
      {
        title: "Marta Up Landing",
        image: "/portfolio-page/projects/martaup.png",
        github:
          "https://github.com/MarkOmelyanenko/portfolio-page/tree/main/public/projects/HTML%26CSS/martaup-landing",
        demo: "/portfolio-page/projects/HTML&CSS/martaup-landing/index.html",
        technologies: ["HTML", "CSS", "JavaScript"],
      },
      {
        title: "Space Tourism Landing",
        image: "/portfolio-page/projects/spacetourism.png",
        github:
          "https://github.com/MarkOmelyanenko/portfolio-page/tree/main/public/projects/HTML%26CSS/space-tourism-landing",
        demo: "/portfolio-page/projects/HTML&CSS/space-tourism-landing/index.html",
        technologies: ["HTML", "CSS", "JavaScript"],
      },
      {
        title: "Films Landing",
        image: "/portfolio-page/projects/filmslanding.png",
        github:
          "https://github.com/MarkOmelyanenko/portfolio-page/tree/main/public/projects/HTML%26CSS/films-pages",
        demo: "/portfolio-page/projects/HTML&CSS/films-pages/index.html",
        technologies: ["HTML", "CSS", "Bootstrap", "JavaScript"],
      },
    ],
  },
  {
    title: "Vanilla JS",
    projects: [
      {
        title: "Calculator",
        image: "/portfolio-page/projects/calculator.png",
        github:
          "https://github.com/MarkOmelyanenko/portfolio-page/tree/main/public/projects/JS/calculator",
        demo: "/portfolio-page/projects/JS/calculator/index.html",
        technologies: ["JavaScript", "HTML", "CSS"],
      },
      {
        title: "Counter",
        image: "/portfolio-page/projects/counter.png",
        github:
          "https://github.com/MarkOmelyanenko/portfolio-page/tree/main/public/projects/JS/counter",
        demo: "/portfolio-page/projects/JS/counter/index.html",
        technologies: ["JavaScript", "HTML", "CSS"],
      },
      {
        title: "Dice Roller",
        image: "/portfolio-page/projects/diceroller.png",
        github:
          "https://github.com/MarkOmelyanenko/portfolio-page/tree/main/public/projects/JS/dice-roller",
        demo: "/portfolio-page/projects/JS/dice-roller/index.html",
        technologies: ["JavaScript", "HTML", "CSS"],
      },
      {
        title: "Console Password Generator",
        image: "/portfolio-page/projects/passwordgen.png",
        github:
          "https://github.com/MarkOmelyanenko/portfolio-page/tree/main/public/projects/JS/password-generator",
        demo: "/portfolio-page/projects/JS/password-generator/index.html",
        technologies: ["JavaScript", "HTML", "CSS"],
      },
      {
        title: "Temperature Converter",
        image: "/portfolio-page/projects/tempconverter.png",
        github:
          "https://github.com/MarkOmelyanenko/portfolio-page/tree/main/public/projects/JS/temperature-converter",
        demo: "/portfolio-page/projects/JS/temperature-converter/index.html",
        technologies: ["JavaScript", "HTML", "CSS"],
      },
    ],
  },
  {
    title: "Big Data Projects",
    projects: [
      {
        title: "Big Data Pipeline: Restaurant Orders Analytics",
        image: null,
        github:
          "https://github.com/MarkOmelyanenko/big-data-pipeline-restaurant-orders-analytics",
        demo: null,
        description:
          "A Big Data analytics pipeline that processes restaurant order data using Apache Airflow, Hadoop MapReduce (Java), and Apache Hive. The workflow aggregates orders by restaurant and payment type, joins with restaurant metadata, and produces ranked statistics by country and cuisine.",
        features: [
          "Built an Airflow-orchestrated pipeline to process restaurant orders and generate ranked analytics by country and cuisine",
          "Implemented MapReduce in Java to compute order counts and average order value per restaurant and payment type",
          "Used Hive to join results with restaurant metadata, aggregate KPIs, rank cuisines per country, and export final JSON to HDFS",
        ],
        technologies: [
          "Apache Airflow",
          "Apache Hadoop",
          "Apache Hive",
          "MapReduce",
          "Java",
          "Python",
          "Maven",
        ],
      },
      {
        title: "Apache Spark Project — Food Orders & Restaurants",
        image: null,
        github:
          "https://github.com/MarkOmelyanenko/big-data-pipeline-restaurant-orders-analytics",
        demo: null,
        description:
          "A Big Data analytics project using Apache Spark (PySpark) to process food order and restaurant data. The project implements the same two-stage pipeline with both the RDD API and the DataFrame API, and uses Delta Lake for structured output.",
        features: [
          "Built a two-stage Spark pipeline to aggregate orders and join with restaurant metadata",
          "Generated country/cuisine rankings using joins, aggregations, and ranking logic in Spark SQL",
          "Persisted outputs to HDFS and Delta Lake and validated results by reloading and sampling",
        ],
        technologies: [
          "Apache Spark",
          "PySpark",
          "Delta Lake",
          "Hadoop (YARN)",
          "HDFS",
          "RDD",
          "Hive",
          "MapReduce",
          "Python",
          "Jupyter Notebook",
        ],
      },
    ],
  },
  {
    title: "AI Projects",
    projects: [
      {
        title: "Fire Detection and Localization - PyTorch",
        image: "/portfolio-page/projects/fire.png",
        github: "https://github.com/MarkOmelyanenko/AI-fire-detection",
        description:
          "Fire detection and localization in images and videos using deep learning.",
        features: [
          "Developed and trained a CNN-based model to detect and localize fire regions",
          "Evaluated model accuracy and real-time performance",
        ],
        technologies: ["PyTorch", "Python", "CNN"],
      },
      {
        title: "Image Retrieval System using CNN & Transformer Descriptors",
        image: "/portfolio-page/projects/image_retrieval.png",
        github:
          "https://github.com/MarkOmelyanenko/cloud-computing-image-retrieval",
        description:
          "Image similarity search using precomputed deep-learning descriptors with multiple model support.",
        features: [
          "Implemented CBIR system using deep-learning descriptors and distance metrics",
          "Built web interface supporting login, search history, and precision/recall evaluation",
          "Supported multiple models: VGG16, MobileNet, ResNet50, ViT_16",
        ],
        technologies: [
          "Flask",
          "PostgreSQL",
          "Docker",
          "PyTorch",
          "VGG16",
          "MobileNet",
          "ResNet50",
          "ViT16",
        ],
      },
    ],
  },
  {
    title: "Quant Data Projects",
    projects: [
      {
        title: "Order Book Imbalance Signal - Python",
        image: null,
        github:
          "https://github.com/MarkOmelyanenko/python-order-book-imbalance-signal",
        description:
          "A Python project for analyzing Limit Order Book data, calculating Bid/Ask imbalance, generating trading signals, and observing correlations with price changes.",
        features: [
          "Implemented LOB analysis pipeline (CSV loading and mock LOB generation)",
          "Computed imbalance metrics: volume, price-weighted, and order-flow",
          "Generated buy/sell/neutral signals (threshold, smoothed, momentum, combined)",
          "Evaluated signals via multi-horizon correlation and forward-return stats",
          "Exported results to CSV and produced visual diagnostics",
        ],
        technologies: ["Python", "Pandas", "NumPy", "Matplotlib"],
      },
      {
        title: "Mean Reversion Backtester - Python",
        image: null,
        github:
          "https://github.com/MarkOmelyanenko/python-mean-reversion-backtester",
        description:
          "A comprehensive Python backtester for mean-reversion trading strategies with realistic transaction costs and out-of-sample validation.",
        features: [
          "Implemented z-score mean-reversion strategy with configurable lookback",
          "Built realistic backtest with no look-ahead bias and transaction costs",
          "Performed grid search on train data and out-of-sample validation",
          "Generated equity/drawdown plots and key metrics (CAGR, Sharpe, MDD)",
        ],
        technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "yfinance"],
      },
      {
        title: "Tick Data Analysis - kdb+/q",
        image: null,
        github: "https://github.com/MarkOmelyanenko/kdb-q-tick-data-analysis",
        description:
          "A kdb+/q project for generating synthetic tick data and performing financial analytics including VWAP calculations and time-bar aggregations.",
        features: [
          "Generated 1.5M synthetic tick records (AAPL/MSFT/GOOG/AMZN)",
          "Implemented core analytics: VWAP (per symbol and overall)",
          "Created 1-minute bars (OHLC, VWAP, volume, trade count)",
          "Demonstrated practical q patterns including select vs exec",
        ],
        technologies: ["kdb+/q"],
      },
    ],
  },
];

// Extract all unique technologies
const allTechnologies = [
  ...new Set(
    projectGroups.flatMap((group) =>
      group.projects.flatMap((project) => project.technologies || []),
    ),
  ),
].sort();

export default function ProjectsLanding() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    if (selectedFilter === "All") {
      return projectGroups;
    }

    return projectGroups
      .map((group) => ({
        ...group,
        projects: group.projects.filter((project) =>
          project.technologies?.includes(selectedFilter),
        ),
      }))
      .filter((group) => group.projects.length > 0);
  }, [selectedFilter]);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section
      id="projects"
      className="min-h-screen bg-gray-900 text-white py-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            My Projects
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-400">
            Explore my projects, from small utilities to full-stack
            applications!
          </p>
        </motion.div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedFilter("All")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === "All"
                  ? "bg-cyan-400 text-gray-900"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              All
            </button>
            {allTechnologies.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedFilter(tech)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === tech
                    ? "bg-cyan-400 text-gray-900"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="space-y-8">
          {filteredProjects.map(
            (group, index) =>
              group.projects.length > 0 && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.01,
                    boxShadow: "0px 0px 20px rgba(0, 170, 255, 0.97)",
                  }}
                  className="bg-gray-800 p-6 rounded-2xl shadow-lg transition-all"
                >
                  <h2 className="text-3xl font-semibold mb-4 text-white">
                    {group.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.projects.map((project, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0px 0px 15px rgba(0, 170, 255, 0.6)",
                        }}
                        className="bg-gray-700 p-4 rounded-2xl shadow-md transition-all cursor-pointer"
                        onClick={() => openModal(project)}
                      >
                        <Card>
                          <CardContent className="p-4">
                            {project.image && (
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-40 object-cover rounded-xl mb-4"
                              />
                            )}
                            <h3 className="text-xl font-semibold mb-2 text-white">
                              {project.title}
                            </h3>
                            {/* Technology Tags */}
                            {project.technologies && (
                              <div className="flex flex-wrap gap-2 mb-3">
                                {project.technologies
                                  .slice(0, 3)
                                  .map((tech, techIdx) => (
                                    <span
                                      key={techIdx}
                                      className="px-2 py-1 bg-gray-600 text-cyan-400 rounded text-xs font-medium"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                {project.technologies.length > 3 && (
                                  <span className="px-2 py-1 bg-gray-600 text-gray-400 rounded text-xs">
                                    +{project.technologies.length - 3}
                                  </span>
                                )}
                              </div>
                            )}
                            <div className="flex gap-4 flex-wrap">
                              {project.github && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 transition-colors text-sm"
                                >
                                  GitHub
                                </a>
                              )}
                              {project.githubFrontend && (
                                <a
                                  href={project.githubFrontend}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 transition-colors text-sm"
                                >
                                  Frontend
                                </a>
                              )}
                              {project.githubBackend && (
                                <a
                                  href={project.githubBackend}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 transition-colors text-sm"
                                >
                                  Backend
                                </a>
                              )}
                              {project.demo && (
                                <a
                                  href={project.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center justify-center rounded-md bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600 transition-colors text-sm"
                                >
                                  Demo
                                </a>
                              )}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openModal(project);
                              }}
                              className="mt-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                            >
                              View Details →
                            </button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ),
          )}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}
