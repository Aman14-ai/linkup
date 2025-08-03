"use client";
import React from "react";

interface ErrorProps {
  error?: Error | string;
  statusCode?: number;
  title?: string;
  message?: string;
  showDetails?: boolean;
  onRetry?: () => void;
  onGoHome?: () => void;
}

const Error: React.FC<ErrorProps> = ({
  error,
  statusCode,
  title,
  message,
  showDetails = false,
  onRetry,
  onGoHome,
}) => {
  // Determine error details
  const getErrorInfo = () => {
    if (statusCode) {
      switch (statusCode) {
        case 404:
          return {
            title: title || "Page Not Found",
            message: message || "The page you are looking for does not exist.",
            icon: "🔍",
          };
        case 500:
          return {
            title: title || "Internal Server Error",
            message:
              message ||
              "Something went wrong on our end. Please try again later.",
            icon: "⚠️",
          };
        case 403:
          return {
            title: title || "Access Denied",
            message:
              message || "You do not have permission to access this resource.",
            icon: "🚫",
          };
        case 401:
          return {
            title: title || "Unauthorized",
            message: message || "Please log in to access this resource.",
            icon: "🔐",
          };
        default:
          return {
            title: title || `Error ${statusCode}`,
            message: message || "An unexpected error occurred.",
            icon: "❌",
          };
      }
    }

    if (error) {
      const errorMessage = typeof error === "string" ? error : error.message;
      return {
        title: title || "Something went wrong",
        message: message || errorMessage || "An unexpected error occurred.",
        icon: "❌",
      };
    }

    return {
      title: title || "Oops! Something went wrong",
      message: message || "An unexpected error occurred. Please try again.",
      icon: "❌",
    };
  };

  const errorInfo = getErrorInfo();
  const errorDetails =
    typeof error === "object" ? error?.stack || error?.message : error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 px-6 py-8 text-center">
          <div className="text-6xl mb-4">{errorInfo.icon}</div>
          <h1 className="text-white text-2xl font-bold">{errorInfo.title}</h1>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            {errorInfo.message}
          </p>

          {/* Error Code */}
          {statusCode && (
            <div className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Error Code: {statusCode}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {onRetry && (
              <button
                onClick={onRetry}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Try Again
              </button>
            )}

            {onGoHome && (
              <button
                onClick={onGoHome}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
              >
                Go Home
              </button>
            )}

            {!onRetry && !onGoHome && (
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Refresh Page
              </button>
            )}
          </div>

          {/* Error Details (Developer Mode) */}
          {showDetails && errorDetails && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-gray-500 text-sm font-medium hover:text-gray-700 transition-colors">
                Show Technical Details
              </summary>
              <div className="mt-3 p-4 bg-gray-50 rounded-lg border">
                <pre className="text-xs text-gray-700 overflow-auto whitespace-pre-wrap break-words">
                  {errorDetails}
                </pre>
              </div>
            </details>
          )}

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              If this problem persists, please contact support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
