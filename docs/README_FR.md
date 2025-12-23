# ⚡ Tournament

**Gestionnaire de tournoi à élimination directe professionnel, gratuit et open-source**

Tournament est une application web autonome qui permet d'organiser et de suivre des tournois sportifs ou e-sport avec une interface moderne et intuitive. 100% local, aucun serveur requis, aucune donnée collectée.

![Tournament](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![No Server Required](https://img.shields.io/badge/server-none-orange)

## ✨ Fonctionnalités principales

### 🏆 Gestion complète de tournoi
- **2 à 40 participants** (nombre pair)
- **Système de byes automatique** pour les nombres non-puissance de 2
- **Sélection des têtes de série** (manuelle ou aléatoire)
- **Match de 3ème place** avant la finale
- **Podium complet** avec les 3 médaillés

### 📸 Personnalisation visuelle
- **Upload de photos** optionnel pour chaque participant
- **Effet visuel des perdants** (rotation 180° de la photo)
- **Affichage professionnel** avec bracket symétrique (style NCAA)
- **Mode focus** pour suivre le match en cours en temps réel

### 💾 Sauvegarde et partage
- **Export JSON** de n'importe quel tournoi (en cours ou terminé)
- **Import** pour reprendre un tournoi exactement où vous l'avez laissé
- **Archivage** de vos tournois passés
- **Partage** facile par simple fichier JSON

### 🎮 Navigation intuitive
- **Interface responsive** (desktop, tablette, mobile)
- **Raccourcis clavier** (Z pour focus, Echap pour vue globale)
- **Scroll automatique** vers le match en cours
- **Animations fluides** et feedback visuel

## 🚀 Démarrage rapide

### Installation
Aucune installation nécessaire ! Il suffit de lancer le fichier `app.html` et de l'ouvrir dans votre navigateur.

```bash
# Télécharger le fichier
wget https://github.com/totos30/tournament/archive/refs/heads/main.zip

# Ouvrir dans votre navigateur
open app.html  # macOS
start app.html # Windows
xdg-open app.html # Linux
```

### Utilisation basique

1. **Créer un tournoi**
   - Sélectionnez le nombre de participants
   - Entrez les noms (et photos optionnelles)
   - Cliquez sur "Continuer"

2. **Gérer les byes** (si applicable)
   - Sélectionnez les têtes de série manuellement
   - Ou cliquez sur "Sélection aléatoire"
   - Lancez le tournoi

3. **Jouer les matchs**
   - Cliquez sur le nom du gagnant de chaque match
   - Le focus suit automatiquement le prochain match
   - Utilisez Z/Echap pour naviguer

4. **Sauvegarder**
   - Cliquez sur "Exporter" à tout moment
   - Le fichier JSON contient tout l'état du tournoi

## 📖 Cas d'usage

- 🏀 **Tournois sportifs** : Basketball, handball, tennis, pétanque...
- 🎮 **Compétitions e-sport** : FIFA, Street Fighter, Mario Kart...
- 🏢 **Événements d'entreprise** : Baby-foot, tennis de table...
- 🎓 **Tournois scolaires** : Échecs, débats, quiz...
- 🎉 **Soirées entre amis** : Belote, poker, jeux de société...

## 🎯 Avantages

### ✅ Simplicité
- Un seul fichier HTML
- Aucune installation, aucune configuration
- Fonctionne hors ligne

### ✅ Privacy
- 100% local, aucune donnée envoyée à un serveur
- Pas de compte utilisateur requis
- Vos photos restent sur votre appareil

### ✅ Professionnalisme
- Interface moderne et soignée
- Gestion des byes comme les vrais tournois
- Layout symétrique style NCAA/March Madness

### ✅ Gratuité
- Gratuit et open-source
- Pas de publicité
- Pas de limitation de fonctionnalités

## 🛠️ Technologies

- **HTML5** - Structure
- **CSS3** - Design moderne avec animations
- **JavaScript Vanilla** - Aucune dépendance externe
- **Base64** - Stockage des photos dans le JSON

## 📋 Spécifications techniques

- **Taille du fichier** : ~50 KB (sans photos)
- **Navigateurs supportés** : Chrome, Firefox, Safari, Edge (versions récentes)
- **Responsive** : Desktop (optimisé), Tablette, Mobile
- **Format d'export** : JSON (lisible et modifiable)
- **Photos supportées** : JPG, PNG, GIF, WebP

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- [Signaler des bugs via les Issues & proposer des améliorations via Issues :](https://github.com/totos30/tournament/issues/new)
- Soumettre des Pull Requests
- Partager vos cas d'usage

## 📜 Licence

MIT License - Libre d'utilisation, de modification et de distribution.

## 👨‍💻 Auteur

Développé avec passion par **Etienne** - Chef de Projet Transversal AI & Data

## 🙏 Remerciements

Merci à tous les utilisateurs qui testeront et amélioreront cet outil !

---

**⭐ Si vous trouvez cet outil utile, n'hésitez pas à le partager !**
