import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import ProgramCard from './ProgramCard';
import { getAllPrograms } from '@/data/programsData';

/**
 * ProgramFilterGrid - Component with search and filters for programs
 */
export default function ProgramFilterGrid() {
  const allPrograms = getAllPrograms();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [graduateChecked, setGraduateChecked] = useState(true);
  const [certificateChecked, setCertificateChecked] = useState(true);
  
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Debounced search query
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  // Update debounced search query after 300ms
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  // Check if program name or shortName matches search query
  const matchesSearch = (program, query) => {
    if (!query) return true;
    const lowerQuery = query.toLowerCase();
    const nameMatch = program.name.toLowerCase().includes(lowerQuery);
    const shortNameMatch = program.shortName.toLowerCase().includes(lowerQuery);
    return nameMatch || shortNameMatch;
  };

  // Highlight matching text in suggestions
  const highlightText = (text, query) => {
    if (!query.trim()) return text;
    
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);
    
    if (index === -1) return text;
    
    const beforeMatch = text.substring(0, index);
    const match = text.substring(index, index + query.length);
    const afterMatch = text.substring(index + query.length);
    
    return (
      <>
        {beforeMatch}
        <span className="bg-stevens-light-gray text-stevens-red font-stevens-semibold">{match}</span>
        {afterMatch}
      </>
    );
  };

  // Get suggestions for dropdown
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    return allPrograms
      .filter(program => matchesSearch(program, searchQuery))
      .slice(0, 5) // Limit to 5 suggestions
      .map(program => ({
        id: program.id,
        name: program.name,
        shortName: program.shortName
      }));
  }, [searchQuery, allPrograms]);

  // Filter programs based on all criteria
  const filteredPrograms = useMemo(() => {
    let filtered = allPrograms;

    // Degree type filter
    const degreeFilters = [];
    if (graduateChecked) {
      degreeFilters.push('M.S.', 'M.Eng.', 'MBA');
    }
    if (certificateChecked) {
      degreeFilters.push('Certificate');
    }
    
    if (degreeFilters.length > 0) {
      filtered = filtered.filter(program => 
        degreeFilters.includes(program.degree)
      );
    } else {
      // If neither is checked, show nothing
      filtered = [];
    }

    // Search filter
    if (debouncedSearchQuery) {
      filtered = filtered.filter(program => 
        matchesSearch(program, debouncedSearchQuery)
      );
    }

    // If a program is selected from suggestions, put it first
    if (selectedProgram) {
      const selected = filtered.find(p => p.id === selectedProgram);
      if (selected) {
        filtered = [
          selected,
          ...filtered.filter(p => p.id !== selectedProgram)
        ];
      }
    }

    return filtered;
  }, [
    allPrograms,
    graduateChecked,
    certificateChecked,
    debouncedSearchQuery,
    selectedProgram
  ]);

  // Handle input focus
  const handleInputFocus = () => {
    if (searchQuery.trim()) {
      setShowSuggestions(true);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.trim().length > 0);
    setSelectedProgram(null); // Clear selection when typing
  };

  // Handle suggestion click
  const handleSuggestionClick = (programId) => {
    const program = allPrograms.find(p => p.id === programId);
    if (program) {
      setSearchQuery(program.name);
      setSelectedProgram(programId);
      setShowSuggestions(false);
      searchInputRef.current?.blur();
    }
  };

  // Handle clear search
  const handleClearSearch = () => {
    // Clear debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    setSearchQuery('');
    setDebouncedSearchQuery(''); // Clear immediately to show default results
    setSelectedProgram(null);
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="relative mb-stevens-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stevens-gray w-5 h-5" />
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Search programs..."
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="pl-10 pr-10 h-12 text-stevens-base"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stevens-gray hover:text-stevens-dark-gray"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Suggestions Dropdown */}
        {/* 
          z-index: 10001 ensures suggestions appear above program cards and filters
          but below modals (z-[99999]). Matches navigation dropdown protection pattern.
        */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            data-search-suggestions="true"
            className="absolute z-[10001] w-full mt-2 bg-stevens-white border border-stevens-light-gray rounded-stevens-md shadow-stevens-2xl max-h-60 overflow-y-auto"
            style={{ zIndex: 10001 }} // Inline style as fallback protection
          >
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion.id)}
                className="w-full text-left px-4 py-3 hover:bg-stevens-light-gray transition-colors duration-stevens-fast border-b border-stevens-light-gray last:border-b-0"
              >
                <div className="font-stevens-semibold text-stevens-dark-gray">
                  {highlightText(suggestion.name, searchQuery)}
                </div>
                <div className="text-stevens-sm text-stevens-dark-gray mt-1">
                  {highlightText(suggestion.shortName, searchQuery)}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-stevens-md mb-stevens-lg items-start sm:items-center">
        <div className="flex flex-wrap gap-stevens-lg items-center">
          <div className="flex items-center gap-2">
            <Checkbox
              id="graduate"
              checked={graduateChecked}
              onCheckedChange={(checked) => setGraduateChecked(checked)}
            />
            <Label
              htmlFor="graduate"
              className="text-stevens-base font-stevens-medium text-stevens-dark-gray cursor-pointer"
            >
              Masters
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="certificate"
              checked={certificateChecked}
              onCheckedChange={(checked) => setCertificateChecked(checked)}
            />
            <Label
              htmlFor="certificate"
              className="text-stevens-base font-stevens-medium text-stevens-dark-gray cursor-pointer"
            >
              Certificates
            </Label>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-stevens-lg">
        <p className="text-stevens-base text-stevens-dark-gray">
          Showing {filteredPrograms.length} of {allPrograms.length} programs
        </p>
      </div>

      {/* Empty State */}
      {filteredPrograms.length === 0 && (
        <div className="text-center py-stevens-2xl">
          <p className="text-stevens-lg text-stevens-dark-gray">
            No programs found matching your criteria.
          </p>
          <p className="text-stevens-base text-stevens-gray mt-stevens-xs">
            Try adjusting your filters or search terms.
          </p>
        </div>
      )}

      {/* Program Grid */}
      {filteredPrograms.length > 0 && (
        <div className="grid stevens-md:grid-cols-2 stevens-lg:grid-cols-3 gap-stevens-lg">
          {filteredPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      )}
    </div>
  );
}

