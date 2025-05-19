// Language selector component
const languageSelector = {
    languages: [
        { code: 'pt', name: 'Português', flag: '🇧🇷' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Español', flag: '🇪🇸' }
    ],
    
    init() {
        this.createSelector();
        this.attachEvents();
        this.updateSelector();
    },
    
    createSelector() {
        // Create language selector HTML
        const selectorHTML = `
            <div class="language-selector" id="languageSelector">
                <button class="language-selector-button" id="languageSelectorButton">
                    <span class="language-flag" id="currentFlag">🇧🇷</span>
                    <span class="language-code" id="currentLang">PT</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="language-dropdown" id="languageDropdown">
                    ${this.languages.map(lang => `
                        <button class="language-option" data-lang="${lang.code}">
                            <span class="language-flag">${lang.flag}</span>
                            <span class="language-name">${lang.name}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Insert selector into page
        const header = document.querySelector('.nav-header, .chat-header, header');
        if (header) {
            const container = header.querySelector('.nav-container') || header;
            container.insertAdjacentHTML('beforeend', selectorHTML);
        } else {
            // Fallback: insert at the beginning of the body
            document.body.insertAdjacentHTML('afterbegin', selectorHTML);
        }
        
        // Add styles
        this.addStyles();
    },
    
    attachEvents() {
        const button = document.getElementById('languageSelectorButton');
        const dropdown = document.getElementById('languageDropdown');
        
        // Toggle dropdown
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });
        
        // Language selection
        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const lang = option.getAttribute('data-lang');
                setLanguage(lang);
                this.updateSelector();
                dropdown.classList.remove('show');
            });
        });
        
        // Close dropdown on outside click
        document.addEventListener('click', () => {
            dropdown.classList.remove('show');
        });
    },
    
    updateSelector() {
        const currentLang = localStorage.getItem('language') || 'pt';
        const language = this.languages.find(lang => lang.code === currentLang);
        
        if (language) {
            document.getElementById('currentFlag').textContent = language.flag;
            document.getElementById('currentLang').textContent = language.code.toUpperCase();
        }
    },
    
    addStyles() {
        const styles = `
            <style>
                .language-selector {
                    position: relative;
                    z-index: 1000;
                    margin-left: 20px;
                }
                
                .language-selector-button {
                    background: var(--glass-bg, rgba(255, 255, 255, 0.05));
                    backdrop-filter: blur(10px);
                    border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.1));
                    border-radius: 30px;
                    padding: 8px 16px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    color: var(--text-primary, #ffffff);
                    transition: all 0.3s ease;
                }
                
                .language-selector-button:hover {
                    background: rgba(15, 157, 88, 0.1);
                    border-color: var(--accent-green, #0f9d58);
                }
                
                .language-flag {
                    font-size: 1.2rem;
                }
                
                .language-code {
                    font-weight: 600;
                    font-size: 0.9rem;
                }
                
                .language-selector-button i {
                    font-size: 0.8rem;
                    transition: transform 0.3s ease;
                }
                
                .language-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    margin-top: 10px;
                    background: var(--darker-bg, #060818);
                    backdrop-filter: blur(20px);
                    border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.1));
                    border-radius: 15px;
                    padding: 8px;
                    display: none;
                    min-width: 150px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                }
                
                .language-dropdown.show {
                    display: block;
                    animation: dropdownFade 0.3s ease;
                }
                
                @keyframes dropdownFade {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .language-option {
                    background: transparent;
                    border: none;
                    padding: 10px 12px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    width: 100%;
                    cursor: pointer;
                    color: var(--text-primary, #ffffff);
                    transition: all 0.3s ease;
                    border-radius: 8px;
                }
                
                .language-option:hover {
                    background: rgba(15, 157, 88, 0.1);
                    transform: translateX(5px);
                }
                
                .language-name {
                    font-size: 0.9rem;
                }
                
                /* Fixed position for pages without nav-header */
                body > .language-selector {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                }
                
                /* Mobile adjustments */
                @media (max-width: 768px) {
                    .language-selector {
                        margin-left: 10px;
                    }
                    
                    .language-selector-button {
                        padding: 6px 12px;
                    }
                    
                    .language-dropdown {
                        right: -20px;
                    }
                }
                
                /* Style adjustments for chat page */
                .chat-header .language-selector {
                    order: -1;
                    margin-left: auto;
                    margin-right: 20px;
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
};

// Initialize language selector when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    languageSelector.init();
});