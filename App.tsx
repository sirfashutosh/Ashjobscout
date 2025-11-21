import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { CompanyCard } from './components/CompanyCard';
import { ProgressBar } from './components/ProgressBar';
import { JobStats } from './components/JobStats';
import { DownloadModal } from './components/DownloadModal';
import { Login } from './components/Login';
import { Sidebar } from './components/Sidebar';
import { WorkingBoard } from './components/WorkingBoard';
import { CompanyDetail } from './components/CompanyDetail';
import { streamJobData } from './services/geminiService';
import { Company, DataSource, CompanyStatus } from './types';
import { AlertCircle, ArrowDownUp, Download, Plus, RefreshCw, Menu, Search } from 'lucide-react';

type SortOption = 'original' | 'name' | 'jobs';
type View = 'working-board' | 'all-jobs';

export const App: React.FC = () => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // App View State
  const [currentView, setCurrentView] = useState<View>('working-board');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // Data State
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [statusLog, setStatusLog] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<DataSource>('YC');
  
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('original');
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  
  // ------------------- Handlers -------------------

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCompanies([]); 
    setHasSearched(false);
    setSelectedCompany(null);
  };

  const handleViewChange = (view: View) => {
      setCurrentView(view);
      setSelectedCompany(null); // Reset detail view when changing tabs
      window.scrollTo(0, 0);
  };

  const handleProcessCompany = (companyName: string, status: 'worked' | 'skipped') => {
    setCompanies(prev => prev.map(c => {
        if (c.name === companyName) {
            return { ...c, status };
        }
        return c;
    }));
    setSelectedCompany(null); // Close detail view
    window.scrollTo(0, 0);
  };

  const processStream = async (query: string, currentSource: DataSource, excludeNames: string[] = []) => {
    setError(null);
    setStatusLog(`Initializing ${currentSource} agent...`);
    
    try {
      for await (const update of streamJobData(query, currentSource, excludeNames)) {
        if (update.type === 'log') {
            setStatusLog(update.message);
        } else if (update.type === 'company') {
            const newCompany = { ...update.data, status: 'pending' as CompanyStatus };
            setCompanies(prev => [...prev, newCompany]);
            setStatusLog(`Found ${update.data.name}`);
        }
      }
    } catch (err) {
      console.error(err);
      setError((err as Error).message || "An unexpected error occurred.");
    } finally {
      setIsSearching(false);
      setIsLoadingMore(false);
      setStatusLog('Search complete.');
    }
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setHasSearched(true);
    setCurrentQuery(query);
    setCompanies([]); 
    await processStream(query, source);
  };

  const handleLoadMore = async () => {
    if (!currentQuery) return;
    setIsLoadingMore(true);
    const existingNames = companies.map(c => c.name);
    await processStream(currentQuery, source, existingNames);
  };

  const handleSourceChange = (newSource: DataSource) => {
    setSource(newSource);
    setCompanies([]);
    setCurrentQuery('');
    setHasSearched(false);
  };

  const sortedCompanies = useMemo(() => {
    const list = [...companies];
    if (sortOption === 'name') {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'jobs') {
      return list.sort((a, b) => b.jobs.length - a.jobs.length);
    }
    return list;
  }, [companies, sortOption]);

  const showResults = companies.length > 0;
  const activeLoading = isSearching || isLoadingMore;
  const pendingCount = companies.filter(c => !c.status || c.status === 'pending').length;

  // ------------------- Render -------------------

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex font-sans bg-slate-50">
      
      <Sidebar 
        activeTab={currentView} 
        onTabChange={handleViewChange} 
        onLogout={handleLogout}
        pendingCount={pendingCount}
      />

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        
        <div className="md:hidden bg-white border-b p-4 flex items-center justify-between sticky top-0 z-40">
             <h1 className="font-bold text-slate-800">Ash Job Scout</h1>
             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-slate-100 rounded">
                <Menu className="w-5 h-5" />
             </button>
        </div>
        {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-b p-4 space-y-2 absolute top-16 left-0 right-0 z-30 shadow-xl">
                <button onClick={() => {handleViewChange('working-board'); setIsMobileMenuOpen(false);}} className="block w-full text-left p-2 font-bold text-slate-700">Working Board</button>
                <button onClick={() => {handleViewChange('all-jobs'); setIsMobileMenuOpen(false);}} className="block w-full text-left p-2 font-bold text-slate-700">All Jobs</button>
            </div>
        )}

        <main className="flex-grow p-4 sm:p-8 lg:p-12 overflow-y-auto">
          
          {currentView === 'working-board' && (
            <>
              {selectedCompany ? (
                  <CompanyDetail 
                      company={selectedCompany}
                      onBack={() => setSelectedCompany(null)}
                      onComplete={() => handleProcessCompany(selectedCompany.name, 'worked')}
                  />
              ) : (
                  <WorkingBoard 
                      companies={companies} 
                      onProcess={handleProcessCompany}
                      onViewDetail={setSelectedCompany}
                      onSwitchToScout={() => handleViewChange('all-jobs')}
                  />
              )}
            </>
          )}

          {currentView === 'all-jobs' && (
            <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
                <SearchForm 
                    onSearch={handleSearch} 
                    isLoading={activeLoading} 
                    source={source}
                    onSourceChange={handleSourceChange}
                />

                {(activeLoading || showResults) && (
                    <ProgressBar 
                        count={companies.length} 
                        isSearching={activeLoading} 
                        statusMessage={statusLog}
                    />
                )}

                {error && (
                <div className="max-w-3xl mx-auto mb-8 bg-red-50 border border-red-100 rounded-xl p-5 flex items-start gap-4 text-red-700 shadow-sm animate-in fade-in slide-in-from-top-2">
                    <div className="bg-red-100 p-2 rounded-full">
                        <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                    <h3 className="font-bold text-lg">System Error</h3>
                    <p className="text-sm opacity-90 mt-1">{error}</p>
                    </div>
                </div>
                )}

                {(!activeLoading && hasSearched && !showResults && !error) && (
                    <div className="text-center py-12 animate-in fade-in">
                        <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-700">No matches found</h3>
                        <p className="text-slate-500 mt-2 max-w-md mx-auto">
                           We couldn't find any new companies matching "{currentQuery}". Try adjusting your keywords or switching between YC and LinkedIn.
                        </p>
                    </div>
                )}

                {showResults && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    
                    <JobStats companies={companies} />

                    <div className="glass-panel rounded-xl p-4 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 border border-white/40 shadow-sm">
                    <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
                        <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${source === 'LinkedIn' ? 'bg-blue-100 text-blue-700' : 'bg-indigo-100 text-indigo-700'}`}>
                                {companies.length}
                            </span>
                            <span>Total</span>
                        </div>
                        <div className="h-4 w-px bg-slate-300"></div>
                         <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-600">
                                {pendingCount}
                            </span>
                            <span>Pending</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:flex-none">
                            <ArrowDownUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500 pointer-events-none" />
                            <select 
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value as SortOption)}
                            className="w-full sm:w-48 pl-10 pr-8 py-2.5 bg-white hover:bg-slate-50 border-0 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm transition-all"
                            >
                            <option value="original">Relevant First</option>
                            <option value="name">Name (A-Z)</option>
                            <option value="jobs">Job Count</option>
                            </select>
                        </div>
                        
                        <button
                            onClick={() => setShowDownloadModal(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow hover:text-indigo-600"
                        >
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Export</span>
                        </button>
                    </div>
                    </div>

                    <div className="space-y-6">
                    {sortedCompanies.map((company, index) => (
                        <CompanyCard 
                            key={`${company.name}-${index}`} 
                            company={company} 
                            index={index}
                        />
                    ))}
                    </div>
                    
                    <div className="mt-12 mb-12 text-center">
                        <button
                            onClick={handleLoadMore}
                            disabled={activeLoading}
                            className={`
                                inline-flex items-center justify-center gap-3 text-white font-semibold py-4 px-10 rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed group
                                ${source === 'LinkedIn' 
                                    ? 'bg-[#0077B5] hover:bg-[#006097] shadow-blue-200/50 hover:shadow-blue-500/30' 
                                    : 'bg-slate-900 hover:bg-indigo-600 shadow-indigo-200/50 hover:shadow-indigo-500/30'
                                }
                            `}
                        >
                            {activeLoading ? (
                                <>
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    <span>Scouting Ecosystem...</span>
                                </>
                            ) : (
                                <>
                                    <Plus className="w-5 h-5" />
                                    <span>Scout 10 More</span>
                                </>
                            )}
                        </button>
                    </div>

                </div>
                )}
            </div>
          )}

        </main>
      </div>
      
      <DownloadModal 
        isOpen={showDownloadModal} 
        onClose={() => setShowDownloadModal(false)} 
        companies={sortedCompanies} 
      />
    </div>
  );
};