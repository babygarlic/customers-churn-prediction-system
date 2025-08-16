import React from "react" 
import {useState} from 'react'
import { Router, Route, Routes } from "react-router-dom"
export default function Header(user){
    const [isLogin, setIsLogin]= useState(false)

    if (isLogin){
        return <nav className="bg-blue-600 text-white fixed w-full top-0 z-50 shadow-md">
                    <div className="container mx-auto flex justify-between items-center py-4 px-4">
                        <div className="text-2xl font-bold">
                            ChurnPredict
                        </div>
                        <div className="hidden md:flex space-x-6">
                            <a href="/" className="hover:text-gray-200 transition">Home</a>
                            <a href="/predict" className="hover:text-gray-200 transition">Prediction</a>
                            <a href="/contact" className="hover:text-gray-200 transition">Contact</a>
                        </div>
                        </div>
            </nav>
    }

    return<nav className="bg-blue-600 text-white fixed w-full top-0 z-50 shadow-md">
                    <div className="container mx-auto flex justify-between items-center py-4 px-4">
                        <div className="text-2xl font-bold">
                            ChurnPredict
                        </div>
                        <div className="hidden md:flex space-x-6">
                            <a href="/" className="hover:text-gray-200 transition">Home</a>
                            <a href="/contact" className="hover:text-gray-200 transition">Contact</a>
                            <a href="/login" className="hover:text-gray-200 transition">Login</a>
                            <a href="/register" className="hover:text-gray-200 transition">Register</a>
                        </div>
                        </div>
            </nav>
}