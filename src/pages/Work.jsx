import React from 'react'
import { motion } from 'framer-motion'
import WorkSection from '../components/WorkSection'

function Work() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-10"
        >
            <WorkSection />
        </motion.div>
    )
}

export default Work
