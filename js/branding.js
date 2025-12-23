// ========================================
// BRANDING & CUSTOMIZATION MANAGER
// ========================================

// Default branding configuration
const DEFAULT_BRANDING = {
    title: t('theme.sport.title'),//"Tournament",
    subtitle: t('theme.sport.subtitle'),//"Gestionnaire de Tournoi",
    logo: null,
    colors: {
        primary: "#FF2E63",
        secondary: "#08D9D6",
        accent: "#FFD23F",
        dark: "#252A34",
        light: "#EAEAEA"
    }
};

// Preset themes
const PRESET_THEMES = {
    sport: {
        title: t('theme.sport.title'),//"Tournament",
        subtitle: t('theme.sport.subtitle'),//"Gestionnaire de Tournoi",
        colors: {
            primary: "#FF2E63",
            secondary: "#08D9D6",
            accent: "#FFD23F",
            dark: "#252A34",
            light: "#EAEAEA"
        }
    },
    esport: {
        title:t('theme.esport.title'), //"E-Sport Arena",
        subtitle: t('theme.esport.subtitle'),//"Championship Bracket",
        colors: {
            primary: "#7B2CBF",
            secondary: "#00F5FF",
            accent: "#FF006E",
            dark: "#1A1423",
            light: "#F0F0F0"
        }
    },
    corporate: {
        title: t('theme.corporate.title'),//"Corporate Challenge",
        subtitle: t('theme.corporate.subtitle'),//"Team Competition",
        colors: {
            primary: "#2C3E50",
            secondary: "#3498DB",
            accent: "#F39C12",
            dark: "#1C2833",
            light: "#ECF0F1"
        }
    },
    gaming: {
        title: t('theme.gaming.title'),//"Gaming Tournament",
        subtitle: t('theme.gaming.subtitle'),//"Battle for Glory",
        colors: {
            primary: "#FF6B35",
            secondary: "#F7931E",
            accent: "#FDD835",
            dark: "#1E1E1E",
            light: "#FFFFFF"
        }
    }
};

// Load branding from localStorage on page load
function loadBranding() {
    const saved = localStorage.getItem('tournamentBranding');
    if (saved) {
        try {
            const branding = JSON.parse(saved);
            applyBranding(branding);
        } catch (e) {
            console.error('Error loading branding:', e);
            applyBranding(DEFAULT_BRANDING);
        }
    } else {
        applyBranding(DEFAULT_BRANDING);
    }
}

// Apply branding to the page
function applyBranding(branding) {
    // Update CSS variables
    const root = document.documentElement;
    root.style.setProperty('--primary', branding.colors.primary);
    root.style.setProperty('--secondary', branding.colors.secondary);
    root.style.setProperty('--accent', branding.colors.accent);
    root.style.setProperty('--dark', branding.colors.dark);
    root.style.setProperty('--light', branding.colors.light);
    
    // Update title and subtitle in header
    const h1 = document.querySelector('h1');
    const subtitle = document.querySelector('.subtitle');
    if (h1) h1.textContent = branding.title;
    if (subtitle) subtitle.textContent = branding.subtitle;
    
    // Update logo if exists
    const headerLogo = document.querySelector('.header-logo');
    if (branding.logo) {
        if (!headerLogo) {
            const logo = document.createElement('img');
            logo.className = 'header-logo';
            logo.src = branding.logo;
            logo.style.maxHeight = '80px';
            logo.style.marginBottom = '1rem';
            const header = document.querySelector('header');
            if (header) header.insertBefore(logo, header.firstChild);
        } else {
            headerLogo.src = branding.logo;
            headerLogo.style.display = 'block';
        }
    } else if (headerLogo) {
        headerLogo.style.display = 'none';
    }
    
    // Update form fields if settings panel is open
    updateSettingsForm(branding);
}

// Update settings form with current branding
function updateSettingsForm(branding) {
    // Title & Subtitle
    const titleInput = document.getElementById('brandTitle');
    const subtitleInput = document.getElementById('brandSubtitle');
    if (titleInput) titleInput.value = branding.title;
    if (subtitleInput) subtitleInput.value = branding.subtitle;
    
    // Colors
    updateColorInputs('Primary', branding.colors.primary);
    updateColorInputs('Secondary', branding.colors.secondary);
    updateColorInputs('Accent', branding.colors.accent);
    updateColorInputs('Dark', branding.colors.dark);
    updateColorInputs('Light', branding.colors.light);
    
    // Logo
    const logoPreview = document.getElementById('logoPreview');
    const logoUploadArea = document.getElementById('logoUploadArea');
    const logoUploadText = document.getElementById('logoUploadText');
    const logoActions = document.getElementById('logoActions');
    
    if (branding.logo && logoPreview) {
        logoPreview.src = branding.logo;
        logoPreview.classList.add('active');
        if (logoUploadArea) logoUploadArea.classList.add('has-logo');
        if (logoUploadText) logoUploadText.style.display = 'none';
        if (logoActions) logoActions.classList.add('active');
    } else if (logoPreview) {
        logoPreview.classList.remove('active');
        if (logoUploadArea) logoUploadArea.classList.remove('has-logo');
        if (logoUploadText) logoUploadText.style.display = 'block';
        if (logoActions) logoActions.classList.remove('active');
    }
    
    // Update preview
    updatePreview();
}

// Helper to update color inputs
function updateColorInputs(name, value) {
    const picker = document.getElementById('color' + name);
    const text = document.getElementById('color' + name + 'Text');
    if (picker) picker.value = value;
    if (text) text.value = value.toUpperCase();
}

// Open settings panel
function openSettings() {
    const overlay = document.getElementById('settingsOverlay');
    if (overlay) {
        overlay.classList.add('active');
        // Load current branding into form
        const saved = localStorage.getItem('tournamentBranding');
        const branding = saved ? JSON.parse(saved) : DEFAULT_BRANDING;
        updateSettingsForm(branding);
    }
}

// Close settings panel
function closeSettings() {
    const overlay = document.getElementById('settingsOverlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Update color text when picker changes
function updateColorText(pickerId, textId) {
    const picker = document.getElementById(pickerId);
    const text = document.getElementById(textId);
    if (picker && text) {
        text.value = picker.value.toUpperCase();
        updatePreview();
    }
}

// Update color picker when text changes
function updateColorPicker(textId, pickerId) {
    const text = document.getElementById(textId);
    const picker = document.getElementById(pickerId);
    if (text && picker) {
        let value = text.value.trim();
        if (!value.startsWith('#')) value = '#' + value;
        if (/^#[0-9A-F]{6}$/i.test(value)) {
            picker.value = value;
            text.value = value.toUpperCase();
            updatePreview();
        } else {
            // Invalid color, revert to picker value
            text.value = picker.value.toUpperCase();
        }
    }
}

// Handle logo upload
function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
        alert('Le fichier est trop volumineux. Maximum 2MB.');
        return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Le fichier doit être une image (PNG, JPG, SVG).');
        return;
    }
    
    // Read file as base64
    const reader = new FileReader();
    reader.onload = function(e) {
        const logoPreview = document.getElementById('logoPreview');
        const logoUploadArea = document.getElementById('logoUploadArea');
        const logoUploadText = document.getElementById('logoUploadText');
        const logoActions = document.getElementById('logoActions');
        
        if (logoPreview) {
            logoPreview.src = e.target.result;
            logoPreview.classList.add('active');
        }
        if (logoUploadArea) logoUploadArea.classList.add('has-logo');
        if (logoUploadText) logoUploadText.style.display = 'none';
        if (logoActions) logoActions.classList.add('active');
        
        updatePreview();
    };
    reader.readAsDataURL(file);
}

// Remove logo
function removeLogo() {
    const logoPreview = document.getElementById('logoPreview');
    const logoUploadArea = document.getElementById('logoUploadArea');
    const logoUploadText = document.getElementById('logoUploadText');
    const logoActions = document.getElementById('logoActions');
    const logoInput = document.getElementById('logoInput');
    
    if (logoPreview) {
        logoPreview.src = '';
        logoPreview.classList.remove('active');
    }
    if (logoUploadArea) logoUploadArea.classList.remove('has-logo');
    if (logoUploadText) logoUploadText.style.display = 'block';
    if (logoActions) logoActions.classList.remove('active');
    if (logoInput) logoInput.value = '';
    
    updatePreview();
}

// Update preview in settings panel
function updatePreview() {
    // Get current values
    const title = document.getElementById('brandTitle')?.value || DEFAULT_BRANDING.title;
    const subtitle = document.getElementById('brandSubtitle')?.value || DEFAULT_BRANDING.subtitle;
    const logo = document.getElementById('logoPreview')?.src || null;
    
    const primary = document.getElementById('colorPrimary')?.value || DEFAULT_BRANDING.colors.primary;
    const secondary = document.getElementById('colorSecondary')?.value || DEFAULT_BRANDING.colors.secondary;
    const accent = document.getElementById('colorAccent')?.value || DEFAULT_BRANDING.colors.accent;
    
    // Update preview elements
    const previewTitle = document.getElementById('previewTitle');
    const previewSubtitle = document.getElementById('previewSubtitle');
    const previewLogo = document.getElementById('previewLogo');
    
    if (previewTitle) {
        previewTitle.textContent = title;
        previewTitle.style.background = `linear-gradient(135deg, ${primary}, ${secondary})`;
    }
    if (previewSubtitle) {
        previewSubtitle.textContent = subtitle;
        previewSubtitle.style.color = accent;
    }
    if (previewLogo) {
        const logoPreview = document.getElementById('logoPreview');
        if (logoPreview && logoPreview.classList.contains('active')) {
            previewLogo.src = logo;
            previewLogo.classList.add('active');
        } else {
            previewLogo.classList.remove('active');
        }
    }
}

// Save branding to localStorage
function saveBranding() {
    const branding = {
        title: document.getElementById('brandTitle')?.value || DEFAULT_BRANDING.title,
        subtitle: document.getElementById('brandSubtitle')?.value || DEFAULT_BRANDING.subtitle,
        logo: null,
        colors: {
            primary: document.getElementById('colorPrimary')?.value || DEFAULT_BRANDING.colors.primary,
            secondary: document.getElementById('colorSecondary')?.value || DEFAULT_BRANDING.colors.secondary,
            accent: document.getElementById('colorAccent')?.value || DEFAULT_BRANDING.colors.accent,
            dark: document.getElementById('colorDark')?.value || DEFAULT_BRANDING.colors.dark,
            light: document.getElementById('colorLight')?.value || DEFAULT_BRANDING.colors.light
        }
    };
    
    // Save logo if present
    const logoPreview = document.getElementById('logoPreview');
    if (logoPreview && logoPreview.classList.contains('active')) {
        branding.logo = logoPreview.src;
    }
    
    // Save to localStorage
    localStorage.setItem('tournamentBranding', JSON.stringify(branding));
    
    // Apply immediately
    applyBranding(branding);
    
    // Close panel
    closeSettings();
    
    // Show confirmation
    alert('✅ Personnalisation enregistrée !');
}

// Reset branding to defaults
function resetBranding() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser la personnalisation ?')) {
        localStorage.removeItem('tournamentBranding');
        applyBranding(DEFAULT_BRANDING);
        updateSettingsForm(DEFAULT_BRANDING);
        removeLogo();
        alert('✅ Personnalisation réinitialisée !');
    }
}

// Apply preset theme
function applyPresetTheme(themeName) {
    const theme = PRESET_THEMES[themeName];
    if (!theme) return;
    
    // Update form fields
    document.getElementById('brandTitle').value = theme.title;
    document.getElementById('brandSubtitle').value = theme.subtitle;
    
    updateColorInputs('Primary', theme.colors.primary);
    updateColorInputs('Secondary', theme.colors.secondary);
    updateColorInputs('Accent', theme.colors.accent);
    updateColorInputs('Dark', theme.colors.dark);
    updateColorInputs('Light', theme.colors.light);
    
    // Update preview
    updatePreview();
    
    // Visual feedback
    const buttons = document.querySelectorAll('.preset-theme');
    buttons.forEach(btn => btn.style.transform = 'scale(1)');
    event.target.closest('.preset-theme').style.transform = 'scale(1.05)';
    setTimeout(() => {
        event.target.closest('.preset-theme').style.transform = 'scale(1)';
    }, 200);
}

// Initialize branding on page load
document.addEventListener('DOMContentLoaded', function() {
    loadBranding();
    
    // Add live preview to all inputs
    const inputs = ['brandTitle', 'brandSubtitle'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', updatePreview);
        }
    });
    
    // Close settings when clicking outside
    document.getElementById('settingsOverlay')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeSettings();
        }
    });
});
