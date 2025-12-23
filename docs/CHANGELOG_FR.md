# Changelog

Tous les changements notables de Tournament sont documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).



## [1.0.0] - 23-12-2025

### 🎉 Version Initiale - Tournament v1.0

Gestionnaire de tournoi professionnel complet, prêt pour une utilisation en production.

### Gestion de tournoi
- ✅ Support de 6 à 40 participants (nombres pairs)
- ✅ Système d'élimination directe
- ✅ Gestion automatique des byes pour nombres non-puissance de 2
- ✅ Sélection manuelle ou aléatoire des têtes de série
- ✅ Match de 3ème place (joué avant la finale)
- ✅ Podium complet avec les 3 médaillés
- ✅ Layout symétrique style NCAA
- ✅ Validation de progression des matchs (impossible de démarrer sans sélectionner tous les byes)

### Interface & Design
- ✅ Design moderne et responsive (desktop, tablette, mobile)
- ✅ Animations fluides et effets visuels
- ✅ Palette de couleurs professionnelle (rouge/cyan/jaune)
- ✅ Typographie Rajdhani/Space Mono
- ✅ Affichage bracket optimisé (3 colonnes : gauche/centre/droite)
- ✅ Breakpoints responsives (1200px pour affichage vertical mobile)

### Personnalisation visuelle
- ✅ Upload de photos optionnel pour chaque joueur
- ✅ Effets visuels pour les perdants (rotation 180° de la photo)
- ✅ Affichage photos sur le podium avec effets
- ✅ Stockage base64 pour la portabilité

### Fonctionnalités avancées
- ✅ **Mode Focus** : Focus automatique sur le match en cours
- ✅ **Raccourcis clavier** : Z (focus) / Echap (vue globale)
- ✅ **Widget 👁️** : Rappel persistant avec auto-minimisation
- ✅ **Indicateur de match** : "⚡ MATCH EN COURS ⚡" affiché 2 secondes
- ✅ **Scroll automatique** : Vers le podium en fin de tournoi

### Sauvegarde & Export
- ✅ Export JSON complet (joueurs, état tournoi, photos, résultats)
- ✅ Nom de fichier automatique avec date (tournoi_AAAA-MM-JJ.json)
- ✅ Import complet avec reconstruction de l'état
- ✅ Reprise des tournois en cours
- ✅ Archivage des tournois terminés

### Personnalisation & Branding
- ✅ **Interface visuelle** : Aucun code requis
- ✅ **Identité** : Titre, sous-titre, upload logo
- ✅ **Couleurs du thème** : 5 color pickers visuels (Primaire, Secondaire, Accent, Sombre, Clair)
- ✅ **Thèmes prédéfinis** : Sport, E-Sport, Corporate, Gaming
- ✅ **Aperçu temps réel** : Voir les changements instantanément
- ✅ **LocalStorage** : Personnalisation persistante

### Internationalisation
- ✅ **Bilingue** : Anglais (par défaut) et Français
- ✅ **Sélecteur de langue** : 🇬🇧 EN / 🇫🇷 FR dropdown
- ✅ **Auto-détection** : Détection de la langue du navigateur
- ✅ **Persistance** : Langue sauvegardée dans localStorage
- ✅ **Traduction complète** : Tous les éléments de l'interface

### Documentation
- ✅ README complet (EN/FR)
- ✅ Guide utilisateur (EN/FR)
- ✅ Changelog (EN/FR)
- ✅ Landing page bilingue
- ✅ Guide d'intégration

### Technique
- ✅ ~1 200 lignes de code
- ✅ ~50KB sans photos
- ✅ Fichier HTML unique (standalone)
- ✅ JavaScript Vanilla (aucune dépendance)
- ✅ 100% local (pas de serveur, pas de collecte de données)
- ✅ Fonctionne hors ligne
- ✅ Support Chrome, Firefox, Safari, Edge

### Améliorations UX
- ✅ Ordre tournoi correct : Rounds → Demi-finales → 3ème place → Finale
- ✅ Comparaison par ID (pas référence objet) après import
- ✅ Désactivation auto du bouton démarrer si byes non sélectionnés
- ✅ Activation auto après sélection byes (manuelle ou aléatoire)
- ✅ Désactivation auto du mode focus quand tournoi terminé




## 📊 Métriques

- **Fonctionnalités** : 25+ features majeures
- **Lignes de code** : ~1 200
- **Taille fichier** : 50KB (sans photos)
- **Modes d'affichage** : 3 (bracket complet, mode focus, podium)
- **Raccourcis clavier** : 2 (Z, Echap)
- **Thèmes prédéfinis** : 4 (Sport, E-Sport, Corporate, Gaming)
- **Langues** : 2 (Anglais, Français)
- **Joueurs supportés** : 2-40




## 🔮 Idées futures

### Envisagées pour v2.0 (selon retours utilisateurs)
- 📸 Partage social (génération image du podium)
- 📊 Statistiques de tournoi
- 🗂️ Historique intégré des tournois
- 🎨 Thèmes additionnels
- 🖨️ Vue imprimable
- ⏱️ Timer par match
- 🔄 Support double élimination

### Backlog
Idées notées pour évaluation future selon les demandes utilisateurs.




## 🙏 Remerciements

Merci à tous les utilisateurs qui testeront et fourniront des retours pour améliorer Tournament !



**Vous voulez une fonctionnalité ? Ouvrez une issue sur GitHub !**
