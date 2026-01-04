// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="about" className="min-h-screen py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              {/* I'm a passionate full-stack developer and data engineer with
              expertise in building scalable web applications and working with
              high-frequency financial data. My journey in software development
              has led me to work with a diverse range of technologies, from
              modern frontend frameworks to robust backend systems. */}
              I’m a final-year Bachelor’s Computer Science student focused on
              building reliable systems. My go-to stack is Java/Spring Boot,
              React, and SQL/NoSQL databases. Lately, I’ve also been getting
              into quantitative finance — learning the basics of research and
              market data analysis in Python and kdb+/q.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              {/* I specialize in creating end-to-end solutions using Spring Boot,
              React, and various databases. I also have experience in
              quantitative finance, working with kdb+/q for high-frequency data
              analysis and developing trading signals. */}
              I’m especially interested in real-time apps that feel
              “production-like”: structured code, predictable behavior, and
              maintainable architecture.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              When I’m not coding, I explore new tools, polish side projects,
              and keep learning by building.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-semibold mb-6 text-cyan-400">
                Principles
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    <strong className="text-white">
                      Clarity over cleverness
                    </strong>{" "}
                    — readable code, clear naming, simple flows
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    <strong className="text-white">
                      Small iterations shipped
                    </strong>{" "}
                    — build → test → improve
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    <strong className="text-white">
                      Measured improvements
                    </strong>{" "}
                    — performance/UX only where it matters
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    <strong className="text-white">Automation helps</strong> —
                    scripts, Docker, repeatable setup
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-semibold mb-6 text-cyan-400">
                What I care about
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    <strong className="text-white">
                      Maintainable backend design
                    </strong>{" "}
                    — clean APIs, sane data models
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    <strong className="text-white">
                      Data-informed decisions
                    </strong>{" "}
                    — basic research mindset (tests, plots, sanity checks)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    <strong className="text-white">Learning by building</strong>{" "}
                    — side projects as a playground
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
