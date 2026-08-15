# Corriger les erreurs

<div class="gb-notice gb-notice--info">

**Rappel important**

Vous devez choisir la région de votre compte lors du lancement de l'émulateur, sans quoi vous pourriez avoir des erreurs **VAL-5**.

</div>

## Vanguard demande un redémarrage. Que faire ?

![Redémarrage Vanguard requis](/images/vanguard-restart.png)

Notre émulateur est conçu **à 100 % pour éviter les bans**, il est donc normal que par moments Vanguard reste fermé comme ceci. Nous avons une technique pour vous : ouvrez le **CMD en administrateur** et exécutez les commandes suivantes :

```bat
sc stop vgc
sc stop vgk
sc start vgc
sc start vgk
```

## J'obtiens une erreur VAL-5 après avoir terminé une partie. Que dois-je faire ?

C'est normal. À la fin de chaque partie, vous devez appuyer sur **F3** et attendre 10 à 20 secondes pour que le statut de l'émulateur passe de « En attente » à « Connecté ».

## J'ai eu une erreur VAL-102. Qu'est-ce qui l'a causée ?

Vous spammez trop l'application et le temps de recharge de réinitialisation, ce qui déclenche une limite de débit sur votre accès à Riot. Attendez simplement entre **5 et 30 minutes** avant de réessayer. Plus vous spammez et forcez, plus la limite de débit durera longtemps.

## L'application se ferme soudainement et je ne peux plus la relancer. Que dois-je faire ?

Redémarrez votre ordinateur pour restaurer Vanguard à sa version par défaut, puis relancez l'émulateur.

## MFA affiche « Échec » lorsque j'essaie de l'utiliser. Que dois-je faire ?

Assurez-vous d'être dans le **lobby** lors de l'activation. Vous ne devez utiliser cette option que lorsque MFA est réellement demandé — sinon, c'est inutile et cela peut échouer.

## Lorsque je lance l'application, on me demande de changer d'application après une mise à jour. Que dois-je faire ?

Oui — rendez-vous sur le Discord officiel ou consultez la section **Tutoriel** de ce site pour installer la dernière version disponible. Les anciennes versions sont obsolètes. Même si vous essayez de contourner la mise à jour, vous risquez d'être banni.

## J'ai une erreur VAN-79. Que dois-je faire ?

Vous devez régler l'heure de votre PC en mode automatique. En bas à droite de la barre des tâches, faites un clic droit sur l'horloge, ouvrez **Ajuster la date et l'heure**, puis activez **Définir l'heure automatiquement**.

## J'ai eu VAL-5 et un ban temporaire sur mon compte. Est-ce normal ?

Oui. Si vous utilisez mal l'émulateur, il ne se charge plus correctement via Riot et vous pouvez recevoir un ban. Ce ban est **temporaire** et dure généralement seulement **5 à 10 minutes** avant de pouvoir rejouer.
