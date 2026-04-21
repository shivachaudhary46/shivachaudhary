import time 
from pprint import pprint
import os 

from elasticsearch import Elasticsearch 

def get_es_client(max_retries: int = 1, sleep_time: int = 5) -> Elasticsearch: 
    i = 0 
    while i < max_retries:
        try: 
            es = Elasticsearch(
                os.getenv("ELASTICSEARCH_URL", "http://elasticsearch.railway.internal:9200"),
                basic_auth=(
                    os.getenv("ELASTICSEARCH_USER", "elastic"),
                    os.getenv("ELASTICSEARCH_PASSWORD", "6AqhOxi*CPXYvCZl7Iln")
                ),
                verify_certs=False  # keep this since Railway uses self-signed certs internally
            )
            client_info = es.info()
            pprint('Connected to Elasticsearch!')
            return es
        except Exception: 
            pprint("Could not connect to Elasticsearch, retrying....")
            time.sleep(sleep_time)
            i += 1 
    raise ConnectionAbortedError("Failed to connect to Elasticsearch after multiple attempts.")
https://localhost