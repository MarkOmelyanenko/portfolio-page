import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { motion } from "framer-motion";

const projectGroups = [
  {
    title: "Full-Stack (Spring Boot + React + DB)",
    projects: [
      {
        title: "Movie reviews and trailers - Spring Boot & React & MongoDB",
        image: "/portfolio-page/projects/movies.png",
        githubFrontend: "https://github.com/your-frontend-repo",
        githubBackend: "https://github.com/your-backend-repo",
        demo: "https://your-demo-link.com",
      },
      {
        title: "Crypto Platform - Spring Boot & React & PostgreSQL",
        image: "https://via.placeholder.com/300",
        githubFrontend: "https://github.com/your-frontend-repo",
        githubBackend: "https://github.com/your-backend-repo",
        demo: null,
      },
    ],
  },
  {
    title: "HTML & CSS",
    projects: [
      {
        title: "Marta Up Landing",
        image: "/portfolio-page/projects/martaup.png",
        github: "",
        demo: "/projects/HTML&CSS/martaup-landing/index.html",
      },
      {
        title: "Space Tourism Landing",
        image: "/portfolio-page/projects/spacetourism.png",
        github: "",
        demo: "/projects/HTML&CSS/space-tourism-landing/index.html",
      },
      {
        title: "Films Landing - Bootstrap",
        image: "/portfolio-page/projects/filmslanding.png",
        github: "",
        demo: "/projects/HTML&CSS/films-pages/index.html",
      },
    ],
  },
  {
    title: "Vanilla JS",
    projects: [
      {
        title: "Calculator",
        image: "/portfolio-page/projects/calculator.png",
        github: "",
        demo: "/projects/JS/calculator/index.html",
      },
      {
        title: "Counter",
        image: "/portfolio-page/projects/counter.png",
        github: "",
        demo: "/projects/JS/counter/index.html",
      },
      {
        title: "Dice Roller",
        image: "/portfolio-page/projects/diceroller.png",
        github: "",
        demo: "/projects/JS/dice-roller/index.html",
      },
      {
        title: "Password Generator (Console)",
        image: "/portfolio-page/projects/passwordgen.png",
        github: "",
        demo: "/projects/JS/password-generator/index.html",
      },
      {
        title: "Temperature Converter",
        image: "/portfolio-page/projects/tempconverter.png",
        github: "",
        demo: "/projects/JS/temperature-converter/index.html",
      },
    ],
  },
  {
    title: "React Projects",
    projects: [
      {
        title: "Color Picker App",
        image: "/portfolio-page/projects/color.png",
        github: "",
        demo: "/projects/React/color-picker-app/index.html",
      },
    ],
  },
  {
    title: "AI Projects",
    projects: [
      {
        title: "Fire Detection and Localization - PyTorch",
        image: "/portfolio-page/projects/fire.png",
        github: "",
      },
    ],
  },
];

export default function ProjectsLanding() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-4xl font-bold text-center mb-6">My Projects</h1>
      <p className="text-lg text-gray-400 text-center mb-8">
        Explore my projects, from small utilities to full-stack applications!
      </p>
      <div className="space-y-8">
        {projectGroups.map((group, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.01,
              boxShadow: "0px 0px 20px rgba(0, 170, 255, 0.97)",
            }}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg transition-all"
          >
            <h2 className="text-3xl font-semibold mb-4">{group.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.projects.length > 0 ? (
                group.projects.map((project, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{
                      scale: 1.01,
                      boxShadow: "0px 0px 15px rgba(0, 170, 255, 0.6)",
                    }}
                    className="bg-gray-700 p-4 rounded-2xl shadow-md transition-all"
                  >
                    <Card>
                      <CardContent className="p-4">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-40 object-cover rounded-xl mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2">
                          {project.title}
                        </h3>
                        <div className="flex gap-4 flex-wrap">
                          <Button asChild>
                            <a href={project.github} target="_blank">
                              GitHub
                            </a>
                          </Button>
                          {project.githubFrontend && (
                            <Button asChild>
                              <a href={project.githubFrontend} target="_blank">
                                Frontend GitHub
                              </a>
                            </Button>
                          )}
                          {project.githubBackend && (
                            <Button asChild>
                              <a href={project.githubBackend} target="_blank">
                                Backend GitHub
                              </a>
                            </Button>
                          )}
                          {project.demo && (
                            <Button asChild variant="secondary">
                              <a href={project.demo} target="_blank">
                                Live Demo
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-400">No projects available yet.</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
