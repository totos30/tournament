// ========================================
// INTERNATIONALIZATION SYSTEM
// ========================================

// Available languages
const AVAILABLE_LANGUAGES = ['en', 'fr'];
const DEFAULT_LANGUAGE = 'en';

// Current language (loaded from localStorage or default)
let currentLanguage = DEFAULT_LANGUAGE;

// All translations
const translations = {
    en: {
        // Header
        'app.title': 'Tournament',
        'app.subtitle': 'Tournament Manager',
        
        // Language selector
        'lang.select': 'Language',
        'lang.en': 'English',
        'lang.fr': 'Français',
        
        // Setup Phase
        'setup.title': 'Tournament Setup',
        'setup.import': '📤 Import Tournament',
        'setup.playerCount': 'Number of players (even, max 40)',
        'setup.selectPlayers': 'Select...',
        'setup.players': 'players',
        'setup.playerNames': 'Player names',
        'setup.playerNumber': 'Player',
        'setup.playerName': 'Player name',
        'setup.photoOptional': 'Photo (optional)',
        'setup.continue': 'Continue',
		'setup.6players': '6 players',
		'setup.8players': '8 players',
		'setup.10players': '10 players',
		'setup.12players': '12 players',
		'setup.14players': '14 players',
		'setup.16players': '16 players',
		'setup.18players': '18 players',
		'setup.20players': '20 players',
        'setup.22players': '22 players',
		'setup.24players': '24 players',
		'setup.26players': '26 players',
		'setup.28players': '28 players',		
		'setup.30players': '30 players',
        'setup.32players': '32 players',
		'setup.34players': '34 players',
		'setup.36players': '36 players',
		'setup.38players': '38 players',	
		'setup.40players': '40 players',
        
        // Bye Selection Phase
        'bye.title': 'Bye Selection',
        'bye.info': 'Select {count} player(s) who will qualify directly to Round 2 (seeded players)',
        'bye.randomSelection': '🎲 Random Selection',
        'bye.clearSelection': '✕ Clear All',
        'bye.back': '← Back',
        'bye.startTournament': 'Start Tournament',
        'bye.limitReached': 'You can only select {count} player(s)',
        
        // Tournament Phase
        'tournament.inProgress': 'Tournament in Progress',
        'tournament.export': '📥 Export',
        'tournament.newTournament': 'New Tournament',
        'tournament.podium': 'Tournament Podium',
        'tournament.round': 'ROUND',
        'tournament.semiFinals': 'SEMI-FINALS',
        'tournament.thirdPlace': '3RD PLACE',
        'tournament.final': 'FINAL',
        'tournament.vs': 'VS',
        'tournament.waiting': 'Waiting...',
        'tournament.byeQualified': 'BYE - Qualified',
        'tournament.champion': 'CHAMPION',
        'tournament.secondPlace': '2ND PLACE',
        'tournament.thirdPlaceShort': '3RD PLACE',
        
        // Focus Mode
        'focus.currentMatch': '⚡ CURRENT MATCH ⚡',
        'focus.hint': 'Focus on current match',
        'focus.globalView': 'Global view',
		'focus.escape': 'Esc',
        
        // Branding/Settings
        'settings.customize': '⚙️ Customize',
        'settings.title': '⚙️ Customization',
        'settings.close': '✕',
        'settings.identity': '📝 Identity',
        'settings.mainTitle': 'Main title',
        'settings.subtitle': 'Subtitle',
        'settings.logo': 'Logo (optional)',
        'settings.logoUpload': 'Click to upload a logo',
        'settings.logoFormats': 'PNG, JPG, SVG (max 2MB)',
        'settings.logoChange': 'Change',
        'settings.logoRemove': 'Remove',
        'settings.colors': '🎨 Theme Colors',
        'settings.colorPrimary': 'Primary color',
        'settings.colorSecondary': 'Secondary color',
        'settings.colorAccent': 'Accent color',
        'settings.colorDark': 'Dark background',
        'settings.colorLight': 'Light text',
        'settings.presetThemes': '✨ Preset Themes',
        'settings.themeSport': '🏀 Sport',
        'settings.themeEsport': '🎮 E-Sport',
        'settings.themeCorporate': '🏢 Corporate',
        'settings.themeGaming': '🎲 Gaming',
        'settings.preview': '👁️ Preview',
        'settings.previewPlayer': 'Player',
        'settings.save': '💾 Save',
        'settings.reset': '🔄 Reset',
        'settings.cancel': 'Cancel',
        'settings.saved': '✅ Customization saved!',
        'settings.resetConfirm': 'Are you sure you want to reset the customization?',
        'settings.resetDone': '✅ Customization reset!',
        'settings.logoTooBig': 'File is too large. Maximum 2MB.',
        'settings.logoInvalidType': 'File must be an image (PNG, JPG, SVG).',
        
        // Alerts & Messages
        'alert.enterPlayerName': 'Please enter the name of player {number}',
        'alert.exportSuccess': '✅ Tournament exported!',
        'alert.importInvalid': 'Invalid tournament file',
        'alert.importError': 'Error importing file. Please check that the file is valid.',
        
        // Preset theme names
        'theme.sport.title': 'Tournament',
        'theme.sport.subtitle': 'Tournament Manager',
        'theme.esport.title': 'E-Sport Arena',
        'theme.esport.subtitle': 'Championship Bracket',
        'theme.corporate.title': 'Corporate Challenge',
        'theme.corporate.subtitle': 'Team Competition',
        'theme.gaming.title': 'Gaming Tournament',
        'theme.gaming.subtitle': 'Battle for Glory'
    },
    
    fr: {
        // Header
        'app.title': 'Tournament',
        'app.subtitle': 'Gestionnaire de Tournoi',
        
        // Language selector
        'lang.select': 'Langue',
        'lang.en': 'English',
        'lang.fr': 'Français',
        
        // Setup Phase
        'setup.title': 'Configuration du Tournoi',
        'setup.import': '📤 Importer un tournoi',
        'setup.playerCount': 'Nombre de joueurs (pair, max 40)',
        'setup.selectPlayers': 'Sélectionner...',
        'setup.players': 'joueurs',
        'setup.playerNames': 'Noms des joueurs',
        'setup.playerNumber': 'Joueur',
        'setup.playerName': 'Nom du joueur',
        'setup.photoOptional': 'Photo (optionnel)',
        'setup.continue': 'Continuer',
		'setup.6players': '6 joueurs',
		'setup.8players': '8 joueurs',
		'setup.10players': '10 joueurs',
		'setup.12players': '12 joueurs',
		'setup.14players': '14 joueurs',
		'setup.16players': '16 joueurs',
		'setup.18players': '18 joueurs',
		'setup.20players': '20 joueurs',
        'setup.22players': '22 joueurs',
		'setup.24players': '24 joueurs',
		'setup.26players': '26 joueurs',
		'setup.28players': '28 joueurs',		
		'setup.30players': '30 joueurs',
        'setup.32players': '32 joueurs',
		'setup.34players': '34 joueurs',
		'setup.36players': '36 joueurs',
		'setup.38players': '38 joueurs',	
		'setup.40players': '40 joueurs',
        
        // Bye Selection Phase
        'bye.title': 'Sélection des Byes',
        'bye.info': 'Sélectionnez {count} joueur(s) qui seront qualifiés d\'office au Round 2 (têtes de série)',
        'bye.randomSelection': '🎲 Sélection Aléatoire',
        'bye.clearSelection': '✕ Tout désélectionner',
        'bye.back': '← Retour',
        'bye.startTournament': 'Lancer le Tournoi',
        'bye.limitReached': 'Vous ne pouvez sélectionner que {count} joueur(s)',
        
        // Tournament Phase
        'tournament.inProgress': 'Tournoi en cours',
        'tournament.export': '📥 Exporter',
        'tournament.newTournament': 'Nouveau Tournoi',
        'tournament.podium': 'Podium du Tournoi',
        'tournament.round': 'ROUND',
        'tournament.semiFinals': 'DEMI-FINALES',
        'tournament.thirdPlace': '3ÈME PLACE',
        'tournament.final': 'FINALE',
        'tournament.vs': 'VS',
        'tournament.waiting': 'En attente...',
        'tournament.byeQualified': 'BYE - Qualifié d\'office',
        'tournament.champion': 'CHAMPION',
        'tournament.secondPlace': '2ÈME PLACE',
        'tournament.thirdPlaceShort': '3ÈME PLACE',
        
        // Focus Mode
        'focus.currentMatch': '⚡ MATCH EN COURS ⚡',
        'focus.hint': 'Focus sur le match en cours',
        'focus.globalView': 'Vue globale',
		'focus.escape': 'Echap',
        
        // Branding/Settings
        'settings.customize': '⚙️ Personnaliser',
        'settings.title': '⚙️ Personnalisation',
        'settings.close': '✕',
        'settings.identity': '📝 Identité',
        'settings.mainTitle': 'Titre principal',
        'settings.subtitle': 'Sous-titre',
        'settings.logo': 'Logo (optionnel)',
        'settings.logoUpload': 'Cliquez pour uploader un logo',
        'settings.logoFormats': 'PNG, JPG, SVG (max 2MB)',
        'settings.logoChange': 'Changer',
        'settings.logoRemove': 'Supprimer',
        'settings.colors': '🎨 Couleurs du thème',
        'settings.colorPrimary': 'Couleur principale',
        'settings.colorSecondary': 'Couleur secondaire',
        'settings.colorAccent': 'Couleur accent',
        'settings.colorDark': 'Fond sombre',
        'settings.colorLight': 'Texte clair',
        'settings.presetThemes': '✨ Thèmes prédéfinis',
        'settings.themeSport': '🏀 Sport',
        'settings.themeEsport': '🎮 E-Sport',
        'settings.themeCorporate': '🏢 Corporate',
        'settings.themeGaming': '🎲 Gaming',
        'settings.preview': '👁️ Aperçu',
        'settings.previewPlayer': 'Joueur',
        'settings.save': '💾 Enregistrer',
        'settings.reset': '🔄 Réinitialiser',
        'settings.cancel': 'Annuler',
        'settings.saved': '✅ Personnalisation enregistrée !',
        'settings.resetConfirm': 'Êtes-vous sûr de vouloir réinitialiser la personnalisation ?',
        'settings.resetDone': '✅ Personnalisation réinitialisée !',
        'settings.logoTooBig': 'Le fichier est trop volumineux. Maximum 2MB.',
        'settings.logoInvalidType': 'Le fichier doit être une image (PNG, JPG, SVG).',
        
        // Alerts & Messages
        'alert.enterPlayerName': 'Veuillez entrer le nom du joueur {number}',
        'alert.exportSuccess': '✅ Tournoi exporté !',
        'alert.importInvalid': 'Fichier de tournoi invalide',
        'alert.importError': 'Erreur lors de l\'importation du fichier. Vérifiez que le fichier est valide.',
        
        // Preset theme names
        'theme.sport.title': 'Tournament',
        'theme.sport.subtitle': 'Gestionnaire de Tournoi',
        'theme.esport.title': 'E-Sport Arena',
        'theme.esport.subtitle': 'Championship Bracket',
        'theme.corporate.title': 'Corporate Challenge',
        'theme.corporate.subtitle': 'Compétition d\'équipe',
        'theme.gaming.title': 'Gaming Tournament',
        'theme.gaming.subtitle': 'Battle for Glory'
    }
};

// Load saved language from localStorage
function loadLanguage() {
    const saved = localStorage.getItem('tournamentLanguage');
    if (saved && AVAILABLE_LANGUAGES.includes(saved)) {
        currentLanguage = saved;
    } else {
        // Try to detect browser language
        const browserLang = navigator.language.split('-')[0];
        if (AVAILABLE_LANGUAGES.includes(browserLang)) {
            currentLanguage = browserLang;
        }
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
}

// Get translation for a key
function t(key, replacements = {}) {
    let translation = translations[currentLanguage][key] || translations[DEFAULT_LANGUAGE][key] || key;
    
    // Replace placeholders like {count}, {number}, etc.
    Object.keys(replacements).forEach(placeholder => {
        translation = translation.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), replacements[placeholder]);
    });
    
    return translation;
}

// Change language
function changeLanguage(lang) {
    if (!AVAILABLE_LANGUAGES.includes(lang)) {
        console.error('Language not supported:', lang);
        return;
    }
    
    currentLanguage = lang;
    localStorage.setItem('tournamentLanguage', lang);
    document.documentElement.lang = lang;
    
    // Update all elements with data-i18n attribute
    updatePageTranslations();
    
    // Update language selector
    const selector = document.getElementById('languageSelector');
    if (selector) {
        selector.value = lang;
    }
	
	// Regenerate player inputs if visible
    const playerCount = document.getElementById('playerCount')?.value;
    const inputContainer = document.getElementById('playersInputContainer');
    if (playerCount && inputContainer && inputContainer.style.display !== 'none') {
        showPlayerInputs(parseInt(playerCount));
    }
    
    // Update player count options
    if (typeof updatePlayerCountOptions === 'function') {
        updatePlayerCountOptions();
    }
}

// Update all translations on the page
function updatePageTranslations() {
    // Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const replacements = {};
        
        // Check for placeholder attributes (data-i18n-count, data-i18n-number, etc.)
        Array.from(element.attributes).forEach(attr => {
            if (attr.name.startsWith('data-i18n-')) {
                const placeholder = attr.name.replace('data-i18n-', '');
                replacements[placeholder] = attr.value;
            }
        });
        
        element.textContent = t(key, replacements);
    });
    
    // Update elements with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });
    
    // Update elements with data-i18n-html attribute (for HTML content)
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
        const key = element.getAttribute('data-i18n-html');
        element.innerHTML = t(key);
    });
    
    // Update dynamic content that's not in DOM attributes
    updateDynamicTranslations();
}

// Update dynamic content (called by app logic)
function updateDynamicTranslations() {
    // Update bye info text if visible
    const byeInfo = document.getElementById('byeSelectionInfo');
    if (byeInfo && window.numByesNeeded) {
        byeInfo.textContent = t('bye.info', { count: window.numByesNeeded });
    }
    
    // Update focus indicator
    const focusIndicator = document.getElementById('focusIndicator');
    if (focusIndicator) {
        focusIndicator.textContent = t('focus.currentMatch');
    }
    
    // Update keyboard hint
    const keyboardHint = document.querySelector('.keyboard-hint .hint-content');
    if (keyboardHint) {
        keyboardHint.innerHTML = `
            <kbd>Z</kbd> ${t('focus.hint')}
            <span style="margin: 0 1rem;">•</span>
			<kbd>${t('focus.escape')}</kbd> ${t('focus.globalView')}
			
        `;
    }
}

// Initialize i18n system
function initI18n() {
    loadLanguage();
    
    // Create language selector if it doesn't exist
    const settingsButton = document.querySelector('.settings-button');
    if (settingsButton && !document.getElementById('languageSelector')) {
        const langSelector = document.createElement('select');
        langSelector.id = 'languageSelector';
        langSelector.className = 'language-selector';
        langSelector.innerHTML = `
            <option value="en">EN</option>
            <option value="fr">FR</option>
        `;
        langSelector.value = currentLanguage;
        langSelector.onchange = (e) => changeLanguage(e.target.value);
        
        // Insert before settings button
        settingsButton.parentNode.insertBefore(langSelector, settingsButton);
    }
    
    // Update all translations
    updatePageTranslations();
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
} else {
    initI18n();
}

// Export functions for use in other scripts
window.t = t;
window.changeLanguage = changeLanguage;
window.updatePageTranslations = updatePageTranslations;
window.currentLanguage = () => currentLanguage;
