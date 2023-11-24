#!/usr/bin/env node

// Importation des modules
const fs = require('fs').promises; 
const path = require('path');

const color = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    autre : '\x1b[33m',
}

// c'est la fonction readdir pour lir les fichier
function readdirFiles(directoryPath) {
    return fs.readdir(directoryPath);
}

// c'est une fonction pour afficher les stats date heure
function statsFile(filePath) {
    return fs.stat(filePath);
}

// la fonction principale qui regoupe les deux dans haut avec une await promise
async function listFiles(directoryPath) {
    try {
        const files = await readdirFiles(directoryPath); // Récupération de la liste des fichiers dans le répertoire

        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            const stats = await statsFile(filePath); // Récupération des statistiques du fichier/dossier

            const date = stats.birthtime;
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
            
            
            //                      date.getFullYear(): Récupère l'année à partir de l'objet Date.
            //                      (date.getMonth() + 1).toString().padStart(2, '0'): Récupère le mois en ajoutant 1(car les mois vont de 0 à 11 en JavaScript).Ensuite, le toString() convertit le mois en chaîne de caractères
            //                      .Enfin, padStart(2, '0') assure que le mois soit sur deux chiffres, en ajoutant un zéro devant si nécessaire(par exemple, le mois 5 devient '05').
            //                      date.getDate().toString().padStart(2, '0'): Récupère le jour du mois, le convertit en chaîne de caractères, et s'assure qu'il soit sur deux chiffres.
            //                      date.getHours().toString().padStart(2, '0'): meme chose mais pour les heure



            // Affichage des détails du fichier/dossier
            if (stats.isDirectory()) {
                console.log(`${file} ${color.red}- [Dossier] -${color.reset} ${formattedDate}`);
            } else if (stats.isFile()) {
                console.log(`${file} ${color.green}- [Fichier] -${color.reset} ${formattedDate}`);
            } else {
                console.log(`${file} ${color.autre}- [Autre] -${color.reset} ${formattedDate}`);
            }
        }
    } catch (err) {
        console.error('Erreur :', err);
    }
}

// Fonction asynchrone anonyme pour exécuter le code principal async car sinon le await fonctionne pas
(async () => {
    let directoryPath = process.argv[2] || './'; // chemin du repertoir pour afficher mais si tu met aucun argument c'est ton dosier actuelle qui est mis
    if (directoryPath === '..') {
        directoryPath = path.join(__dirname, '..'); // le scripte parent le __dirname cest la fonction pour avoir le dossier parent
    }

    try {
        await fs.access(directoryPath); // on vérifie si tu peux y accéder
        await listFiles(directoryPath); // on apelle notre fonction
    } catch (err) {
        console.error('Erreur :', err); 
    }
})();






// // Fonction du ls
// function listFiles(directoryPath) {
//     // le repertoir
//     fs.readdir(directoryPath, (err, files) => {
//         if (err) {
//             console.error('Erreur :', err);
//             return;
//         }

//         files.forEach(file => {
//             // Création du chemin > element
//             const filePath = path.join(directoryPath, file);

//             // Récupération des stats genre heure / date
//             fs.stat(filePath, (err, stats) => {
//                 if (err) {
//                     console.error('Erreur lors de la lecture du fichier/dossier :', err);
//                     return;
//                 }

//                 // variable de la date de creation
//                 const date = stats.birthtime;

//                 //la date en question 
//                 const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;


//                   date.getMinutes().toString().padStart(2, '0'): et pour les minutes





//                 // Affichage du nom de l'élément, son type (fichier/dossier/autre) et sa date de création
//                 if (stats.isDirectory()) {
//                     console.log(`${file} - [Dossier] - ${formattedDate}`);
//                 } else if (stats.isFile()) {
//                     console.log(`${file} - [Fichier] - ${formattedDate}`);
//                 } else {
//                     console.log(`${file} - [Autre] - ${formattedDate}`);
//                 }
//             });
//         });
//     });
// }




// // savoir si il existe et si il existe on apelle la fonction sinon error
// if (fs.existsSync(directoryPath)) {
//     listFiles(directoryPath);
// } else {
//     console.error('Le répertoire ou fichier spécifié n\'existe pas.');
// }
