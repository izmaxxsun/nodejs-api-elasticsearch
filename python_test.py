from elasticsearch import Elasticsearch
from typing import List
from sentence_transformers import SentenceTransformer
import os
import sys

argument =  sys.argv[0]

print('hello world from Node' + argument)

sentence_transformer = SentenceTransformer("all-mpnet-base-v2")

es_client = Elasticsearch(cloud_id=os.environ['CLOUD_ID'], api_key=os.environ['CLOUD_API_KEY'])

INDEX_NAME = "faq-knn-sbert"
