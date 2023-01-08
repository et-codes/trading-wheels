from abc import ABC, abstractmethod


class BaseAPIInterface(ABC):

    @abstractmethod
    def quote(self, symbol: str):
        raise NotImplementedError

    @abstractmethod
    def batch_quote(self, symbols: list[str]):
        raise NotImplementedError

    @abstractmethod
    def get_symbols(self):
        raise NotImplementedError
