// ========================================
// LANDING PAGE JAVASCRIPT
// ========================================

let currentLang = 'en';

// Load language from localStorage or detect browser language
function initLanguage() {
    const saved = localStorage.getItem('landingLanguage');
    if (saved && (saved === 'en' || saved === 'fr')) {
        currentLang = saved;
    } else {
        const browserLang = navigator.language.split('-')[0];
        currentLang = (browserLang === 'fr') ? 'fr' : 'en';
    }
    
    // Update selector
    const selector = document.getElementById('langSelector');
    if (selector) {
        selector.value = currentLang;
    }
    
    // Update page language
    updateLanguage();
}

// Change landing page language
function changeLandingLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('landingLanguage', lang);
    document.documentElement.lang = lang;
    updateLanguage();
    
    // Force reload of currently visible doc
    const activeTab = document.querySelector('.docs-tab.active');
    if (activeTab) {
        const tabName = activeTab.onclick.toString().match(/showDocTab\('(\w+)'\)/)?.[1];
        if (tabName) {
            // Clear the content to force reload
            const contentDiv = document.getElementById(`${tabName}-content`);
            if (contentDiv) {
                contentDiv.innerHTML = '<div class="loading">Loading...</div>';
            }
            // Reload the doc
            loadDoc(tabName);
        }
    }
    //loadDocs();
}

// Update all text based on current language
function updateLanguage() {
    document.querySelectorAll('[data-lang-en]').forEach(el => {
        const text = el.getAttribute(`data-lang-${currentLang}`);
        if (text) {
            el.textContent = text;
        }
    });
}

// Tab switching
function showDocTab(tabName) {
    // Update tabs
    document.querySelectorAll('.docs-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update content
    document.querySelectorAll('.doc-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-content`).classList.add('active');
    
    // Load doc if not already loaded
    loadDoc(tabName);
}

// Load specific document
async function loadDoc(docName) {
    const contentDiv = document.getElementById(`${docName}-content`);
    
    // Check if already loaded (has more than loading message)
    if (contentDiv.querySelectorAll('*').length > 1) {
        return;
    }
    
    const fileName = getDocFileName(docName);
    
    try {
        const response = await fetch(`./docs/${fileName}`);
        if (!response.ok) throw new Error('Doc not found');
        
        const markdown = await response.text();
        contentDiv.innerHTML = parseMarkdown(markdown);
    } catch (error) {
        console.error('Error loading doc:', error);
        contentDiv.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: rgba(234, 234, 234, 0.5);">
                <p>📄 Documentation file not found.</p>
                <p style="margin-top: 1rem; font-size: 0.9rem;">
                    Expected file: <code>docs/${fileName}</code>
                </p>
            </div>
        `;
    }
}

// Get document filename based on type and language
function getDocFileName(docName) {
    const suffix = (currentLang === 'fr') ? '_FR.md' : '_EN.md';
    
    const fileMap = {
        'readme': 'README' + suffix,
        'guide': 'GUIDE' + suffix,
        'changelog': 'CHANGELOG' + suffix
    };
    
    return fileMap[docName] || 'README_EN.md';
}

// Simple markdown parser (basic support)
function parseMarkdown(markdown) {
    let html = markdown;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank">$1</a>');
    
    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre><code>$2</code></pre>');
    
    // Inline code
    html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');
    
    // Lists
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>');
    
    // Wrap consecutive <li> in <ul>
    html = html.replace(/(<li>.*<\/li>\n?)+/gim, '<ul>$&</ul>');
    
    // Paragraphs
    html = html.split('\n\n').map(para => {
        para = para.trim();
        if (!para) return '';
        if (para.startsWith('<h') || para.startsWith('<ul') || para.startsWith('<pre') || para.startsWith('<li')) {
            return para;
        }
        return `<p>${para}</p>`;
    }).join('\n');
    
    // Line breaks
    html = html.replace(/\n/g, '<br>');
    
    // Clean up extra <br> tags
    html = html.replace(/<br><br>/g, '<br>');
    html = html.replace(/<\/h[1-3]><br>/g, '</h3>');
    html = html.replace(/<\/ul><br>/g, '</ul>');
    html = html.replace(/<\/pre><br>/g, '</pre>');
    
    return html;
}

// Load all docs on page load
function loadDocs() {
    loadDoc('readme');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    loadDocs();
});

// Make functions global
window.changeLandingLanguage = changeLandingLanguage;
window.showDocTab = showDocTab;
