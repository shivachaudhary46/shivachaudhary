FROM python:3.11-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Step 1: Install CPU-only torch FIRST before anything else
RUN pip install --user --no-cache-dir \
    torch --index-url https://download.pytorch.org/whl/cpu

# Step 2: Now install everything else
# sentence-transformers will see torch already installed and skip reinstalling it
RUN pip install --user --no-cache-dir -r requirements.txt

# Step 3: Pre-bake the model into the image (avoids cold start delays)
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"

FROM python:3.11-slim

WORKDIR /app

COPY --from=builder /root/.local /root/.local
COPY --from=builder /root/.cache /root/.cache
COPY . .

ENV PATH=/root/.local/bin:$PATH

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]