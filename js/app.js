import { FilterConfigurator } from './components/FilterConfigurator.js';
import { ItemPreview } from './components/ItemPreview.js';
import { RuleSuggestions } from './components/RuleSuggestions.js';

const App = () => {
    const [currentTemplate, setCurrentTemplate] = React.useState(null);
    const [currentFilter, setCurrentFilter] = React.useState(null);
    const [error, setError] = React.useState(null);

    // Reset error after 5 seconds when it occurs
    React.useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleImportFilter = async (file) => {
        try {
            const content = await file.text();
            setCurrentFilter(content);
            setError(null);
        } catch (error) {
            setError(`Error importing filter: ${error.message}`);
            console.error('Error importing filter:', error);
        }
    };

    const handleExportFilter = () => {
        try {
            if (!currentFilter) {
                throw new Error('No filter content to export');
            }
            const blob = new Blob([currentFilter], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'poe2-filter.ipd';
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            setError(`Error exporting filter: ${error.message}`);
            console.error('Error exporting filter:', error);
        }
    };

    return React.createElement(React.Fragment, null,
        // Error notification
        error && React.createElement('div', {
            className: 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg',
            role: 'alert'
        }, error),
        
        // Main component
        React.createElement(FilterConfigurator, {
            currentTemplate,
            onTemplateChange: setCurrentTemplate,
            currentFilter,
            setCurrentFilter,
            onImportFilter: handleImportFilter,
            onExportFilter: handleExportFilter
        })
    );
};

window.App = App;
