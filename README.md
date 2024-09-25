# Opdracht Vlaamse Overheid

### Uitleg modules en componenten

|-public  
|-src  
| |-components  
| |-pages  
| |-utils  

In de `public` folder kan je de data file terugvinden in xlsx format.  
Onder de `src` folder kan je de opbouw van de applicatie vinden:

- In de `components` folder staan de stateless componenten die gebruikt worden om presentational logic te groeperen.
- In de `pages` folder staat de stateful component waar de data centraal wordt bijgehouden en waar de app wordt aangestuurd.
- In de `utils` folder staan de helper functies die instaan voor het ophalen van de data, het formatteren en de berekeningen.

### Instructies opzetten en draaien applicatie

_Voorafgaand_

- Code Editor  
  Download en gebruik een code editor zoals [VS Code](https://code.visualstudio.com/)

- Node versie  
  **Windows** Zorg er voor dat de juiste [Node](https://nodejs.org/en) versie geïnstalleerd is. `v20.17.0`  
  **Mac / Linux** Gebruik een Node Versie Manager zoals [nvm](https://github.com/nvm-sh/nvm) om de juiste node versie te kunnen gebruiken.

_Project opzetten en draaien app_

1. Download ZIP van Github repository
2. Pak de ZIP uit in een lokale folder naar keuze op je eigen computer
3. Open de project folder in VS Code en open vervolgens een terminal venster.
   **Mac / Linux** Voer het commando `nvm use` uit. De juiste Node versie zal dan geïnstalleerd en gebruikt worden adhv de `.nvmrc` file in de root van het project.
4. Voer `npm install` uit
5. Om de applicatie lokaal te laten draaien, voer je `npm run dev` uit

### Beschrijving van gebruikte externe libraries of frameworks

- React  
  De UI library waarmee de app is gebouwd.
- Xlsx  
  Aanvullende package die wordt gebruikt om de aangeleverde data voor de opdracht uit te lezen en om te zetten naar JSON format
- Tailwind  
  Een CSS framework dat gebruik maakt van utility classes om een design te implementeren
