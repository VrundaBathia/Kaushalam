export default async function handler(req, res) {
    const backendApiUrl = process.env.BACKEND_API_URL || 'http://localhost:5000/api/tasks';
  
    if (req.method === 'GET') {
      const response = await fetch(backendApiUrl);
      const tasks = await response.json();
      res.status(200).json(tasks);
    } else if (req.method === 'POST') {
      const response = await fetch(backendApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      const task = await response.json();
      res.status(201).json(task);
    }
  }
  