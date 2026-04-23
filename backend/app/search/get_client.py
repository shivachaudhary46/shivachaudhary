import time 
from pprint import pprint
import os 
from ..loggers.logger import logger
import traceback

from elasticsearch import Elasticsearch 

def get_es_client(max_retries: int = 1, sleep_time: int = 5) -> Elasticsearch: 
    i = 0 
    while i < max_retries:
        try: 
            es = Elasticsearch(
                os.getenv("ELASTICSEARCH_URL"),
                basic_auth=(
                    os.getenv("ELASTICSEARCH_USER"),
                    os.getenv("ELASTICSEARCH_PASSWORD")
                ),
                verify_certs=False  # keep this since Railway uses self-signed certs internally
            )
            client_info = es.info()
            pprint(f'Connected to Elasticsearch! {client_info}')
            return es
        except Exception as e: 
            pprint("Could not connect to Elasticsearch, retrying....")
            logger.info(f"Elasticsearch error: {e}")
            logger.info(traceback.format_exc())
            time.sleep(sleep_time)
            i += 1 
    raise ConnectionAbortedError("Failed to connect to Elasticsearch after multiple attempts.")
