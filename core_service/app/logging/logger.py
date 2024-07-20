from loguru import logger
import sys


logger.remove(0)
logger.add(sys.stderr, format="{time:MMMM D, YYYY  HH:mm:ss!UTC} | {level} | {message}", level="INFO")

