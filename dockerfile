FROM python:3.11-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# 1. CPU-only torch first (prevents sentence-transformers pulling CUDA torch)
RUN pip install --user --no-cache-dir \
    torch --index-url https://download.pytorch.org/whl/cpu

# 2. Install only what's needed for sentence-transformers (skip heavy extras)
RUN pip install --user --no-cache-dir \
    sentence-transformers==5.1.2 \
    --no-deps

# 3. Install sentence-transformers actual required deps manually (lightweight ones only)
RUN pip install --user --no-cache-dir \
    transformers \
    huggingface-hub \
    numpy \
    scikit-learn \
    tqdm \
    Pillow

# 4. Install the rest of your requirements (WITHOUT ranx)
RUN pip install --user --no-cache-dir \
    fastapi \
    uvicorn \
    psycopg2-binary \
    "elasticsearch==8.15.1" \
    "fastapi-cli==0.0.5"

# 5. Pre-bake model into image
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"

# ---- Final slim image ----
FROM python:3.11-slim

WORKDIR /app

COPY --from=builder /root/.local /root/.local
COPY --from=builder /root/.cache /root/.cache
COPY . .

ENV PATH=/root/.local/bin:$PATH

CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]