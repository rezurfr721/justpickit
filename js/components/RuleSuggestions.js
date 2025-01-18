export const RuleSuggestions = ({ item, onApplyRule }) => {
  // Analyse l'item et génère des suggestions de règles
  const generateSuggestions = (item) => {
    const suggestions = [];

    if (!item) {
      return suggestions;
    }

    // Suggestions basées sur la rareté
    if (item.rarity === "Rare" || item.rarity === "Unique") {
      suggestions.push({
        rule: `[Rarity] == "${item.rarity}" && [Type] == "${item.type}" # [StashItem] == "true"`,
        explanation: `Ramasser tous les items ${item.rarity.toLowerCase()} de type ${item.type}`,
        type: "basic"
      });
    }

    // Suggestions basées sur les résistances
    const resistanceModifiers = item.modifiers?.filter(mod => 
      mod.toLowerCase().includes("resistance")
    );
    if (resistanceModifiers?.length > 1) {
      suggestions.push({
        rule: `[Category] == "${item.category}" # [TotalResistances] > "${Math.floor(resistanceModifiers.length * 30)}" && [StashItem] == "true"`,
        explanation: "Ramasser les items avec de bonnes résistances totales",
        type: "defense"
      });
    }

    // Suggestions basées sur la vie
    const lifeModifier = item.modifiers?.find(mod => 
      mod.toLowerCase().includes("life")
    );
    if (lifeModifier) {
      const lifeValue = parseInt(lifeModifier.match(/\d+/)[0]);
      suggestions.push({
        rule: `[Category] == "${item.category}" # [Life] > "${Math.floor(lifeValue * 0.8)}" && [StashItem] == "true"`,
        explanation: "Ramasser les items avec un bon bonus de vie",
        type: "defense"
      });
    }

    // Suggestions spécifiques aux armes
    if (item.properties && ("Physical DPS" in item.properties || "Elemental DPS" in item.properties)) {
      const dps = item.properties["Physical DPS"] || item.properties["Elemental DPS"];
      suggestions.push({
        rule: `[Category] == "Weapon" # [DPS] > "${Math.floor(dps * 0.8)}" && [StashItem] == "true"`,
        explanation: "Ramasser les armes avec un bon DPS",
        type: "weapon"
      });
    }

    // Suggestions basées sur le niveau d'item
    if (item.itemLevel) {
      suggestions.push({
        rule: `[Category] == "${item.category}" && [ItemLevel] >= "${item.itemLevel}" # [StashItem] == "true"`,
        explanation: `Ramasser les ${item.category} de haut niveau`,
        type: "basic"
      });
    }

    return suggestions;
  };

  // Groupe les suggestions par type
  const groupedSuggestions = {
    basic: suggestions.filter(s => s.type === "basic"),
    defense: suggestions.filter(s => s.type === "defense"),
    weapon: suggestions.filter(s => s.type === "weapon")
  };

  const renderSuggestionGroup = (title, suggestions, icon) => {
    if (suggestions.length === 0) return null;

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
                onClick: () => onApplyRule(suggestion.rule),
                className: 'p-1.5 rounded hover:bg-amber-600/20 text-amber-500 flex-shrink-0',
                title: 'Appliquer cette règle'
              }, '➕')
            )
          )
        )
      )
    );
  };

  const suggestions = generateSuggestions(item);

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