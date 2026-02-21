// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "JavaScript", "HTML/CSS", "Tailwind CSS", "Bootstrap"],
  },
  {
    title: "Backend",
    skills: [
      "Spring Boot",
      "Java",
      "Python",
      "FastAPI",
      "Flask",
      "REST API",
      "Microservices",
      "Redis",
      "Kafka",
      "Swagger",
      "OpenAPI",
    ],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "kdb+/q"],
  },
  {
    title: "Testing",
    skills: ["JUnit", "PyTest", "Actuator", "Prometheus"],
  },
  {
    title: "Data Engineering",
    skills: ["Numpy", "Pandas", "Matplotlib", "PyTorch"],
  },
  {
    title: "Tools & Others",
    skills: [
      "Git",
      "Linux",
      "Bash",
      "Docker",
      "Maven",
      "Jenkins",
      "GitHub Actions",
      "Google Cloud Platform",
      "Amazon Web Services",
    ],
  },
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="skills" className="min-h-screen py-20 bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto"></div>
          <p className="text-gray-400 mt-4 text-lg">
            Technologies I work with to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900 p-6 rounded-xl border border-gray-700"
            >
              <h3 className="text-2xl font-semibold mb-6 text-cyan-400">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 hover:border-cyan-400 hover:bg-gray-750 transition-colors"
                  >
                    <span className="text-gray-300 font-medium hover:text-white transition-colors">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
