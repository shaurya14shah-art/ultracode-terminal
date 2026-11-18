import asyncio
from fastapi import FastAPI, WebSocket
from pydantic import BaseModel
import uvicorn
import os

app = FastAPI(title="Ultracode Terminal API")

class TaskRequest(BaseModel):
    prompt: str
    squad_size: int = 1

@app.get("/")
def read_root():
    return {"status": "Ultracode Backend Running"}

@app.post("/api/spawn")
def spawn_squad(request: TaskRequest):
    # This will hook into the Antigravity SDK & Ultracode Hyper Swarm
    return {
        "status": "success",
        "message": f"Spawned {request.squad_size} agents for task.",
        "task": request.prompt
    }

@app.websocket("/ws/terminal")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    # Send welcome message
    await websocket.send_json({"type": "system", "message": "Connected to Antigravity Brain."})
    try:
        while True:
            data = await websocket.receive_text()
            # Echo back or process commands
            await websocket.send_json({"type": "echo", "message": f"Received: {data}"})
    except Exception as e:
        print("WebSocket disconnected:", e)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
