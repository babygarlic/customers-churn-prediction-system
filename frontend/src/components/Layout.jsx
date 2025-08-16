import Header from './Header.jsx';
import Footer from './Footer.jsx';
import React from 'react';
export default function LayOut({children}){
    // xu ly layout
 return (
            <div className="bg-gray-100 font-sans min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow pt-16">
                    {children}
                </main>
                <Footer />
            </div>
            );
}