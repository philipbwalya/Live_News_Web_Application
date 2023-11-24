{
  "version": 2,
  "builds": [
    {
      "src": "app",
      "use": "@vercel/node"
    },
    {
      "src": "app/package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/app/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/app/$1"
    }
  ]
}
