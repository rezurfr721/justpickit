export const RuleSuggestions = ({ item, onApplyRule }) => {
  // Safely extract numeric value from modifier string
  const extractNumericValue = (modifier) => {
    try {
      const matches = modifier.match(/\d+/);
      return matches ? parseInt(matches[0], 10) : null;
    } catch (error) {
      console.error('Error parsing modifier value:', error);
      return null;
    }
  };

  // Safely check if modifier includes a keyword
  const modifierIncludes = (modifier, keyword) => {
    try {
      return modifier.toLowerCase().includes(keyword.toLowerCase());
    } catch (error) {
      console.error('Error checking modifier:', error);
      return false;
    }
  };

  // Génère des suggestions de règles de manière sécurisée
  const generateSuggestions = (item) => {
    const suggestions = [];

    if (!item) {
      return suggestions;
    }

    try {
      // Suggestions basées sur la rareté
      if (item.rarity && (item.rarity === "Rare" || item.rarity === "Unique") && item.type) {
        suggestions.push({
          rule: `[Rarity] == "${item.rarity}" && [Type] == "${item.type}" # [StashItem] == "true"`,
          explanation: `Ramasser tous les items ${item.rarity.toLowerCase()} de type ${item.type}`,
          type: "basic"
        });
      }

      // Suggestions basées sur les résistances
      if (Array.isArray(item.modifiers)) {
        const resistanceModifiers = item.modifiers.filter(mod => 
          mod && modifierIncludes(mod, "resistance")
        );
        
        if (resistanceModifiers.length > 1) {
          const suggestedResistanceValue = Math.floor(resistanceModifiers.length * 30);
          suggestions.push({
            rule: `[Category] == "${item.category || 'Any'}" # [TotalResistances] > "${suggestedResistanceValue}" && [StashItem] == "true"`,
            explanation: `Ramasser les items avec plus de ${suggestedResistanceValue}% de résistances totales`,
            type: "defense"
          });
        }

        // Suggestions basées sur la vie
        const lifeModifier = item.modifiers.find(mod => 
          mod && modifierIncludes(mod, "life")
        );

        if (lifeModifier) {
          const lifeValue = extractNumericValue(lifeModifier);
          if (lifeValue) {
            const suggestedLifeValue = Math.floor(lifeValue * 0.8);
            suggestions.push({
              rule: `[Category] == "${item.category || 'Any'}" # [Life] > "${suggestedLifeValue}" && [StashItem] == "true"`,
              explanation: `Ramasser les items avec plus de ${suggestedLifeValue} points de vie`,
              type: "defense"
            });
          }
        }
      }

      // Suggestions spécifiques aux armes
      if (item.properties) {
        const dps = item.properties["Physical DPS"] || item.properties["Elemental DPS"];
        if (dps) {
          const suggestedDpsValue = Math.floor(dps * 0.8);
          suggestions.push({
            rule: `[Category] == "Weapon" # [DPS] > "${suggestedDpsValue}" && [StashItem] == "true"`,
            explanation: `Ramasser les armes avec plus de ${suggestedDpsValue} DPS`,
            type: "weapon"
          });
        }
      }

      // Suggestions basées sur le niveau d'item
      if (item.itemLevel) {
        suggestions.push({
          rule: `[Category] == "${item.category || 'Any'}" && [ItemLevel] >= "${item.itemLevel}" # [StashItem] == "true"`,
          explanation: `Ramasser les ${item.category || 'items'} de niveau ${item.itemLevel} ou plus`,
          type: "basic"
        });
      }

      return suggestions;
    } catch (error) {
      console.error('Error generating suggestions:', error);
      return suggestions;
    }
  };

  // Génère les suggestions de manière sécurisée
  const suggestions = React.useMemo(() => generateSuggestions(item), [item]);

  // Groupe les suggestions par type
  const groupedSuggestions = React.useMemo(() => ({
    basic: suggestions.filter(s => s.type === "basic"),
    defense: suggestions.filter(s => s.type === "defense"),
    weapon: suggestions.filter(s => s.type === "weapon")
  }), [suggestions]);

  const handleApplyRule = React.useCallback((rule) => {
    try {
      if (typeof onApplyRule === 'function') {
        onApplyRule(rule);
      }
    } catch (error) {
      console.error('Error applying rule:', error);
    }
  }, [onApplyRule]);

  const renderSuggestionGroup = (title, suggestions, icon) => {
    if (!Array.isArray(suggestions) || suggestions.length === 0) {
      return null;
    }

    return React.createElement('div', { className: 'mb-4' },
      React.createElement('h4', { 
        className: 'text-sm font-medium text-gray-400 mb-2 flex items-center gap-2' 
      },
        icon,
        title
      ),
      React.createElement('div', { className: 'space-y-2' },
        suggestions.map((suggestion, index) => 
          React.createElement('div', {
            key: index,
            className: 'bg-gray-800 rounded p-3 hover:bg-gray-750 transition-colors'
          },
            React.createElement('div', { className: 'flex justify-between items-start gap-2' },
              React.createElement('div', null,
                React.createElement('code', {
                  className: 'block text-sm bg-black/30 p-2 rounded font-mono text-amber-400'
                }, suggestion.rule),
                React.createElement('p', {
                  className: 'text-sm text-gray-400 mt-1'
                }, suggestion.explanation)
              ),
              React.createElement('button', {
                onClick: () => handleApplyRule(suggestion.rule),
                className: 'p-1.5 rounded hover:bg-amber-600/20 text-amber-500 flex-shrink-0',
                title: 'Appliquer cette règle',
                'aria-label': `Appliquer la règle: ${suggestion.explanation}`
              }, '➕')
            )
          )
        )
      )
    );
  };

  if (!item) {
    return React.createElement('div', { className: 'text-gray-500 text-sm italic' },
      'Sélectionnez un item pour voir les suggestions de règles.'
    );
  }

  if (suggestions.length === 0) {
    return React.createElement('div', { className: 'text-gray-500 text-sm italic' },
      'Aucune suggestion disponible pour cet item.'
    );
  }

  return React.createElement('div', { className: 'border-l border-gray-700 pl-4' },
    React.createElement('div', {
      className: 'text-sm text-amber-500 font-medium mb-3 flex items-center gap-2'
    },
      '💡',
      'Suggestions de règles'
    ),
    renderSuggestionGroup('Règles de Base', groupedSuggestions.basic, '🎯'),
    renderSuggestionGroup('Défense', groupedSuggestions.defense, '🛡️'),
    renderSuggestionGroup('Armes', groupedSuggestions.weapon, '⚔️')
  );
};