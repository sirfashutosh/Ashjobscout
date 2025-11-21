import React, { useState } from 'react';
import { Search, Sparkles, Building2, Linkedin } from 'lucide-react';
import { DataSource } from '../types';

interface SearchFormProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  source: DataSource;
  onSourceChange: (source: DataSource) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading, source, onSourceChange }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-16 pt-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Scout your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">dream job.</span>
        </h2>
        <p className="text-slate-500 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Leverage AI to scan the {source === 'YC' ? 'Y Combinator ecosystem' : 'LinkedIn network'}. 
          Describe your ideal role and let the scout do the work.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Tabs */}
        <div className="flex justify-center mb-6">
            <div className="bg-slate-100 p-1 rounded-xl inline-flex items-center shadow-inner">
                <button
                    type="button"
                    onClick={() => onSourceChange('YC')}
                    disabled={isLoading}
                    className={`
                        flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200
                        ${source === 'YC' 
                            ? 'bg-white text-indigo-600 shadow-md shadow-slate-200 ring-1 ring-slate-200' 
                            : 'text-slate-500 hover:text-slate-700'
                        }
                    `}
                >
                    <Building2 className="w-4 h-4" />
                    <span>Y Combinator</span>
                </button>
                <button
                    type="button"
                    onClick={() => onSourceChange('LinkedIn')}
                    disabled={isLoading}
                    className={`
                        flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200
                        ${source === 'LinkedIn' 
                            ? 'bg-[#0077B5] text-white shadow-md shadow-blue-200' 
                            : 'text-slate-500 hover:text-slate-700'
                        }
                    `}
                >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                </button>
            </div>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSubmit} className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative flex items-center bg-white rounded-2xl shadow-2xl shadow-indigo-100/50 transform transition-all duration-200 hover:scale-[1.01]">
            <div className={`pl-6 ${source === 'LinkedIn' ? 'text-[#0077B5]' : 'text-indigo-500'}`}>
                <Search className="w-6 h-6" />
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder={source === 'YC' 
                    ? "Describe role (e.g., 'Series A Fintech looking for React Devs')" 
                    : "Search LinkedIn (e.g., 'Senior Marketing Manager in New York')"
                }
                className="w-full px-4 py-6 text-lg bg-transparent border-none focus:ring-0 text-slate-800 placeholder-slate-400 rounded-2xl"
            />
            <div className="pr-2">
                <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`
                    p-3 rounded-xl transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-white
                    ${source === 'LinkedIn' 
                        ? 'bg-[#0077B5] hover:bg-[#006097] hover:shadow-blue-500/30' 
                        : 'bg-slate-900 hover:bg-indigo-600 hover:shadow-indigo-500/30'
                    }
                `}
                >
                {isLoading ? (
                    <Sparkles className="w-6 h-6 animate-spin" />
                ) : (
                    <div className="flex items-center gap-2 px-2">
                        <span className="font-medium">Scout</span>
                    </div>
                )}
                </button>
            </div>
            </div>
        </form>
      </div>
    </div>
  );
};