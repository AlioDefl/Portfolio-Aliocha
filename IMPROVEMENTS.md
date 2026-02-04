# Liste des Améliorations - Portfolio Aliocha

Ce document liste tous les problèmes identifiés et améliorations possibles pour le portfolio.

---

## 🔴 Bugs Critiques (À corriger en priorité)

### 1. Fuite mémoire dans Contact.tsx (ligne 45-51)
**Fichier:** `components/dom/Contact.tsx`
**Problème:** Le cleanup des event listeners dans le useEffect est retourné à l'intérieur du forEach, mais forEach ignore les valeurs de retour. Les listeners ne sont jamais supprimés.
```typescript
// Actuel (incorrect)
magneticRefs.current.forEach((link) => {
  // ...
  return () => {
    link.removeEventListener("mousemove", handleMouseMove);
    link.removeEventListener("mouseleave", handleMouseLeave);
  };
});

// Correction nécessaire - stocker les listeners et les nettoyer dans le return du useEffect
```

### 2. Fuite mémoire dans Cursor.tsx (ligne 30-37)
**Fichier:** `components/layout/Cursor.tsx`
**Problème:** Même problème - les event listeners des éléments hover ne sont jamais nettoyés.

### 3. Mauvais cleanup dans SmoothScroll.tsx (ligne 37)
**Fichier:** `components/layout/SmoothScroll.tsx`
**Problème:** `gsap.ticker.remove(() => { })` retire une fonction anonyme vide, pas le vrai callback.
```typescript
// Actuel (incorrect)
gsap.ticker.remove(() => { });

// Correction - stocker le callback et le retirer proprement
const raf = (time: number) => lenis.raf(time * 1000);
gsap.ticker.add(raf);
// puis dans cleanup: gsap.ticker.remove(raf);
```

### 4. État non réactif dans Loader.tsx (ligne 123)
**Fichier:** `components/dom/Loader.tsx`
**Problème:** Utilise `useStore.getState().loadProgress` qui ne déclenche pas de re-render.
```typescript
// Actuel
{Math.floor(useStore.getState().loadProgress)}%

// Correction
{Math.floor(progress)}%
```

### 5. Position souris incorrecte dans Lights.tsx
**Fichier:** `components/layout/Lights.tsx`
**Problème:** Le composant reçoit des coordonnées normalisées (-1 à 1) mais les utilise comme pixels. Le spotlight ne bouge que de quelques pixels.
```typescript
// Correction nécessaire - convertir en coordonnées écran
const screenX = (mouse.x + 1) * window.innerWidth / 2;
const screenY = (-mouse.y + 1) * window.innerHeight / 2;
```

---

## 🟠 Problèmes Moyens

### 6. styled-jsx non configuré dans Hero.tsx
**Fichier:** `components/dom/Hero.tsx` (ligne 128-142)
**Problème:** Utilise `<style jsx>` mais styled-jsx n'est pas dans les dépendances.
**Solution:** Soit ajouter styled-jsx aux dépendances, soit déplacer l'animation dans globals.css.

### 7. Labels hardcodés en français dans ProjectModal.tsx
**Fichier:** `components/dom/ProjectModal.tsx` (lignes 126, 132, 140)
**Problème:** Les labels "Défis Relevés", "Apprentissages", "Ce que ça m'a apporté" sont en français même quand la langue est anglaise.
**Solution:** Utiliser le système de langue ou ajouter ces labels dans content.json.

### 8. Attribut lang HTML fixe
**Fichier:** `app/layout.tsx` (ligne 25)
**Problème:** `<html lang="en">` est fixe alors que le site est bilingue.
**Solution:** Rendre dynamique basé sur l'état de langue (nécessite un refactor car layout est côté serveur).

### 9. Images non optimisées
**Fichiers:** `components/dom/ProjectGallery.tsx`, `components/dom/ProjectModal.tsx`
**Problème:** Utilise `<img>` au lieu de `next/image` - pas d'optimisation automatique.
**Solution:** Remplacer par le composant Image de Next.js.

### 10. ErrorBoundary manquant sur SkillsSphere
**Fichier:** `components/canvas/SkillsSphere.tsx`
**Problème:** Contrairement à HeroScene, SkillsSphere n'a pas d'ErrorBoundary.
**Solution:** Ajouter ErrorBoundary comme dans HeroScene.

### 11. Année du footer hardcodée
**Fichier:** `components/dom/Contact.tsx` (ligne 104)
**Problème:** `© 2025` est hardcodé.
**Solution:** Utiliser `new Date().getFullYear()`.

---

## 🟡 Améliorations Recommandées

### 12. Ajouter les polices manquantes
**Chemin:** `/public/fonts/`
**Problème:** Les fichiers de polices (ClashDisplay-Variable.woff2, JetBrainsMono-Variable.woff2) sont référencés mais absents.
**Solution:** Télécharger et ajouter les polices.

### 13. Ajouter favicon et images OG
**Problème:** Manque le favicon et les images Open Graph pour le partage sur les réseaux sociaux.
**Solution:**
- Ajouter `/public/favicon.ico`
- Ajouter `/public/og-image.png`
- Mettre à jour les métadonnées dans layout.tsx

### 14. Ajouter une page 404
**Problème:** Pas de page d'erreur personnalisée.
**Solution:** Créer `app/not-found.tsx`.

### 15. Ajouter sitemap.xml et robots.txt
**Problème:** Manque pour le SEO.
**Solution:**
- Créer `/public/robots.txt`
- Créer `app/sitemap.ts` pour générer le sitemap

### 16. Métadonnées SEO incomplètes
**Fichier:** `app/layout.tsx`
**Problème:** Manque keywords, author, canonical URL, etc.
**Solution:** Enrichir l'objet metadata.

### 17. Optimisation mobile manquante
**Problème:** Pas de détection mobile pour:
- Réduire le nombre de particules (5000 → 1000-2000)
- Désactiver le custom cursor sur tactile
- Simplifier les animations
**Solution:** Ajouter détection mobile et adapter les composants.

### 18. Accessibilité du curseur custom
**Fichier:** `app/globals.css` (ligne 12)
**Problème:** `cursor: none` cache le curseur natif, problématique pour certains utilisateurs.
**Solution:** Ajouter une préférence utilisateur ou media query `@media (pointer: fine)`.

### 19. États de chargement des images
**Problème:** Les images peuvent apparaître brusquement.
**Solution:** Ajouter des placeholders blur ou skeleton loaders.

### 20. Ajouter des tests
**Problème:** Aucun framework de test configuré.
**Solution:** Ajouter Jest/Vitest + React Testing Library.

---

## 🔵 Améliorations de Qualité de Code

### 21. Types TypeScript plus stricts
**Fichiers:** Plusieurs composants
**Exemples:**
- `cardsRef.current[i] = el` pourrait causer des problèmes si el est null
- Utiliser des types plus précis pour les refs

### 22. Extraire les constantes magiques
**Exemples:**
- `5000` particules → `PARTICLE_COUNT`
- `3` secondes delay → `LOADER_DELAY`
- `-8, 8` skew bounds → `SKEW_BOUNDS`

### 23. Créer des hooks personnalisés
**Suggestions:**
- `useScrollTrigger` - pour encapsuler la logique GSAP commune
- `useMagneticEffect` - pour l'effet magnétique réutilisable
- `useMediaQuery` - pour la détection responsive

### 24. Centraliser l'enregistrement ScrollTrigger
**Problème:** `gsap.registerPlugin(ScrollTrigger)` est appelé dans plusieurs fichiers.
**Solution:** L'appeler une seule fois dans un fichier de configuration GSAP.

### 25. Variables CSS pour les animations
**Problème:** Les durées et easings sont hardcodés partout.
**Solution:** Créer des CSS custom properties ou un objet de config partagé.

---

## 📋 Checklist des Corrections

### Bugs Critiques
- [ ] Corriger le cleanup des listeners dans Contact.tsx
- [ ] Corriger le cleanup des listeners dans Cursor.tsx
- [ ] Corriger le cleanup GSAP dans SmoothScroll.tsx
- [ ] Corriger l'affichage du pourcentage dans Loader.tsx
- [ ] Corriger les coordonnées souris dans Lights.tsx

### Problèmes Moyens
- [ ] Résoudre styled-jsx ou migrer l'animation
- [ ] Internationaliser ProjectModal.tsx
- [ ] Optimiser les images avec next/image
- [ ] Ajouter ErrorBoundary à SkillsSphere
- [ ] Rendre l'année du footer dynamique

### Améliorations
- [ ] Ajouter les fichiers de polices
- [ ] Créer favicon et images OG
- [ ] Créer page 404
- [ ] Ajouter sitemap et robots.txt
- [ ] Améliorer les métadonnées SEO
- [ ] Optimiser pour mobile
- [ ] Améliorer l'accessibilité du curseur
- [ ] Ajouter des états de chargement d'images

### Qualité de Code
- [ ] Renforcer les types TypeScript
- [ ] Extraire les constantes
- [ ] Créer des hooks réutilisables
- [ ] Centraliser la config GSAP

---

## 🎯 Ordre de Priorité Suggéré

1. **Immédiat:** Bugs critiques (1-5)
2. **Court terme:** Problèmes moyens (6-11)
3. **Moyen terme:** Améliorations recommandées (12-20)
4. **Long terme:** Qualité de code (21-25)

---

## 📝 Notes Additionnelles

### Performance
- Le grain overlay (200% width/height) peut impacter les performances sur les appareils moins puissants
- Considérer le lazy loading pour les composants 3D
- Utiliser `will-change` avec parcimonie

### Compatibilité
- Tester sur Safari (WebGL peut avoir des comportements différents)
- Vérifier le smooth scroll sur iOS
- Tester les animations sur Firefox

### Sécurité
- Valider les URLs de contact avant de les utiliser
- S'assurer que les liens externes ont `rel="noopener noreferrer"` (déjà fait ✓)
