// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const experiences = [
  {
    title: "Junior Software Engineer",
    company: "SynergySoft",
    location: "Remote",
    period: "May 2025 – August 2025",
    description: [
      "Built and maintained backend features and service integrations, turning requirements into clean, readable code",
      "Implemented REST API endpoints and improved existing ones, ensuring consistent request/response contracts",
      "Investigated issues using logs and debugging tools, identified root causes, and delivered fixes in collaboration with senior engineers",
      "Added automated tests for critical paths and supported regression checks to keep releases stable",
      "Worked in an Agile workflow (planning/standups/reviews), delivered changes through code review",
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="min-h-screen py-20 bg-gray-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto"></div>
          <p className="text-gray-400 mt-4 text-lg">My professional journey</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-700"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full border-4 border-gray-900 z-10"></div>

                {/* Content */}
                <div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 pl-16" : "md:pl-12 pr-16"
                  }`}
                >
                  <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-cyan-400 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-cyan-400 mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-xl text-gray-300">{exp.company}</p>
                      </div>
                      <div className="text-right mt-2 md:mt-0">
                        <p className="text-gray-400 text-sm">{exp.location}</p>
                        <p className="text-cyan-400 font-semibold">
                          {exp.period}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-2 mt-4">
                      {exp.description.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-gray-300 flex items-start gap-2"
                        >
                          <span className="text-cyan-400 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
