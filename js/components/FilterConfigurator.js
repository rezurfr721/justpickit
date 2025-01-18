import { ItemPreview } from './ItemPreview.js';
import { RuleSuggestions } from './RuleSuggestions.js';
import { beginnerTemplate } from '../templates/beginner.js';

export const FilterConfigurator = ({ 
  currentTemplate, 
  onTemplateChange, 
  onImportFilter, 
  onExportFilter,
  currentFilter,
  setCurrentFilter 
}) => {
  const [activeTab, setActiveTab] = React.useState('templates');
  const [advancedMode, setAdvancedMode] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState('currency');
  
  const categories = [
    { id: 'currency', name: 'Currency', icon: '💰' },
    { id: 'weapons', name: 'Weapons', icon: '⚔️' },
    { id: 'armor', name: 'Armor', icon: '🛡️' },
    { id: 'jewels', name: 'Jewels', icon: '💎' },
    { id: 'gems', name: 'Gems', icon: '🔮' },
    { id: 'maps', name: 'Maps', icon: '🗺️' },
    { id: 'misc', name: 'Misc', icon: '📦' }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImportFilter(file);
    }
  };

  const handleRuleEdit = (rule) => {
    // À implémenter: logique d'édition des règles
    console.log('Editing rule:', rule);
  };

  return React.createElement('div', { className: 'min-h-screen bg-gray-900 text-gray-100' },
    // Header
    React.createElement('header', { className: 'bg-gray-800 border-b border-amber-600/20 p-4' },
      React.createElement('div', { className: 'container mx-auto flex justify-between items-center' },
        React.createElement('h1', { className: 'text-2xl font-bold text-amber-500' }, 'POE2 Loot Filter Editor'),
        React.createElement('div', { className: 'flex gap-4' },
          React.createElement('input', {
            type: 'file',
            accept: '.ipd',
            onChange: handleFileUpload,
            className: 'hidden',
            id: 'filterUpload'
          }),
          React.createElement('label', {
            htmlFor: 'filterUpload',
            className: 'px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded-md cursor-pointer'
          }, 'Import Filter'),
          React.createElement('button', {
            onClick: onExportFilter,
            className: 'px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md'
          }, 'Export Filter')
        )
      )
    ),

    // Main Content
    React.createElement('div', { className: 'container mx-auto p-4 grid grid-cols-12 gap-4' },
      // Left Sidebar
      React.createElement('div', { className: 'col-span-3 bg-gray-800 rounded-lg p-4' },
        React.createElement('div', { className: 'space-y-4' },
          // Templates Section
          React.createElement('div', null,
            React.createElement('h2', { className: 'text-xl font-semibold mb-3' }, 'Templates'),
            React.createElement('div', { className: 'space-y-2' },
              React.createElement('button', {
                className: 'w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded',
                onClick: () => {
                  setCurrentFilter(beginnerTemplate);
                  onTemplateChange('beginner');
                }
              }, '🌟 Beginner'),
              // Add other templates
            )
          ),
          // Categories Section
          React.createElement('div', null,
            React.createElement('h2', { className: 'text-xl font-semibold mb-3' }, 'Categories'),
            React.createElement('div', { className: 'space-y-2' },
              categories.map(cat => 
                React.createElement('button', {
                  key: cat.id,
                  className: `w-full text-left px-3 py-2 ${selectedCategory === cat.id ? 'bg-amber-600' : 'bg-gray-700'} hover:bg-gray-600 rounded flex items-center gap-2`,
                  onClick: () => setSelectedCategory(cat.id)
                }, cat.icon, cat.name)
              )
            )
          )
        )
      ),

      // Main Editor
      React.createElement('div', { className: 'col-span-6 bg-gray-800 rounded-lg p-4' },
        React.createElement('div', { className: 'mb-4 flex justify-between items-center' },
          React.createElement('div', { className: 'flex gap-4' },
            React.createElement('button', {
              className: `px-4 py-2 rounded ${!advancedMode ? 'bg-amber-600' : 'bg-gray-700'}`,
              onClick: () => setAdvancedMode(false)
            }, 'Basic Mode'),
            React.createElement('button', {
              className: `px-4 py-2 rounded ${advancedMode ? 'bg-amber-600' : 'bg-gray-700'}`,
              onClick: () => setAdvancedMode(true)
            }, 'Advanced Mode')
          )
        ),
        advancedMode ?
          React.createElement('textarea', {
            className: 'w-full h-[600px] bg-gray-900 text-gray-100 p-4 rounded font-mono',
            value: currentFilter,
            onChange: (e) => setCurrentFilter(e.target.value)
          })
          :
          React.createElement(ItemPreview, {
            onEditRule: handleRuleEdit
          })
      ),

      // Right Sidebar (Rule Suggestions)
      React.createElement('div', { className: 'col-span-3 bg-gray-800 rounded-lg p-4' },
        React.createElement(RuleSuggestions, {
          onApplyRule: (rule) => {
            // À implémenter: logique d'application des règles suggérées
            console.log('Applying rule:', rule);
          }
        })
      )
    )
  );
};