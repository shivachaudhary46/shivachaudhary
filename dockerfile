FROM python:3.11-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# 4. Install the rest of your requirements (WITHOUT ranx)
RUN pip install --user --no-cache-dir \
    fastapi \
    uvicorn \
    psycopg2-binary \
    "elasticsearch==8.15.1" \
    "fastapi-cli==0.0.5"

# ---- Final slim image ----
FROM python:3.11-slim

WORKDIR /app

COPY --from=builder /root/.local /root/.local
COPY --from=builder /root/.cache /root/.cache
COPY . .

ENV PATH=/root/.local/bin:$PATH

CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]