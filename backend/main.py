from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()


class Code(BaseModel):
    code: str


origins = [
    "http://localhost:3000/",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def home():
    return {"data": "OK"}


@app.post("/auth")
def auth_code(code: Code):
    print(code)
    return code
