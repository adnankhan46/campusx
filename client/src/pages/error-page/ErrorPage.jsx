import React from 'react';
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="min-h-screen bg-[#FAF4FE] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Status checks */}
        <div className="bg-black/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 mb-8">
          <div className="space-y-4">
            {/* Browser working */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-black font-medium">Your browser</p>
                <p className="text-black/60 text-sm">Working</p>
              </div>
            </div>

            {/* BeCampusX working */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-black font-medium">becampusx</p>
                <p className="text-black/60 text-sm">Working</p>
              </div>
            </div>

            {/* Page not found */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-black font-medium">The page you requested</p>
                <p className="text-black/60 text-sm">Does not exist</p>
              </div>
            </div>
          </div>
        </div>

        {/* Error message */}
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-black/90 mb-4">404</h1>
          <p className="text-xl md:text-2xl text-black/70 mb-2">Page Not Found</p>
          <p className="text-black/50">The page you're looking for doesn't exist or has been moved.</p>
        </div>

        {/* Back to home button */}
        <div className="flex justify-center">
          <a
            href="/"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-[#6a7cff] text-white font-medium rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
