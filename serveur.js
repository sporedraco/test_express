// On importe le module 'http' de Node.js, qui permet de créer un serveur web
const http = require('http');

let tickets = [];

// On crée un serveur HTTP
// La fonction passée à createServer est appelée à chaque requête reçue
const server = http.createServer((req, res) => {
    // On extrait la méthode (GET, POST, etc.) et l’URL de la requête
    const { method, url } = req;

    // 🔹 Route 1 : Page d'accueil ('/')
    // Si la méthode est GET et que l'URL est '/', on renvoie une page HTML simple
    if (method === 'GET' && url === '/') {
        // On indique dans l'en-tête HTTP que le contenu est du HTML (200 = succès)
        res.writeHead(200, {'Content-Type': 'text/html'});

        // On envoie une réponse HTML au client
        res.end('<h1>Bienvenue sur votre API Express !\n</h1>');   

    // 🔹 Route 2 : API ('/api')
    // Si la méthode est Post et que l'URL est '/api', on renvoie du JSON
    } else if (method === 'POST' && url === '/api') {
        let body = '';

    // On écoute les données envoyées dans le corps de la requête
    req.on('data', chunk => {
        body += chunk.toString(); // On concatène les morceaux de données
    });

    // Quand toutes les données ont été reçues
    req.on('end', () => {
        const data = JSON.parse(body);
        console.log('Données reçues :', data); // On affiche les données dans la console

        let error = [];

        if (!data.title) {
            error.push({message:'Le champ title est requis.'});
        }
        if (!data.priority) {
            error.push({message:'Le champ priority est requis.'});
        }
        if (error.length > 0) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({ error }));
        }

        tickets.push(data);

        // On renvoie une réponse au client
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ confirmation: 'Ticket bien créé !' }));

    });
    }
    else if (method === 'GET' && url === '/api') {
        // On indique dans l'en-tête que le contenu est du JSON
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(tickets));

    // 🔹 Route 3 : Toute autre route (erreur 404)
    }
     else {
        // On renvoie une réponse d’erreur avec un statut 404
        res.writeHead(404, {'Content-Type': 'text/html'});

        // On affiche un message d'erreur simple en HTML
        res.end('<h1>404 Not Found</h1>');
    }
});

// On indique au serveur d’écouter sur le port 3000
server.listen(3000, () => {
    // Ce message s’affiche dans la console quand le serveur démarre
    console.log('Serveur en écoute sur http://localhost:3000/api');
});

