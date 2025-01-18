export const ItemPreview = ({ onEditRule }) => {
  const [previewMode, setPreviewMode] = React.useState('examples');
  const [hoveredItem, setHoveredItem] = React.useState(null);
  const [highlightedRule, setHighlightedRule] = React.useState(null);
  
  const sampleItems = [
    {
      name: "Chaos Orb",
      type: "Currency",
      rarity: "Currency",
      description: "Reforges a rare item with new random properties",
      category: "Currency",
      imageUrl: "/api/placeholder/64/64",
      matchingRules: [
        {
          id: "rule1",
          rule: '[Type] == "Chaos Orb" # [StashItem] == "true"',
          explanation: "Picks up and stashes all Chaos Orbs",
          matchedProperties: ["type"]
        }
      ],
      style: {
        borderColor: "rgb(213, 159, 0)",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        textColor: "rgb(213, 159, 0)"
      }
    },
    // ... autres exemples d'items
  ];

  const renderMatchingRules = (rules) => (
    React.createElement('div', {
      className: 'absolute z-10 w-96 p-4 rounded bg-gray-900 border border-gray-600 shadow-xl'
    },
      React.createElement('h4', { className: 'text-amber-500 font-medium mb-2' }, 
        'Matching Filter Rules:'
      ),
      React.createElement('div', { className: 'space-y-3' },
        rules.map((rule, index) => 
          React.createElement('div', { 
            key: index, 
            className: 'text-sm',
            onMouseEnter: () => setHighlightedRule(rule.id),
            onMouseLeave: () => setHighlightedRule(null)
          },
            React.createElement('div', { className: 'flex items-start gap-2' },
              React.createElement('code', { 
                className: 'block flex-1 p-2 bg-black/50 rounded text-gray-300 font-mono'
              }, rule.rule),
              React.createElement('button', {
                onClick: () => onEditRule(rule),
                className: 'p-1 rounded hover:bg-gray-700 text-amber-500',
                title: 'Edit this rule'
              }, '✏️')
            ),
            React.createElement('p', { 
              className: 'mt-1 text-gray-400 italic'
            }, rule.explanation)
          )
        )
      )
    )
  );

  const renderValue = (value, property, item) => {
    const highlighted = isPropertyHighlighted(property, item);
    return React.createElement('span', {
      className: `${highlighted ? 'text-amber-400 font-medium' : ''} transition-colors duration-200`
    }, value);
  };

  const isPropertyHighlighted = (property, item) => {
    if (!highlightedRule) return false;
    const rule = item.matchingRules.find(r => r.id === highlightedRule);
    return rule?.matchedProperties.includes(property);
  };

  const renderItem = (item) => (
    React.createElement('div', {
      className: 'p-4 rounded relative group',
      style: {
        border: `1px solid ${item.style.borderColor}`,
        backgroundColor: item.style.backgroundColor,
        color: item.style.textColor
      },
      onMouseEnter: () => setHoveredItem(item),
      onMouseLeave: () => setHoveredItem(null)
    },
      React.createElement('div', { className: 'flex gap-4' },
        React.createElement('img', {
          src: item.imageUrl,
          alt: item.name,
          className: 'w-16 h-16 object-contain'
        }),
        React.createElement('div', null,
          React.createElement('div', { 
            className: 'font-medium group-hover:text-amber-400 transition-colors'
          },
            renderValue(item.name, "name", item),
            React.createElement('span', { 
              className: 'ml-2 text-xs text-gray-500'
            }, '(Hover to see matching rules)')
          ),
          React.createElement('div', { className: 'text-sm opacity-80' },
            renderValue(item.type, "type", item)
          ),
          item.description && React.createElement('div', { 
            className: 'mt-2 text-sm italic'
          }, renderValue(item.description, "description", item))
        )
      ),
      React.createElement('div', {
        className: 'absolute top-2 right-2 text-xs px-2 py-1 rounded-full bg-gray-800'
      }, renderValue(item.category, "category", item)),
      hoveredItem === item && React.createElement('div', {
        className: 'absolute left-full ml-4 top-0'
      }, renderMatchingRules(item.matchingRules))
    )
  );

  return React.createElement('div', { className: 'space-y-4' },
    React.createElement('div', { className: 'flex gap-4' },
      React.createElement('button', {
        className: `px-4 py-2 rounded ${previewMode === 'examples' ? 'bg-amber-600' : 'bg-gray-700'}`,
        onClick: () => setPreviewMode('examples')
      }, 'Example Items'),
      React.createElement('button', {
        className: `px-4 py-2 rounded ${previewMode === 'test' ? 'bg-amber-600' : 'bg-gray-700'}`,
        onClick: () => setPreviewMode('test')
      }, 'Test Filter')
    ),
    React.createElement('div', { className: 'space-y-2' },
      previewMode === 'examples'
        ? React.createElement(React.Fragment, null,
            React.createElement('h3', { 
              className: 'text-lg font-medium mb-3'
            }, 'Items matching current rules:'),
            sampleItems.map((item, index) => 
              React.createElement('div', { key: index }, renderItem(item))
            )
          )
        : React.createElement('div', {
            className: 'border-2 border-dashed border-gray-600 rounded-lg p-8 text-center'
          },
            React.createElement('input', {
              type: 'file',
              className: 'hidden',
              id: 'itemFileUpload',
              accept: '.json'
            }),
            React.createElement('label', {
              htmlFor: 'itemFileUpload',
              className: 'cursor-pointer text-gray-400 hover:text-gray-300'
            },
              React.createElement('div', { className: 'text-4xl mb-2' }, '📥'),
              React.createElement('div', null, 'Drop item data here or click to upload'),
              React.createElement('div', { className: 'text-sm mt-2' }, 
                'Supports .json item data files'
              )
            )
          )
    )
  );
};