// Import components
import { FilterConfigurator } from './components/FilterConfigurator.js';
import { ItemPreview } from './components/ItemPreview.js';
import { RuleSuggestions } from './components/RuleSuggestions.js';

// Import templates
import { beginnerTemplate } from './templates/beginner.js';
import { levelingTemplate } from './templates/leveling.js';
import { mappingTemplate } from './templates/mapping.js';
import { endgameTemplate } from './templates/endgame.js';

const App = () => {
    const [currentTemplate, setCurrentTemplate] = React.useState(beginnerTemplate);
    const [currentFilter, setCurrentFilter] = React.useState(null);

    // Handle template change
    const handleTemplateChange = (template) => {
        setCurrentTemplate(template);
        setCurrentFilter(template);
    };

    // Handle filter import
    const handleImportFilter = async (file) => {
        try {
            const content = await file.text();
            setCurrentFilter(content);
        } catch (error) {
            console.error('Error importing filter:', error);
            // Add error handling UI here
        }
    };

    // Handle filter export
    const handleExportFilter = () => {
        const blob = new Blob([currentFilter], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'poe2-filter.ipd';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    return React.createElement('div', { className: 'min-h-screen' },
        React.createElement(FilterConfigurator, {
            currentTemplate,
            onTemplateChange: handleTemplateChange,
            onImportFilter: handleImportFilter,
            onExportFilter: handleExportFilter,
            currentFilter,
            setCurrentFilter
        })
    );
};

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
    React.createElement(App)
);