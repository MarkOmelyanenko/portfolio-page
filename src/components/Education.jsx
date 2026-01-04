// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const education = [
  {
    degree: "B.Sc. in Computer Science",
    institution: "Poznan University of Technology",
    location: "Poland",
    period: "October 2022 - February 2026",
    description: "Computer Science degree with focus on backend development and software engineering",
  },
  {
    degree: "Erasmus+ Exchange Program - Computer Science",
    institution: "University of Mons (UMONS)",
    location: "Belgium",
    period: "September 2024 - June 2025",
    description: "International exchange program focusing on advanced computer science topics",
  },
];

export default function Education() {
  return (
    <section
      id="education"
      className="min-h-screen py-20 bg-gray-800 text-white"
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
            Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto"></div>
          <p className="text-gray-400 mt-4 text-lg">
            Academic background and qualifications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900 p-8 rounded-xl border border-gray-700 hover:border-cyan-400 transition-colors"
            >
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">
                  {edu.degree}
                </h3>
                <p className="text-xl text-gray-300 mb-1">{edu.institution}</p>
                <p className="text-gray-400 text-sm mb-3">{edu.location}</p>
                <p className="text-cyan-400 font-semibold">{edu.period}</p>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {edu.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Volunteering Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-center mb-8 text-cyan-400">
            Volunteering
          </h3>
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-700 max-w-3xl mx-auto">
            <div className="mb-4">
              <h4 className="text-xl font-semibold text-white mb-2">
                Erasmus Buddy
              </h4>
              <p className="text-gray-300 mb-1">
                Erasmus Student Network (ESN), Poznan University of Technology
              </p>
              <p className="text-cyan-400 font-semibold">
                September 2025 – Present
              </p>
            </div>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>
                  Supported incoming international students during their
                  Erasmus+ exchange
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>
                  Helped them adapt to local culture and university life,
                  assisted with daily matters, and organized social activities
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>
                  Strengthened communication, problem-solving, and
                  intercultural collaboration skills
                </span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

