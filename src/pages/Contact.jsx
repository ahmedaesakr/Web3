import React from 'react'
import { motion } from 'framer-motion'

function Contact() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-grow flex items-center justify-center py-20 min-h-[70vh]"
        >
            <div className="max-w-[600px] w-full px-5 text-center">
                <h1 className="text-4xl md:text-6xl font-display font-bold uppercase mb-6 text-white">Let's Collaborate</h1>
                <p className="text-white/60 font-body mb-8">
                    Interested in forming a partnership, looking for a consultation, or just want to chat? Our studio doors are always open.
                </p>

                <form className="flex flex-col gap-4 text-left" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="bg-[#111] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-white/30 transition-colors"
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="bg-[#111] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-white/30 transition-colors"
                    />
                    <textarea
                        rows="5"
                        placeholder="Tell us about your project"
                        className="bg-[#111] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-white/30 transition-colors resize-none"
                    ></textarea>

                    <button type="submit" className="glass-button w-full justify-center mt-2 group">
                        Send Message
                    </button>
                </form>
            </div>
        </motion.div>
    )
}

export default Contact
