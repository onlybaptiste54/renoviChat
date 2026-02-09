# Renovi Chat

Interface de chat style ChatGPT intégrée avec N8N pour RENOVI.

## 🚀 Démarrage rapide

### Développement local

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run start:dev
```

L'application sera disponible sur `http://localhost:3000`

### Production avec Docker

```bash
# Build et lancer avec Docker Compose
docker-compose up -d --build

# Voir les logs
docker-compose logs -f

# Arrêter
docker-compose down
```

## 📁 Structure du projet

```
renoviChat/
├── src/
│   ├── main.ts              # Point d'entrée NestJS
│   ├── app.module.ts        # Module principal
│   └── chat/
│       ├── chat.module.ts   # Module Chat
│       ├── chat.controller.ts
│       └── chat.service.ts
├── public/
│   ├── index.html           # Interface chat (N8N embedded)
│   ├── login.html           # Page de connexion
│   └── style.css
├── Dockerfile               # Build multi-stage production
├── docker-compose.yml       # Configuration Docker
└── package.json
```

## 🔧 Configuration

### Variables d'environnement

| Variable | Description | Défaut |
|----------|-------------|--------|
| `PORT` | Port de l'application | 3000 |
| `NODE_ENV` | Environnement | development |

### N8N Webhook

L'URL du webhook N8N est configurée dans `public/index.html` :
```javascript
webhookUrl: 'https://n8n.aetheria-studio.com/webhook/f2a19d60-c531-4a50-bb64-480284ef80d2/chat'
```

## 🐳 Docker

### Build manuel

```bash
docker build -t renovi-chat:latest .
docker run -p 3000:3000 renovi-chat:latest
```

### Health Check

L'endpoint `/api/chat/health` vérifie l'état du service.

## 📝 API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Interface chat |
| GET | `/login.html` | Page de connexion |
| GET | `/api/chat/health` | Health check |
| POST | `/api/chat/message` | Envoyer un message (backup) |

## 🔒 Authentification

L'authentification est gérée côté client avec localStorage/sessionStorage.
Pour une vraie authentification, implémenter un système JWT.
