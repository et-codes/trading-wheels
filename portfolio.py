from flask import request, Request, Response
from database import db
from models import User, Trade


def get_portfolio(username: str) -> list[dict]:
    pass