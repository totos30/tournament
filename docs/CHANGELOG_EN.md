# Changelog

All notable changes to Tournament will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).



## [1.0.0] - 2025-01-17

### 🎉 Initial Release - Tournament v1.0

Complete professional tournament manager, ready for production use.

### Tournament Management
- ✅ Support for 6-40 participants (even numbers)
- ✅ Single-elimination bracket system
- ✅ Automatic bye management for non-power-of-2 numbers
- ✅ Manual or random seeded player selection
- ✅ Third-place match (played before final)
- ✅ Complete podium with top 3 medalists
- ✅ Symmetric NCAA-style bracket layout
- ✅ Match progression validation (can't start tournament without selecting all byes)

### Interface & Design
- ✅ Modern and responsive design (desktop, tablet, mobile)
- ✅ Smooth animations and visual effects
- ✅ Professional color scheme (red/cyan/yellow)
- ✅ Rajdhani/Space Mono typography
- ✅ Optimized bracket display (3-column: left/center/right)
- ✅ Responsive breakpoints (1200px for vertical mobile display)

### Visual Customization
- ✅ Optional photo upload for each player
- ✅ Visual effects for losers (180° photo rotation)
- ✅ Podium photo display with effects
- ✅ Base64 storage for portability

### Advanced Features
- ✅ **Focus Mode**: Auto-focus on current match
- ✅ **Keyboard Shortcuts**: Z (focus) / Escape (global view)
- ✅ **Widget 👁️**: Persistent reminder with auto-minimize
- ✅ **Match Indicator**: "⚡ CURRENT MATCH ⚡" displayed 2 seconds
- ✅ **Auto Scroll**: To podium at tournament end

### Save & Export
- ✅ Complete JSON export (players, tournament state, photos, results)
- ✅ Automatic filename with date (tournament_YYYY-MM-DD.json)
- ✅ Full import with state reconstruction
- ✅ Resume tournaments in progress
- ✅ Archive completed tournaments

### Customization & Branding
- ✅ **Visual Interface**: No code needed
- ✅ **Identity**: Title, subtitle, logo upload
- ✅ **Theme Colors**: 5 visual color pickers (Primary, Secondary, Accent, Dark, Light)
- ✅ **Preset Themes**: Sport, E-Sport, Corporate, Gaming
- ✅ **Real-time Preview**: See changes instantly
- ✅ **LocalStorage**: Persistent customization

### Internationalization
- ✅ **Bilingual**: English (default) and French
- ✅ **Language Selector**: 🇬🇧 EN / 🇫🇷 FR dropdown
- ✅ **Auto-detection**: Browser language detection
- ✅ **Persistence**: Language saved in localStorage
- ✅ **Complete Translation**: All interface elements

### Documentation
- ✅ Complete README (EN/FR)
- ✅ User Guide (EN/FR)
- ✅ Changelog (EN/FR)
- ✅ Bilingual landing page
- ✅ Integration guide

### Technical
- ✅ ~1,200 lines of code
- ✅ ~50KB without photos
- ✅ Single HTML file (standalone)
- ✅ Vanilla JavaScript (no dependencies)
- ✅ 100% local (no server, no data collection)
- ✅ Works offline
- ✅ Chrome, Firefox, Safari, Edge support

### UX Improvements
- ✅ Correct tournament order: Rounds → Semi-finals → 3rd place → Final
- ✅ Comparison by ID (not object reference) after import
- ✅ Auto-disable start button if byes not selected
- ✅ Auto-enable after bye selection (manual or random)
- ✅ Auto-disable focus mode when tournament ends




## 📊 Metrics

- **Features**: 25+ major features
- **Lines of Code**: ~1,200
- **File Size**: 50KB (without photos)
- **Display Modes**: 3 (full bracket, focus mode, podium)
- **Keyboard Shortcuts**: 2 (Z, Escape)
- **Preset Themes**: 4 (Sport, E-Sport, Corporate, Gaming)
- **Languages**: 2 (English, French)
- **Supported Players**: 2-40




## 🔮 Future Ideas

### Considered for v2.0 (based on user feedback)
- 📸 Social sharing (podium image generation)
- 📊 Tournament statistics
- 🗂️ Built-in tournament history
- 🎨 Additional themes
- 🖨️ Print-friendly view
- ⏱️ Match timer
- 🔄 Double elimination support

### Backlog
Ideas logged for future evaluation based on user requests.




## 🙏 Acknowledgments

Thanks to all users who will test and provide feedback to improve Tournament Pro!

---

**Want a feature? Open an issue on GitHub!**
