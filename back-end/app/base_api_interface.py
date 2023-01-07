from abc import ABC, abstractmethod


class BaseAPIInterface(ABC):

    @abstractmethod
    def quote(self, symbol: str):
        pass

    @abstractmethod
    def batch_quote(self, symbols: list[str]):
        pass

    @abstractmethod
    def get_symbols(self, symbol: str):
        pass
