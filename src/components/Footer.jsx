import React from 'react';

const Footer = () => {
    return (
        <footer
            id="contact"
            className="pt-40 pb-20 px-5 md:px-10 bg-bg-deep text-white/80 text-center border-t border-white/5"
        >
            <div className="max-w-7xl mx-auto">
                <h2 className="text-[clamp(3rem,12vw,12rem)] font-display leading-[0.8] tracking-[-0.05em] text-white my-8 w-full overflow-hidden text-ellipsis">
                    LUMINA
                </h2>

                <div className="flex flex-wrap justify-between gap-10 mt-20 text-left">
                    <div>
                        <p className="font-body font-semibold text-white mb-4">SOCIALS</p>
                        <ul className="space-y-2 text-white/50 hover:text-white/80 transition-colors">
                            <li className="cursor-pointer hover:text-white transition-colors">Instagram</li>
                            <li className="cursor-pointer hover:text-white transition-colors">Twitter</li>
                            <li className="cursor-pointer hover:text-white transition-colors">LinkedIn</li>
                        </ul>
                    </div>

                    <div>
                        <p className="font-body font-semibold text-white mb-4">CONTACT</p>
                        <p className="text-white/50 hover:text-white transition-colors cursor-pointer">hello@luminastudio.dev</p>
                    </div>

                    <div>
                        <p className="font-body font-semibold text-white mb-4">LOCATION</p>
                        <p className="text-white/50">New York, NY</p>
                    </div>
                </div>

                <div className="mt-20 flex justify-between text-xs text-white/30 uppercase tracking-widest font-body">
                    <p>© 2026 Lumina Studio</p>
                    <p>All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
