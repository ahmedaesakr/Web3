import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 w-full px-8 py-6 flex justify-between items-center z-50 bg-black/10 backdrop-blur-md mix-blend-difference border-b border-white/5"
        >
            <div className="font-display font-extrabold text-2xl tracking-tighter text-white">
                <Link to="/">LUMINA STUDIO</Link>
            </div>

            <div className="flex gap-8 items-center">
                {[
                    { name: 'WORK', path: '/work' },
                    { name: 'STUDIO', path: '/studio' },
                    { name: 'CONTACT', path: '/contact' }
                ].map((item, index) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className="font-body font-medium text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                        {item.name}
                        <span className="text-[0.6rem] opacity-50 group-hover:opacity-100 transition-opacity translate-y-[1px]">0{index + 1}</span>
                    </Link>
                ))}
            </div>
        </motion.nav>
    );
};

export default Navbar;
