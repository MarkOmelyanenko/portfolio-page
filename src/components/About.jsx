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
    <section
      id="about"
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
              I'm a passionate full-stack developer and data engineer with
              expertise in building scalable web applications and working with
              high-frequency financial data. My journey in software development
              has led me to work with a diverse range of technologies, from
              modern frontend frameworks to robust backend systems.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              I specialize in creating end-to-end solutions using Spring Boot,
              React, and various databases. I also have experience in
              quantitative finance, working with kdb+/q for high-frequency data
              analysis and developing trading signals.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              When I'm not coding, I enjoy exploring new technologies,
              contributing to open-source projects, and continuously learning
              to stay at the forefront of software development.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { label: "Projects Completed", value: "20+" },
              { label: "Technologies", value: "15+" },
              { label: "Years of Experience", value: "3+" },
              { label: "GitHub Repositories", value: "30+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-center"
              >
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

