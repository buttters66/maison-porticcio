# 🗑️ Installation Undiscord sur macOS

## Méthode 1 : Console du navigateur (la plus rapide)

1. Ouvrir **Discord dans le navigateur** : [discord.com/app](https://discord.com/app)
2. Ouvrir la Console :
   - **Chrome** : `Cmd + Option + J`
   - **Safari** : `Cmd + Option + C` puis onglet Console
3. Si le collage est bloqué, taper d'abord : `allow pasting` puis Entrée
4. Coller cette commande :

```javascript
fetch('https://raw.githubusercontent.com/victornpb/deleteDiscordMessages/master/deleteDiscordMessages.user.js').then(r=>r.text()).then(eval)
```

---

## Méthode 2 : Avec Tampermonkey (recommandé)

1. Installer **Tampermonkey** : https://www.tampermonkey.net/
2. Installer le script : https://greasyfork.org/fr/scripts/406540-undiscord-supprimer-tous-les-messages
3. Cliquer sur "Installer ce script"
4. Aller sur Discord - l'icône poubelle apparaît !

---

## Méthode 3 : Bookmarklet

1. Créer un nouveau favori
2. Dans l'URL, coller :
```
javascript:(function(){fetch('https://raw.githubusercontent.com/victornpb/deleteDiscordMessages/master/deleteDiscordMessages.user.js').then(r=>r.text()).then(eval);})();
```
3. Sur Discord, cliquer sur ce favori

---

## 📋 Script téléchargé

Le script a été téléchargé dans : `~/Downloads/undiscord.user.js`

Pour le copier dans le presse-papiers :
```bash
cat ~/Downloads/undiscord.user.js | pbcopy
```

