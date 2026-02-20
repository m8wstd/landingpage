import React, { useState } from 'react';

const Contact = () => {
    const [message] = useState('');

    const handleWhatsapp = () => {
        const msg = encodeURIComponent(message || "Olá Maxwell, gostaria de mais informações!");
        const phone = "5527974002669";
        window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
    };

    const handleEmail = () => {
        const msg = encodeURIComponent(message || "Olá Maxwell, gostaria de mais informações!");
        const email = "mw.dev.contact@proton.me";
        const subject = encodeURIComponent("Contato via site");
        window.open(`mailto:${email}?subject=${subject}&body=${msg}`, "_blank");
    };

    return (
        <div className="contact bg-[#1a2235] w-full py-20 flex justify-center">
            <div className="contact-content w-4/5 max-w-6xl flex flex-col items-center text-center">
                <h1 className="text-5xl font-extrabold text-[#47b8ec] mb-5">Contate-me!</h1>
                
                <p className="text-xl text-white/70 max-w-2xl leading-relaxed mb-10 text-center font-sans">
                    Quer desenvolver alguma coisa e precisa de ajuda?<br/>
                    É só me mandar mensagem!
                </p>

                <button onClick={handleWhatsapp} className="btn w-full md:w-[480px] inline-flex items-center justify-center gap-4 bg-[#47b8ec] text-black/87 px-10 py-4 rounded-2xl font-bold text-xl no-underline transition-transform hover:scale-105 hover:bg-[#70c1e6] mb-5 cursor-pointer">
                    <img src="./images/whatsapp.svg" alt="WhatsApp" className="w-8 h-auto block" />
                    <span className='text-black'>+55 27 97400-2669</span>
                </button>

                <button onClick={handleEmail} className="btn w-full md:w-[480px] inline-flex items-center justify-center gap-4 bg-[#47b8ec] text-black/87 px-10 py-4 rounded-2xl font-bold text-xl no-underline transition-transform hover:scale-105 hover:bg-[#70c1e6] mb-5 cursor-pointer">
                    <img src="./images/mail.svg" alt="Email" className="w-8 h-auto block" />
                    <span className='text-black'>maxwellfercar@gmail.com</span>
                </button>

            </div>
        </div>
    );
};

export default Contact;
