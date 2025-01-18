const App = () => {
    const [currentTemplate, setCurrentTemplate] = React.useState(null);
    const [currentFilter, setCurrentFilter] = React.useState(null);

    return React.createElement(FilterConfigurator, {
        currentTemplate,
        onTemplateChange: setCurrentTemplate,
        currentFilter,
        setCurrentFilter,
        onImportFilter: async (file) => {
            try {
                const content = await file.text();
                setCurrentFilter(content);
            } catch (error) {
                console.error('Error importing filter:', error);
            }
        },
        onExportFilter: () => {
            const blob = new Blob([currentFilter], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'poe2-filter.ipd';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
    });
};

window.App = App;